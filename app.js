const topics = [
  {
    name: "学习与工作", english: "Study & Work", icon: "📚",
    words: [
      ["assignment", "作业，任务"], ["deadline", "截止日期"], ["lecture", "讲座；大学课程"], ["degree", "学位"],
      ["semester", "学期"], ["internship", "实习"], ["colleague", "同事"], ["promotion", "晋升"],
      ["salary", "薪水"], ["workload", "工作量"], ["schedule", "日程安排"], ["teamwork", "团队合作"],
      ["qualification", "资格，资历"], ["profession", "职业"], 
      ["job interview", "求职面试"],["career path", "职业发展路径"], ["work experience", "工作经验"], ["part-time job", "兼职工作"],
      ["meet a deadline", "赶上截止日期"], ["work from home", "在家办公"],
      ["take notes", "记笔记"], ["give a presentation", "做演示汇报"],
      ["apply for a job", "申请工作"], ["gain practical experience", "积累实践经验"]
    ]
  },
  {
    name: "日常生活", english: "Daily Life", icon: "☕",
    words: [
      ["routine", "日常惯例"], ["commute", "通勤"], ["neighborhood", "社区，街区"], ["apartment", "公寓"],
      ["rent", "租金；租用"], ["laundry", "要洗的衣物；洗衣"], ["groceries", "食品杂货"], ["recipe", "食谱"],
      ["breakfast", "早餐"], ["exercise", "锻炼"], ["housework", "家务"], ["errand", "外出要办的事"],
      ["budget", "预算"], ["convenient", "方便的"], 
      ["rush hour", "交通高峰期"], ["get up early", "早起"],
      ["take a break", "休息一下"], ["eat out", "外出就餐"], ["do the dishes", "洗碗"], ["go for a walk", "去散步"],
      ["do the laundry", "洗衣服"], ["cook dinner", "做晚饭"], ["catch the bus", "赶公交车"], ["go to bed", "上床睡觉"]
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
      ["travel abroad", "出国旅行"], ["take photos", "拍照"], ["go camping", "去露营"],
      ["pack a suitcase", "收拾行李箱"], ["go on a guided tour", "参加有导游的游览"]
    ]
  },
  {
    name: "健康与运动", english: "Health & Fitness", icon: "🏃",
    words: [
      ["posture", "姿势"], ["injury", "损伤"], ["recovery", "恢复"],
      ["nutrition", "营养"], ["strength", "力量"], ["flexibility", "柔韧性"],
      ["workout", "锻炼"], ["stress", "压力"], ["stretching", "拉伸"], ["stamina", "耐力"],
      ["stay in shape", "保持体形"],
      ["work out regularly", "定期锻炼"], ["relieve stress", "缓解压力"], ["get enough sleep", "睡够觉"],
      ["cut down on sugar", "减少糖摄入"], ["eat a balanced diet", "保持均衡饮食"],
      ["build muscle", "增肌"], ["go for a run", "去跑步"], ["warm up before exercise", "运动前热身"],
      ["recover from an injury", "从伤病中恢复"]
    ]
  },
  {
    name: "科技与社交媒体", english: "Technology & Social Media", icon: "📱",
    words: [
      ["device", "设备"], ["notification", "通知"], ["privacy", "隐私"],
      ["password", "密码"], ["platform", "平台"], ["algorithm", "算法"],
      ["follower", "关注者"], ["comment", "评论"], ["distraction", "让人分心的事物"],
      ["misinformation", "错误信息"],
      ["scroll through my feed", "刷我的社交动态"], ["keep in touch", "保持联系"],
      ["post a photo", "发布照片"], ["turn off notifications", "关闭通知"],
      ["limit screen time", "限制屏幕使用时间"], ["protect personal information", "保护个人信息"],
      ["share a link", "分享链接"], ["join a video call", "加入视频通话"],
      ["take a break from social media", "暂时不用社交媒体"], ["verify the source", "核实信息来源"]
    ]
  },
  {
    name: "人际交流", english: "Interpersonal Communication", icon: "💬",
    words: [
      ["thoughtful", "体贴的"], ["friendly", "友好的"],
      ["helpful", "乐于助人的"], ["patient", "有耐心的"],
      ["polite", "有礼貌的"], ["respectful", "尊重他人的"],
      ["supportive", "给予支持的"], ["trust", "信任"],
      ["empathy", "同理心"], ["compromise", "妥协，折中"],
      ["friendly and helpful", "友好又乐于助人"], ["kind and patient", "善良又有耐心"],
      ["polite and respectful", "有礼貌且尊重他人"], ["respect others' privacy", "尊重他人的隐私"],
      ["get along well with others", "与他人相处融洽"], ["share ideas and opinions", "分享想法和意见"],
      ["build strong family ties", "建立紧密的家庭关系"], ["work closely with colleagues", "与同事密切合作"],
      ["a thoughtful gift", "一份用心挑选的礼物"], ["catch up with old friends", "与老朋友叙旧"]
    ]
  },
  {
    name: "引言", english: "Introduction", icon: "📝", writing: true,
    words: [
      ["illustrate", "图示，展示", "The two charts illustrate changes in household spending."],
      ["compare", "比较", "The charts compare water use in three countries."],
      ["chart", "图表", "The chart shows how people travelled to work in 2020."],
      ["graph", "示意图，统计图", "The graph shows changes in monthly rainfall."],
      ["table", "表格", "The table shows average salaries in five industries."],
      ["number", "数量", "The number of visitors is given for each month."],
      ["amount", "量，用于不可数名词", "The chart shows the amount of electricity used by households."],
      ["percentage", "百分比", "The graph shows the percentage of households with internet access."],
      ["proportion", "比例", "The chart compares the proportion of adults who cycle to work in three cities."],
      ["average", "平均的，平均值", "The table shows the average age of residents in each area."],
      ["shows changes in", "展示……的变化", "The graph shows changes in rail use from 2010 to 2020."],
      ["provides data on", "提供关于……的数据", "The table provides data on bus use in four cities."],
      ["broken down by", "按……细分", "The chart shows household spending broken down by category."],
      ["number of", "……的数量", "The table shows the number of students in each course."],
      ["amount of", "……的量，用于不可数名词", "The graph shows the amount of water used each month."],
      ["percentage of", "……的百分比", "The chart compares the percentage of homes with solar panels in three regions."],
      ["proportion of", "……的比例", "The graph shows the proportion of workers who worked from home."],
      ["average number", "平均数量", "The table shows the average number of trips per person."],
      ["from January", "从一月开始", "The graph shows monthly sales from January to June."],
      ["over ten years", "在十年期间", "The chart shows how electricity use changed over ten years."]
    ]
  },
  {
    name: "概述", english: "Overview", icon: "📊", writing: true,
    words: [
      ["overall", "总体来看", "Overall, car use rose while bus use declined."],
      ["trend", "趋势", "The general trend was towards higher electricity use."],
      ["upward", "向上的", "Sales showed an upward trend in both regions."],
      ["downward", "向下的", "Bus use followed a downward trend."],
      ["stable", "稳定的", "Rail use remained stable throughout the period."],
      ["pattern", "变化模式", "Car and bus use showed the same pattern over time."],
      ["highest", "最高的", "France had the highest recycling rate throughout the period."],
      ["lowest", "最低的", "The youngest age group had the lowest employment rate."],
      ["increase", "增长，增幅", "Overall, there was an increase in rail use in all three cities."],
      ["share", "份额，占比", "Housing took up the largest share of household spending."],
      ["in general", "总体来看", "In general, household spending rose across all income groups."],
      ["upward trend", "上升趋势", "Online sales showed an upward trend."],
      ["downward trend", "下降趋势", "Coal production followed a downward trend."],
      ["remained relatively stable", "保持相对稳定", "Water use remained relatively stable in both regions."],
      ["similar pattern", "相似的变化规律", "The two cities followed a similar pattern."],
      ["highest figure", "最高数值", "France recorded the highest figure throughout the period."],
      ["lowest figure", "最低数值", "Spain had the lowest figure in every year shown."],
      ["largest increase", "最大增幅", "Rail travel saw the largest increase overall."],
      ["largest share", "最大份额", "Housing accounted for the largest share of household spending."],
      ["throughout the period", "在整个时期内", "Car use remained higher than bus use throughout the period."]
    ]
  },
  {
    name: "细节", english: "Details", icon: "📈", writing: true,
    words: [
      ["rise", "上升", "There was a rise in car sales in June."],
      ["drop", "下降", "There was a drop in bus use in 2020."],
      ["peak", "达到峰值", "Sales tend to peak in December."],
      ["fluctuate", "波动", "Ticket prices fluctuate throughout the year."],
      ["steadily", "稳步地", "The population grew steadily from 2000 to 2020."],
      ["sharply", "急剧地", "Oil prices rose sharply in March."],
      ["overtake", "超过原本领先的对象", "Online sales are projected to overtake store sales by 2030."],
      ["gap", "差距", "The gap between the two figures was small in 2010."],
      ["whereas", "而，用于对比", "Car use rose, whereas bus use declined."],
      ["respectively", "分别，按顺序对应", "The figures for France and Spain were 40% and 60%, respectively."],
      ["stood at", "数值为……", "The unemployment rate stood at 6% in May."],
      ["rose to", "上升到……", "The recycling rate rose to 70% in 2020."],
      ["fell by", "下降了……", "The number of visitors fell by 500 in July."],
      ["peaked at", "在……达到峰值", "Monthly sales peaked at 8,000 units in December."],
      ["fluctuated between", "在……之间波动", "The rate fluctuated between 4% and 6%."],
      ["percentage points", "百分点", "The rate rose by ten percentage points, from 40% to 50%."],
      ["twice as high", "是……的两倍", "The rate in France was twice as high as that in Spain."],
      ["compared with", "与……相比", "The city recorded 800 trips in May, compared with 600 in April."],
      ["the gap widened", "差距扩大", "By 2020, the gap widened to 15 percentage points."],
      ["the gap narrowed", "差距缩小", "In 2020, the gap narrowed to five percentage points."]
    ]
  }
];

