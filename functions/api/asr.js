const host = "asr.tencentcloudapi.com";
const contentType = "application/json; charset=utf-8";
const encoder = new TextEncoder();
const maxAudioBytes = 44 + 8 * 16000 * 2;
const hex = buffer => Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");
const sha256 = async text => hex(await crypto.subtle.digest("SHA-256", encoder.encode(text)));

async function hmac(key, text) {
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(text));
}

async function signedHeaders(body, env) {
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const scope = `${date}/asr/tc3_request`;
  const canonical = `POST\n/\n\ncontent-type:${contentType}\nhost:${host}\n\ncontent-type;host\n${await sha256(body)}`;
  const algorithm = "TC3-HMAC-SHA256";
  const toSign = `${algorithm}\n${timestamp}\n${scope}\n${await sha256(canonical)}`;
  const dateKey = await hmac(encoder.encode(`TC3${env.TENCENT_SECRET_KEY}`), date);
  const serviceKey = await hmac(dateKey, "asr");
  const signingKey = await hmac(serviceKey, "tc3_request");
  const signature = hex(await hmac(signingKey, toSign));
  return {
    "Content-Type": contentType,
    "X-TC-Action": "SentenceRecognition",
    "X-TC-Version": "2019-06-14",
    "X-TC-Region": "ap-shanghai",
    "X-TC-Timestamp": String(timestamp),
    Authorization: `${algorithm} Credential=${env.TENCENT_SECRET_ID}/${scope}, SignedHeaders=content-type;host, Signature=${signature}`
  };
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isSupportedWav(buffer) {
  if (buffer.byteLength <= 44 || buffer.byteLength % 2) return false;
  const wav = new DataView(buffer);
  return wav.getUint32(0) === 0x52494646 && wav.getUint32(8) === 0x57415645
    && wav.getUint32(12) === 0x666d7420 && wav.getUint32(16, true) === 16
    && wav.getUint16(20, true) === 1 && wav.getUint16(22, true) === 1
    && wav.getUint32(24, true) === 16000 && wav.getUint16(34, true) === 16
    && wav.getUint32(36) === 0x64617461 && wav.getUint32(40, true) === buffer.byteLength - 44
    && wav.getUint32(4, true) === buffer.byteLength - 8;
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") return json({ error: "仅支持 POST 请求。" }, 405);
  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    return json({ error: "请从当前站点发起语音识别。" }, 403);
  }
  if (!env.TENCENT_SECRET_ID || !env.TENCENT_SECRET_KEY) {
    return json({ error: "站点尚未配置腾讯云语音识别密钥。" }, 503);
  }
  if (request.headers.get("Content-Type") !== "audio/wav" || !request.body) {
    return json({ error: "请提交 WAV 录音。" }, 415);
  }
  if (Number(request.headers.get("Content-Length")) > maxAudioBytes) {
    return json({ error: "录音超过 8 秒。" }, 413);
  }

  try {
    const audio = new Uint8Array(maxAudioBytes);
    const reader = request.body.getReader();
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (length + value.length > audio.length) {
        await reader.cancel();
        return json({ error: "录音超过 8 秒。" }, 413);
      }
      audio.set(value, length);
      length += value.length;
    }
    if (!isSupportedWav(audio.buffer.slice(0, length))) {
      return json({ error: "录音必须是 16 kHz、16 位单声道 WAV。" }, 400);
    }
    let binary = "";
    for (let i = 0; i < length; i += 8192) {
      binary += String.fromCharCode(...audio.subarray(i, Math.min(i + 8192, length)));
    }
    const body = JSON.stringify({
      ProjectId: 0,
      SubServiceType: 2,
      EngSerViceType: "16k_en",
      SourceType: 1,
      VoiceFormat: "wav",
      Data: btoa(binary),
      DataLen: length
    });
    const response = await fetch(`https://${host}/`, {
      method: "POST",
      headers: await signedHeaders(body, env),
      body,
      signal: AbortSignal.timeout(12000)
    });
    const { Response: result } = await response.json();
    if (response.ok && typeof result?.Result === "string") {
      return json({ transcript: result.Result });
    }
    const code = result?.Error?.Code;
    if (code === "FailedOperation.NoSpeech") return json({ transcript: "" });
    const errorCode = typeof code === "string" && /^[A-Za-z0-9.]+$/.test(code) ? `（${code}）` : "";
    return json({ error: `腾讯云识别失败${errorCode}，请重试或切换到浏览器识别。` }, 502);
  } catch {
    return json({ error: "无法连接腾讯云语音识别，请稍后重试。" }, 502);
  }
}
