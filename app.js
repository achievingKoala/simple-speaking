const topics = [
  {
    name: "学习与工作", english: "Study & Work", icon: "📚",
    words: [
      ["assignment", "作业，任务"], ["deadline", "截止日期"], ["lecture", "讲座；大学课程"], ["degree", "学位"],
      ["semester", "学期"], ["internship", "实习"], ["colleague", "同事"], ["promotion", "晋升"],
      ["salary", "薪水"], ["workload", "工作量"], ["schedule", "日程安排"], ["teamwork", "团队合作"],
      ["qualification", "资格，资历"], ["profession", "职业"], ["job interview", "求职面试"],
      ["career path", "职业发展路径"], ["work experience", "工作经验"], ["part-time job", "兼职工作"],
      ["meet a deadline", "赶上截止日期"], ["work from home", "在家办公"]
    ]
  },
  {
    name: "日常生活", english: "Daily Life", icon: "☕",
    words: [
      ["routine", "日常惯例"], ["commute", "通勤"], ["neighborhood", "社区，街区"], ["apartment", "公寓"],
      ["rent", "租金；租用"], ["laundry", "要洗的衣物；洗衣"], ["groceries", "食品杂货"], ["recipe", "食谱"],
      ["breakfast", "早餐"], ["exercise", "锻炼"], ["housework", "家务"], ["errands", "外出要办的事"],
      ["budget", "预算"], ["convenient", "方便的"], ["rush hour", "交通高峰期"], ["get up early", "早起"],
      ["take a break", "休息一下"], ["eat out", "外出就餐"], ["do the dishes", "洗碗"], ["go for a walk", "去散步"]
    ]
  },
  {
    name: "兴趣与旅行", english: "Hobbies & Travel", icon: "✈️",
    words: [
      ["photography", "摄影"], ["hiking", "徒步旅行"], ["camping", "露营"], ["concert", "音乐会"],
      ["exhibition", "展览"], ["painting", "绘画"], ["destination", "目的地"], ["accommodation", "住宿"],
      ["itinerary", "旅行行程"], ["souvenir", "纪念品"], ["scenery", "风景"], ["sightseeing", "观光"],
      ["passport", "护照"], ["luggage", "行李"], ["local cuisine", "当地美食"], ["road trip", "公路旅行"],
      ["tourist attraction", "旅游景点"], ["take up a hobby", "培养一项爱好"], ["book a hotel", "预订酒店"],
      ["travel abroad", "出国旅行"]
    ]
  }
];

const byId = id => document.getElementById(id);
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const provider = byId("provider");
const storageKey = "speak-daily-stats-v1";
const seconds = 8;
const feedbackDelay = 1400;
const successSound = new Audio("./complete.wav");
successSound.preload = "auto";
let stats = { correct: 0, attempts: 0, words: {} };
let topicIndex = 0;
let queue = [];
let index = 0;
let right = 0;
let wrong = [];
let review = false;
let scored = false;
let active = null;
let advanceTimer;

function validCounts(counts) {
  return Number.isSafeInteger(counts?.correct) && Number.isSafeInteger(counts?.attempts)
    && counts.correct >= 0 && counts.attempts >= counts.correct;
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (validCounts(saved)) {
    stats.correct = saved.correct;
    stats.attempts = saved.attempts;
    for (const topic of topics) {
      for (const [word] of topic.words) {
        const counts = saved.words?.[word];
        if (validCounts(counts)) stats.words[word] = counts;
      }
    }
  }
} catch {
  byId("storage-note").textContent = "无法读取本地练习记录。";
}

function showStats() {
  byId("total-correct").textContent = stats.correct;
  byId("total-attempts").textContent = stats.attempts;
}

function wordAccuracy(word) {
  const counts = stats.words[word];
  if (!counts?.attempts) return "暂无有效练习记录";
  const percent = Math.round(counts.correct / counts.attempts * 100);
  return `累计正确率 ${percent}%（${counts.correct}/${counts.attempts} 次）`;
}

function feedback(message, kind = "") {
  const status = byId("feedback");
  status.textContent = message;
  status.dataset.kind = kind;
}