const byId = id => document.getElementById(id);
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const provider = byId("provider");
const storageKey = "speak-daily-stats-v1";
const roundLogKey = "speak-daily-rounds-v1";
const roundSize = 10;
const milestoneInterval = 50;
const practiceLabels = { word: "单词", phrase: "词组" };
const seconds = 8;
const feedbackDelay = 1400;
const successSound = new Audio("./complete.wav");
successSound.preload = "auto";
let stats = { correct: 0, attempts: 0, words: {} };
let topicIndex = 0;
let practiceType = "word";
let queue = [];
let index = 0;
let right = 0;
let wrong = [];
let scored = false;
let active = null;
let advanceTimer;
let roundStartedAt;
let roundIsReview = false;
let pausedAt = null;
const showEnglish = byId("show-english");
const pauseButton = byId("pause");

function saveRoundLog() {
  const entry = {
    completedAt: new Date().toISOString(),
    topic: topics[topicIndex].name,
    type: practiceType,
    review: roundIsReview,
    total: queue.length,
    correct: right,
    wrong: wrong.length,
    durationMs: Math.round(performance.now() - roundStartedAt)
  };
  try {
    const saved = JSON.parse(localStorage.getItem(roundLogKey));
    const rounds = Array.isArray(saved) ? saved : [];
    rounds.push(entry);
    localStorage.setItem(roundLogKey, JSON.stringify(rounds));
  } catch {
    byId("storage-note").textContent = "无法保存本轮练习日志。";
  }
}

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
  clearInterval(session.countdown);
  try {
    session.recognizer.abort();
  } catch {
    // Some browsers have already closed the recognition session.
  }
}

