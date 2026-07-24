import { state } from "./state.js";
import { speakSequence, stopSpeaking } from "./ui.js";
import { showView } from "./router.js";
import { getTodayFocus } from "./dashboard.js";
import { KEYS, getString } from "./persist.js";

function zh(text) {
  return { text, lang: "zh-CN", rate: 0.95 };
}

function en(text, rate = 0.7) {
  return { text, lang: "en-US", rate };
}

export function isKidsMode() {
  return state.selectedAge === "kids";
}

function kidsAutoEnabled() {
  return getString(KEYS.kidsVoiceAuto, "1") !== "0";
}

export function syncKidsModeUi() {
  const kids = isKidsMode();
  document.body.classList.toggle("is-kids-mode", kids);
  document.querySelectorAll("[data-kids-only]").forEach((element) => {
    element.hidden = !kids;
  });
  const coach = document.querySelector("#kids-home-coach");
  if (coach) coach.hidden = !kids;
}

function focusScript() {
  const focus = getTodayFocus();
  if (focus.kind === "assessment") {
    return [
      zh("小朋友你好。"),
      zh("今天先请爸爸妈妈帮你点水平测试。"),
      zh("测完以后，我再带你去上课。"),
    ];
  }
  if (focus.kind === "review") {
    return [
      zh("小朋友你好。"),
      zh("今天有错题要复习。"),
      zh("请点黄色卡片，听题目，再选出正确答案。"),
    ];
  }
  if (focus.kind === "words") {
    return [
      zh("小朋友你好。"),
      zh("今天先复习单词卡片。"),
      zh("点蓝色卡片。先听英语单词，再听中文意思。"),
    ];
  }
  return [
    zh("小朋友你好。"),
    zh("今天可以学一节小课程。"),
    zh("点粉色卡片开始。课堂里看到橙色喇叭，就可以听说明。"),
  ];
}

export function speakHomePlan() {
  const focus = getTodayFocus();
  const script = [
    ...focusScript(),
    zh("下面还有三张卡片：粉色是课程，蓝色是单词，黄色是小测验。"),
    zh(`现在最推荐：${focus.title}。`),
  ];
  return speakSequence(script);
}

export function speakAndGoLearning() {
  stopSpeaking();
  return speakSequence([
    zh("好的，我们去少儿课堂。"),
    zh("点橙色喇叭，就能听到中文说明。"),
  ]).then(() => {
    showView("learning");
  });
}

export function speakTaskCard(kind) {
  if (kind === "lesson") {
    return speakSequence([
      zh("这是课程卡片。"),
      zh(document.querySelector("#task-lesson-title")?.textContent || "今天的短课"),
      zh(document.querySelector("#task-lesson-desc")?.textContent || "点箭头开始学习。"),
    ]);
  }
  if (kind === "words") {
    return speakSequence([
      zh("这是单词卡片。"),
      zh(document.querySelector("#task-word-title")?.textContent || "词汇复习"),
      zh("点箭头进入，可以听英语和中文。"),
    ]);
  }
  return speakSequence([
    zh("这是练习卡片。"),
    zh(document.querySelector("#task-quiz-title")?.textContent || "每日小测"),
    zh("点箭头开始做题。听不懂就再点喇叭。"),
  ]);
}

export function speakAgeChoice(age) {
  const lines = {
    kids: [zh("少儿启蒙。适合六到九岁小朋友。里面有听一听功能。")],
    teens: [zh("青少年课程。")],
    exam: [zh("高中备考课程。")],
    adults: [zh("成人英语课程。")],
  };
  return speakSequence(lines[age] || [zh("已选择学习阶段。")]);
}

export function renderKidsHomeCoach() {
  syncKidsModeUi();
  if (!isKidsMode()) return;
  const script = document.querySelector("#kids-home-script");
  const focus = getTodayFocus();
  if (script) {
    script.textContent = `点大喇叭听安排。今天优先：${focus.title}。不会认字也没关系。`;
  }
}

let homeWelcomed = false;

export function maybeWelcomeKidsHome() {
  if (!isKidsMode() || !kidsAutoEnabled() || homeWelcomed) return;
  homeWelcomed = true;
  speakSequence([
    zh("小朋友你好，我是 Lingua。"),
    zh("这里的字如果还不认识，就点橙色大喇叭，听我慢慢说。"),
    zh("想上课的话，点听完去上课。"),
  ]);
}

export function initKidsVoice() {
  syncKidsModeUi();

  document.querySelector("[data-kids-listen-home]")?.addEventListener("click", () => {
    speakHomePlan();
  });

  document.querySelector("[data-kids-start-learning]")?.addEventListener("click", () => {
    speakAndGoLearning();
  });

  document.querySelectorAll("[data-kids-listen-task]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      speakTaskCard(button.dataset.kidsListenTask);
    });
  });

  document.querySelectorAll("[data-kids-listen-age]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      speakAgeChoice(button.dataset.kidsListenAge);
    });
  });

  document.querySelector("[data-kids-listen-phrase]")?.addEventListener("click", () => {
    speakSequence([
      zh("每日一句。先听中文。"),
      zh("每天迈出一小步，终将带来巨大的改变。"),
      zh("再听英文。"),
      en("Small steps every day lead to big changes.", 0.7),
    ]);
  });
}
