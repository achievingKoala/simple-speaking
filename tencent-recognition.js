const RecordingContext = window.AudioContext || window.webkitAudioContext;

function makeWav(chunks) {
  const samples = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const view = new DataView(new ArrayBuffer(44 + samples * 2));
  const text = (offset, value) => {
    for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
  };
  text(0, "RIFF");
  view.setUint32(4, view.byteLength - 8, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, 16000, true);
  view.setUint32(28, 32000, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, samples * 2, true);
  let offset = 44;
  for (const chunk of chunks) {
    for (const sample of chunk) {
      view.setInt16(offset, sample, true);
      offset += 2;
    }
  }
  return view.buffer;
}

class TencentRecognition {
  chunks = [];
  speechFrames = 0;
  quietFrames = 0;
  controller = new AbortController();

  async start() {
    try {
      this.context = new RecordingContext({ sampleRate: 16000 });
      if (this.context.sampleRate !== 16000 || !this.context.audioWorklet) {
        throw new Error("当前浏览器无法录制腾讯云识别需要的音频。");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true }
      });
      if (this.controller.signal.aborted) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      this.stream = stream;
      await this.context.audioWorklet.addModule("./pcm-recorder.js");
      await this.context.resume();
      if (this.controller.signal.aborted) return;

      this.source = this.context.createMediaStreamSource(stream);
      this.node = new AudioWorkletNode(this.context, "pcm-recorder");
      this.node.port.onmessage = ({ data }) => {
        if (this.stopping || this.controller.signal.aborted) return;
        this.chunks.push(data);
        const energy = data.reduce((sum, sample) => sum + sample * sample, 0);
        if (Math.sqrt(energy / data.length) > 220) {
          this.speechFrames++;
          this.quietFrames = 0;
        } else {
          this.quietFrames++;
        }
        if ((this.speechFrames >= 3 && this.quietFrames >= 14) || this.chunks.length >= 160) {
          void this.stop();
        }
      };
      this.node.onprocessorerror = () => this.onerror?.({ message: "录音中断，请重试。" });
      this.source.connect(this.node);
      // The worklet emits silence so the microphone is never played through the speakers.
      this.node.connect(this.context.destination);
      this.onstart?.();
    } catch (error) {
      if (this.controller.signal.aborted) return;
      const codes = { NotAllowedError: "not-allowed", NotFoundError: "audio-capture" };
      this.onerror?.({ error: codes[error.name], message: codes[error.name] ? "" : "无法启动录音，请检查麦克风后重试。" });
    }
  }

  async stop() {
    if (this.stopping || this.controller.signal.aborted) return;
    this.stopping = true;
    this.releaseMicrophone();
    if (this.speechFrames < 2) {
      this.onnomatch?.();
      return;
    }
    this.onprocessing?.();
    try {
      const response = await fetch("/api/asr", {
        method: "POST",
        headers: { "Content-Type": "audio/wav" },
        body: makeWav(this.chunks),
        signal: this.controller.signal
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data.transcript !== "string") {
        throw new Error(data.error || "腾讯云识别接口不可用，请通过配置好的 Cloudflare 站点访问。");
      }
      this.onresult?.({ resultIndex: 0, results: [[{ transcript: data.transcript }]] });
    } catch (error) {
      if (!this.controller.signal.aborted) this.onerror?.({ message: error.message });
    }
  }

  releaseMicrophone() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.source?.disconnect();
    this.node?.disconnect();
    this.source = null;
    this.node = null;
    this.stream = null;
    const context = this.context;
    this.context = null;
    if (context && context.state !== "closed") void context.close().catch(() => {});
  }

  abort() {
    this.controller.abort();
    this.releaseMicrophone();
  }
}