function pickRoundEntries(topic, type) {
  return topic.words
    .filter(([word]) => /\s/.test(word.trim()) === (type === "phrase"))
    .slice(0, roundSize);
}

function prepareRound(selected, type, missed = null, focus = true) {
  pausedAt = null;
  cancelAdvance();
  stopListening();
  topicIndex = selected;
  practiceType = type;
  const review = missed !== null;
  queue = missed ? [...missed] : pickRoundEntries(topics[selected], type);
  index = 0;
  right = 0;
  wrong = [];
  topicPracticeButtons.forEach((buttons, id) => {
    for (const [option, button] of buttons) {
      button.setAttribute("aria-pressed", id === selected && option === type);
    }
  });
  const topic = topics[selected];
  byId("round-label").textContent = `${topic.writing ? "小作文 · " : ""}${topic.name} · ${practiceLabels[type]}${review ? " · 错词重练" : ""}`;
  if (review) {
    beginRound(true);
    return;
  }
  byId("counter").textContent = `${queue.length} 个`;
  byId("progress").hidden = true;
  byId("question").hidden = true;
  byId("result").hidden = true;
  renderPreviewList();
  byId("preview").hidden = false;
  if (focus) byId("preview-title").focus();
}

function renderPreviewList() {
  byId("preview-list").replaceChildren(...queue.map(([word, meaning, example]) => {
    const item = document.createElement("li");
    const english = document.createElement("strong");
    english.lang = "en";
    english.textContent = word;
    const translation = document.createElement("span");
    translation.textContent = meaning;
    const details = document.createElement("span");
    details.className = "preview-details";
    const correct = document.createElement("span");
    correct.className = "preview-count";
    correct.textContent = `正确 ${stats.words[word]?.correct ?? 0} 次`;
    details.append(translation, correct);
    item.append(english, details);
    if (example) {
      const sentence = document.createElement("p");
      sentence.className = "preview-example";
      sentence.lang = "en";
      sentence.textContent = example;
      item.append(sentence);
    }
    return item;
  }));
}