function refreshMic() {
  const tencent = provider.value === "tencent";
  byId("provider-note").hidden = !tencent;
  const issue = tencent
    ? (location.protocol === "file:" || !window.isSecureContext
      ? "请通过 Cloudflare 的 HTTPS 地址或 Wrangler 本地预览使用腾讯云识别。"
      : !RecordingContext || !navigator.mediaDevices?.getUserMedia
        ? "当前浏览器不支持腾讯云录音，请换用支持麦克风的浏览器。"
        : "")
    : (!Recognition ? "当前浏览器未提供语音识别，请切换识别方式或使用 Chrome。" : "");
  byId("listen").disabled = Boolean(issue);
  byId("listen-label").textContent = "开始朗读";
  feedback(issue || "点击开始朗读，之后会自动进入下一题。");
}

function stopListening() {
  const session = active;
  active = null;
  if (!session) return;
  clearTimeout(session.timeout);
  clearInterval(session.clock);
  try {
    session.recognizer.abort();
  } catch {
    // Some browsers have already closed the recognition session.
  }
}

function startRound(selected, missed = null, focus = true) {
  cancelAdvance();
  stopListening();
  topicIndex = selected;
  review = missed !== null;
  queue = [...(missed ?? topics[selected].words)];
  index = 0;
  right = 0;
  wrong = [];
  topicButtons.forEach((button, id) => button.setAttribute("aria-pressed", id === selected));
  renderQuestion(focus);
}

function renderQuestion(focus) {
  scored = false;
  const [word, meaning] = queue[index];
  byId("result").hidden = true;
  byId("question").hidden = false;
  byId("round-label").textContent = topics[topicIndex].name + (review ? " · 错词重练" : "");
  byId("counter").textContent = `${index + 1} / ${queue.length}`;
  byId("progress").max = queue.length;
  byId("progress").value = index;
  byId("word").textContent = word;
  byId("meaning").textContent = meaning;
  byId("word-stats").textContent = wordAccuracy(word);
  byId("next").hidden = true;
  byId("listen").hidden = false;
  refreshMic();
  if (focus) byId("word").focus();
}

function normalize(text) {
  return text.toLowerCase().replace(/\bneighbourhood\b/g, "neighborhood")
    .replace(/[^a-z]+/g, " ").trim();
}

function score(transcript) {
  const word = queue[index];
  const correct = normalize(transcript) === normalize(word[0]);
  scored = true;
  stats.attempts++;
  const counts = stats.words[word[0]] ??= { correct: 0, attempts: 0 };
  counts.attempts++;
  if (correct) {
    right++;
    stats.correct++;
    counts.correct++;
  } else {
    wrong.push(word);
  }
  try {
    localStorage.setItem(storageKey, JSON.stringify(stats));
  } catch {
    byId("storage-note").textContent = "无法保存到本地，本次统计仅保留到页面关闭。";
  }
  showStats();
  byId("word-stats").textContent = wordAccuracy(word[0]);
  byId("progress").value = index + 1;
  feedback(correct ? `识别正确 · ${transcript}` : `识别为「${transcript}」，与目标词条不匹配。`, correct ? "correct" : "wrong");
  byId("listen").hidden = true;
  byId("next").textContent = index + 1 === queue.length ? "查看结果" : "下一题";
  byId("next").hidden = false;
  if (correct) {
    successSound.currentTime = 0;
    successSound.onended = advance;
    successSound.onerror = advance;
    const timer = advanceTimer = setTimeout(advance, 4000);
    successSound.play().catch(() => {
      if (advanceTimer !== timer) return;
      cancelAdvance();
      advanceTimer = setTimeout(advance, feedbackDelay);
    });
  } else {
    advanceTimer = setTimeout(advance, feedbackDelay);
  }
}

function cancelAdvance() {
  clearTimeout(advanceTimer);
  advanceTimer = undefined;
  successSound.onended = null;
  successSound.onerror = null;
  successSound.pause();
}

function advance() {
  if (!scored || byId("question").hidden) return;
  cancelAdvance();
  if (index + 1 === queue.length) {
    showResult();
    return;
  }
  index++;
  renderQuestion(true);
  listen();
}

function listen() {
  const button = byId("listen");
  if (button.disabled || active || scored) return;
  const tencent = provider.value === "tencent";
  const recognizer = tencent ? new TencentRecognition() : new Recognition();
  recognizer.lang = "en-US";
  recognizer.continuous = false;
  recognizer.interimResults = false;
  const session = { recognizer };
  active = session;
  const label = byId("listen-label");
  button.disabled = true;
  label.textContent = "正在开启麦克风…";
  feedback("如有提示，请允许麦克风权限。");

  function finish(message, transcript = "") {
    if (active !== session) return;
    stopListening();
    button.disabled = false;
    if (normalize(transcript)) {
      score(transcript);
    } else {
      label.textContent = "再说一次";
      feedback(message);
    }
  }

  session.timeout = setTimeout(() => finish("麦克风启动超时，请检查权限后重试。"), 20000);
  function showProcessing() {
    label.textContent = "正在识别…";
    clearInterval(session.clock);
    clearTimeout(session.timeout);
    session.timeout = setTimeout(() => finish("本次未收到识别结果，请再说一次。"), tencent ? 15000 : 3000);
  }
  recognizer.onprocessing = showProcessing;
  recognizer.onstart = () => {
    if (active !== session) return;
    clearTimeout(session.timeout);
    const deadline = Date.now() + seconds * 1000;
    label.textContent = `正在聆听 · ${seconds} 秒`;
    feedback("请读出卡片上的英文。");
    session.clock = setInterval(() => {
      label.textContent = `正在聆听 · ${Math.max(0, Math.ceil((deadline - Date.now()) / 1000))} 秒`;
    }, 200);
    session.timeout = setTimeout(() => {
      showProcessing();
      try {
        recognizer.stop();
      } catch {
        finish("识别超时，请再说一次。");
      }
    }, seconds * 1000);
  };
  recognizer.onresult = event => finish("未听清，请再说一次。", event.results[event.resultIndex]?.[0]?.transcript ?? "");
  recognizer.onnomatch = () => finish("未听清，请再说一次。");
  recognizer.onend = () => finish("未听清，请再说一次。");
  recognizer.onerror = event => {
    const errors = {
      "not-allowed": "请在浏览器设置中允许此网页使用麦克风，再重试。",
      "service-not-allowed": "浏览器未允许使用语音识别服务。",
      "audio-capture": "未检测到可用麦克风，请检查设备。",
      network: "语音识别服务连接失败，请检查网络后重试。",
      "no-speech": "未听到朗读，请再说一次。"
    };
    finish(event.message || errors[event.error] || "语音识别未完成，请重试。");
  };
  try {
    recognizer.start();
  } catch {
    finish("无法启动语音识别，请重试。");
  }
}

function showResult() {
  byId("question").hidden = true;
  byId("result").hidden = false;
  byId("counter").textContent = `${queue.length} / ${queue.length}`;
  byId("result-score").textContent = `识别正确 ${right} / ${queue.length} · 错词 ${wrong.length} 个`;
  byId("wrong-list").replaceChildren(...wrong.map(([word, meaning]) => {
    const item = document.createElement("li");
    const english = document.createElement("strong");
    english.lang = "en";
    english.textContent = word;
    item.append(english, ` · ${meaning} · ${wordAccuracy(word)}`);
    return item;
  }));
  byId("wrong-list").hidden = !wrong.length;
  byId("retry").hidden = !wrong.length;
  byId("result-title").focus();
}

const mic = byId("listen");
provider.addEventListener("change", () => {
  byId("provider-note").hidden = provider.value !== "tencent";
  if (scored || byId("question").hidden) return;
  stopListening();
  refreshMic();
});
const topicButtons = topics.map((topic, id) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "topic transition-colors";
  button.innerHTML = `<span class="topic-icon" aria-hidden="true">${topic.icon}</span><span><b>${topic.name}</b><small lang="en">${topic.english}</small></span>`;
  button.addEventListener("click", () => {
    if (id === topicIndex) return;
    if (!byId("question").hidden && (index > 0 || scored) && !window.confirm("切换话题会结束当前练习，已记录的次数会保留。继续切换？")) return;
    startRound(id);
  });
  byId("topics").append(button);
  return button;
});

mic.addEventListener("click", listen);
byId("next").addEventListener("click", advance);
byId("retry").addEventListener("click", () => {
  startRound(topicIndex, wrong);
  listen();
});
byId("restart").addEventListener("click", () => {
  startRound(topicIndex);
  listen();
});
window.addEventListener("pagehide", () => {
  cancelAdvance();
  if (!active) return;
  stopListening();
  refreshMic();
});
showStats();
startRound(0, null, false);