function beginRound(review = false) {
  pauseButton.textContent = "暂停";
  roundIsReview = review;
  roundStartedAt = performance.now();
  byId("preview").hidden = true;
  byId("progress").hidden = false;
  renderQuestion(true);
  listen();
}

function updateAnswerVisibility() {
  const answeredIncorrectly = scored && wrong.at(-1) === queue[index];
  byId("word").hidden = !showEnglish.checked && !answeredIncorrectly;
  byId("question-example").hidden = !queue[index]?.[2] || byId("word").hidden;
}

function renderQuestion(focus) {
  scored = false;
  const [word, meaning, example] = queue[index];
  byId("result").hidden = true;
  byId("question").hidden = false;
  byId("counter").textContent = `${index + 1} / ${queue.length}`;
  byId("progress").max = queue.length;
  byId("progress").value = index;
  byId("word").textContent = word;
  byId("question-example").textContent = example ?? "";
  updateAnswerVisibility();
  byId("meaning").textContent = meaning;
  byId("word-stats").textContent = wordAccuracy(word);
  byId("next").hidden = true;
  byId("next").disabled = false;
  byId("listen").hidden = false;
  refreshMic();
  if (focus) byId(showEnglish.checked ? "word" : "meaning").focus();
}

function togglePause() {
  if (byId("question").hidden) return;
  if (pausedAt === null) {
    pausedAt = performance.now();
    cancelAdvance();
    stopListening();
    byId("listen").disabled = true;
    byId("next").disabled = true;
    pauseButton.textContent = "继续";
    feedback("练习已暂停。");
    return;
  }

  roundStartedAt += performance.now() - pausedAt;
  pausedAt = null;
  byId("next").disabled = false;
  pauseButton.textContent = "暂停";
  if (scored) {
    advance();
  } else {
    refreshMic();
    listen();
  }
}

function normalize(text) {
  return text.toLowerCase().replace(/\bneighbourhood\b/g, "neighborhood")
    .replace(/[^a-z]+/g, " ").trim();
}

function matchesAnswer(transcript, target) {
  const spoken = normalize(transcript);
  if (spoken === normalize(target)) return true;
  const parts = target.split(/(?<=[a-z])[-‐‑–](?=[a-z])/i);
  if (parts.length === 1) return false;
  const pattern = parts.map(normalize).join(" ?");
  return new RegExp(`^${pattern}$`).test(spoken);
}

function score(transcript) {
  const word = queue[index];
  const correct = matchesAnswer(transcript, word[0]);
  scored = true;
  stats.attempts++;
  if (stats.attempts % milestoneInterval === 0) {
    byId("milestone-title").textContent = `🎉 累计完成 ${stats.attempts} 题！`;
    byId("break-reminder").hidden = false;
  }
  const counts = stats.words[word[0]] ??= { correct: 0, attempts: 0 };
  counts.attempts++;
  if (correct) {
    right++;
    stats.correct++;
    counts.correct++;
  } else {
    wrong.push(word);
  }
  updateAnswerVisibility();
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
  if (pausedAt !== null || !scored || byId("question").hidden) return;
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
  if (pausedAt !== null || button.disabled || active || scored || byId("question").hidden) return;
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
    if (active !== session) return;
    clearInterval(session.countdown);
    label.textContent = "正在识别…";
    clearTimeout(session.timeout);
    session.timeout = setTimeout(() => finish("本次未收到识别结果，请再说一次。"), tencent ? 15000 : 3000);
  }
  recognizer.onprocessing = showProcessing;
  recognizer.onstart = () => {
    if (active !== session) return;
    clearTimeout(session.timeout);
    const deadline = performance.now() + seconds * 1000;
    function showCountdown() {
      const remaining = Math.max(0, Math.ceil((deadline - performance.now()) / 1000));
      label.textContent = `正在聆听 · ${remaining} 秒`;
    }
    showCountdown();
    session.countdown = setInterval(showCountdown, 200);
    feedback("请用英文朗读。");
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
  saveRoundLog();
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
function switchPractice(selected, type) {
  if (selected === topicIndex && type === practiceType && !byId("preview").hidden) return;
  if (!byId("question").hidden && (active || index > 0 || scored)
    && !window.confirm("切换练习会结束当前这一轮，已记录的次数会保留。继续切换？")) return;
  prepareRound(selected, type);
}

provider.addEventListener("change", () => {
  if (pausedAt !== null || scored || byId("question").hidden) return;
  stopListening();
  refreshMic();
});
const topicPracticeButtons = topics.map((topic, id) => {
  const card = document.createElement("div");
  card.className = "topic-card";
  const heading = document.createElement("h3");
  heading.id = `topic-name-${id}`;
  heading.className = "topic-heading";
  heading.innerHTML = `<span class="topic-icon" aria-hidden="true">${topic.icon}</span><span>${topic.name}<small lang="en">${topic.english}</small></span>`;
  const options = document.createElement("div");
  options.className = "practice-types";
  options.setAttribute("role", "group");
  options.setAttribute("aria-labelledby", heading.id);
  const buttons = Object.entries(practiceLabels).map(([type, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = label;
    button.addEventListener("click", () => switchPractice(id, type));
    options.append(button);
    return [type, button];
  });
  card.append(heading, options);
  byId(topic.writing ? "writing-topics" : "topics").append(card);
  return buttons;
});

const speakingTopicsButton = byId("show-speaking-topics");
const writingTopicsButton = byId("show-writing-topics");

function showTopicCategory(writing) {
  byId("topics").hidden = writing;
  byId("writing-topics").hidden = !writing;
  speakingTopicsButton.setAttribute("aria-pressed", String(!writing));
  writingTopicsButton.setAttribute("aria-pressed", String(writing));
}

speakingTopicsButton.addEventListener("click", () => showTopicCategory(false));
writingTopicsButton.addEventListener("click", () => showTopicCategory(true));

byId("shuffle-preview").addEventListener("click", () => {
  if (byId("preview").hidden) return;
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  renderPreviewList();
});
byId("sort-preview").addEventListener("click", () => {
  if (byId("preview").hidden) return;
  queue.sort(([first], [second]) => (stats.words[first]?.correct ?? 0) - (stats.words[second]?.correct ?? 0));
  renderPreviewList();
});
byId("start").addEventListener("click", () => {
  if (byId("preview").hidden) return;
  beginRound();
});
mic.addEventListener("click", listen);
pauseButton.addEventListener("click", togglePause);
byId("dismiss-break").addEventListener("click", () => {
  byId("break-reminder").hidden = true;
});
showEnglish.addEventListener("change", updateAnswerVisibility);
byId("next").addEventListener("click", advance);
byId("retry").addEventListener("click", () => {
  if (!wrong.length) return;
  prepareRound(topicIndex, practiceType, wrong);
});
byId("restart").addEventListener("click", () => {
  prepareRound(topicIndex, practiceType);
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && pausedAt === null && !byId("question").hidden) togglePause();
});
window.addEventListener("pagehide", () => {
  if (pausedAt === null && !byId("question").hidden) togglePause();
});
showStats();
prepareRound(0, practiceType, null, false);
