import { state } from "./state.js";
import { agePrograms, levelStandards, quiz, buildPracticeSession, activeWordDeck, placementQuestions } from "../data/index.js";
import { localDateKey, weekDateKeys, saveJson } from "./utils.js";
import { isDue } from "./srs.js";
import { KEYS, setCsvSet } from "./persist.js";

const WEEKLY_GOAL = 8;
const DAILY_CAP = 3;

export function recordLearningDay() {
  const key = localDateKey(new Date());
  if (state.learningDays.has(key)) return;
  state.learningDays.add(key);
  setCsvSet(KEYS.learningDays, state.learningDays);
  renderWeek();
}

export function recordWeekActivity(points = 1) {
  recordLearningDay();
  const key = localDateKey(new Date());
  const current = Number(state.weekLog[key]) || 0;
  state.weekLog[key] = Math.min(current + points, DAILY_CAP);
  const keep = new Set(weekDateKeys());
  // Keep a little history beyond this week for debugging, but trim far-past noise.
  for (const day of Object.keys(state.weekLog)) {
    if (!keep.has(day)) {
      const ageMs = Date.now() - new Date(`${day}T00:00:00`).getTime();
      if (ageMs > 21 * 24 * 60 * 60 * 1000) delete state.weekLog[day];
    }
  }
  saveJson("linguaWeekLog", state.weekLog);
}

export function countWeeklyUnits() {
  const keys = new Set(weekDateKeys());
  return Math.min(
    Object.entries(state.weekLog)
      .filter(([day]) => keys.has(day))
      .reduce((sum, [, value]) => sum + (Number(value) || 0), 0),
    WEEKLY_GOAL,
  );
}

export function renderWeek() {
  const days = ["一", "二", "三", "四", "五", "六", "日"];
  const today = new Date();
  const todayIndex = (today.getDay() + 6) % 7;
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - todayIndex);
  document.querySelector("#week-row").innerHTML = days.map((day, index) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index);
    const done = state.learningDays.has(localDateKey(date));
    return `
    <div class="day-item ${done ? "done" : ""} ${index === todayIndex ? "today" : ""}">
      <span>${day}</span><span class="day-dot">${done && index !== todayIndex ? "✓" : date.getDate()}</span>
    </div>`;
  }).join("");
}

export function renderPersonalPath() {
  const title = document.querySelector("#personal-path-title");
  const description = document.querySelector("#personal-path-description");
  const steps = document.querySelector("#personal-path-steps");
  const action = document.querySelector("#personal-path-action");
  if (state.learnerLevel === "未测评") {
    title.textContent = "完成水平测试，生成你的学习路径";
    description.textContent = "系统会结合年龄阶段、英语等级和学习进度，推荐接下来最值得学习的内容。";
    steps.innerHTML = `<span>1. 水平诊断</span><span>2. 分龄课程</span><span>3. 周期复习</span>`;
    action.textContent = "开始水平测试";
    return;
  }
  const program = agePrograms[state.selectedAge];
  const incomplete = program.modules.filter((module) => !state.completedLessons.has(`${state.selectedAge}:${module.type}`));
  const pathItems = incomplete.length ? incomplete : program.modules;
  title.textContent = `${state.learnerLevel} · ${program.title}`;
  description.textContent = (levelStandards[state.learnerLevel] || levelStandards.A2).summary;
  steps.innerHTML = pathItems.slice(0, 3).map((module, index) => `<span>${index + 1}. ${module.label}：${module.title}</span>`).join("");
  action.textContent = "查看完整知识地图";
}

function nextLessonModule() {
  const program = agePrograms[state.selectedAge];
  const incomplete = program.modules.filter((module) => !state.completedLessons.has(`${state.selectedAge}:${module.type}`));
  return incomplete[0] || program.modules[0];
}

function wordDeck() {
  return activeWordDeck(state.learnerLevel, state.selectedAge);
}

function countDueWords() {
  return wordDeck().filter((word) => isDue(state.wordSchedule[word.word])).length;
}

function countDueMistakes() {
  return state.mistakes.filter((item) => item.nextReview <= Date.now()).length;
}

/** Priority: placement → due mistakes → due words → next lesson. */
export function getTodayFocus() {
  const dueMistakes = countDueMistakes();
  const dueWords = countDueWords();
  const module = nextLessonModule();

  if (state.learnerLevel === "未测评") {
    return {
      kind: "assessment",
      eyebrow: "今日优先",
      title: "先完成水平测试",
      description: "约 3 分钟，生成适合你的等级与课程路径。",
      cta: "开始水平测试",
    };
  }
  if (dueMistakes > 0) {
    return {
      kind: "review",
      eyebrow: "今日优先 · 到期复习",
      title: `${dueMistakes} 个错题待复习`,
      description: "间隔复习到期了，先清掉再学新课，记忆更牢。",
      cta: "打开错题本",
    };
  }
  if (dueWords > 0) {
    return {
      kind: "words",
      eyebrow: "今日优先 · 词汇到期",
      title: `${dueWords} 个单词待复习`,
      description: "用主动回忆过一遍到期词卡，再进入今天的短课。",
      cta: "开始词汇复习",
    };
  }
  return {
    kind: "lesson",
    eyebrow: `今日优先 · ${module.label}`,
    title: module.title,
    description: module.description,
    cta: "开始今日短课",
  };
}

export function renderTodayFocus() {
  const focus = getTodayFocus();
  const card = document.querySelector("#today-focus");
  const action = document.querySelector("#today-focus-action");
  if (!card || !action) return;
  // 未测评时 Hero + 学习路径已有入口，避免首页再叠一块「去测评」
  const showFocus = focus.kind !== "assessment";
  card.hidden = !showFocus;
  if (!showFocus) return;
  document.querySelector("#today-focus-eyebrow").textContent = focus.eyebrow;
  document.querySelector("#today-focus-title").textContent = focus.title;
  document.querySelector("#today-focus-description").textContent = focus.description;
  action.textContent = focus.cta;
  action.dataset.focusKind = focus.kind;
  card.dataset.focusKind = focus.kind;
}

export function renderDailyPlan() {
  const module = nextLessonModule();
  const dueWords = countDueWords();
  const dueMistakes = countDueMistakes();
  const quizSessionLen = buildPracticeSession(quiz, state.learnerLevel, state.selectedAge, 12).length;
  const quizMinutes = Math.max(5, Math.ceil(quizSessionLen / 3));
  const focus = getTodayFocus();
  const reviewMinutes = dueMistakes ? Math.min(10, dueMistakes * 2) : 0;

  document.querySelector("#hero-lesson-label").textContent = `${focus.eyebrow} · 约 ${focus.kind === "assessment" ? 3 : focus.kind === "review" ? reviewMinutes || 5 : focus.kind === "words" ? 8 : 12} 分钟`;
  document.querySelector("#hero-module-title").textContent = focus.title;
  document.querySelector("#hero-description").textContent = focus.description;
  document.querySelectorAll("[data-today-focus]").forEach((button) => {
    button.dataset.focusKind = focus.kind;
    if (button.id === "today-focus-action" || button.matches(".hero-copy [data-today-focus]")) {
      button.innerHTML = button.id === "today-focus-action" ? focus.cta : `${focus.cta} <span>→</span>`;
    }
  });

  document.querySelector("#daily-plan-duration").textContent = `约 ${12 + 8 + quizMinutes + reviewMinutes} 分钟`;

  document.querySelector("#task-lesson-title").textContent = module.title;
  document.querySelector("#task-lesson-desc").textContent = "五阶段短课：导入、输入、练习与主动输出";
  document.querySelector("#task-lesson-card")?.classList.toggle("is-priority", focus.kind === "lesson");

  document.querySelector("#task-word-title").textContent = dueWords ? `到期词汇（${dueWords} 个）` : "词汇巩固";
  document.querySelector("#task-word-desc").textContent = dueWords
    ? "优先复习今天到期的单词卡片"
    : `浏览当前词库并完成主动回忆（共 ${wordDeck().length} 词）`;
  document.querySelector("#task-word-card")?.classList.toggle("is-due", dueWords > 0);
  document.querySelector("#task-word-card")?.classList.toggle("is-priority", focus.kind === "words");

  const quizCard = document.querySelector("#task-quiz-card");
  const quizButton = document.querySelector("#task-quiz-card [data-go-practice], #task-quiz-card [data-go-review]");
  if (dueMistakes > 0) {
    document.querySelector("#task-quiz-title").textContent = `错题复习（${dueMistakes} 个到期）`;
    document.querySelector("#task-quiz-desc").textContent = "按 1/3/7/14/30 天间隔巩固答错的知识点";
    document.querySelector("#task-quiz-meta").textContent = `错题本 · 约 ${reviewMinutes || 5} 分钟`;
    quizCard?.classList.add("is-due");
    quizCard?.classList.toggle("is-priority", focus.kind === "review");
    if (quizButton) {
      quizButton.removeAttribute("data-go-practice");
      quizButton.setAttribute("data-go-review", "");
      quizButton.setAttribute("aria-label", "打开错题本");
    }
  } else {
    document.querySelector("#task-quiz-title").textContent = "每日小测";
    document.querySelector("#task-quiz-desc").textContent = `本次约 ${quizSessionLen} 道题（按等级抽题），检查今天的学习效果`;
    document.querySelector("#task-quiz-meta").textContent = `综合练习 · ${quizMinutes} 分钟`;
    quizCard?.classList.remove("is-due");
    quizCard?.classList.remove("is-priority");
    if (quizButton) {
      quizButton.removeAttribute("data-go-review");
      quizButton.setAttribute("data-go-practice", "");
      quizButton.setAttribute("aria-label", "开始综合练习");
    }
  }

  renderTodayFocus();
  renderBackupNudge();

  const intro = document.querySelector("#assessment-intro-text");
  if (intro) {
    intro.textContent = `${placementQuestions.length} 道由易到难的题目，帮助你选择更合适的起点。结果仅用于学习推荐，不替代正式语言考试。`;
  }
  const duration = document.querySelector("#assessment-duration");
  if (duration) {
    duration.textContent = `约 ${Math.max(3, Math.ceil(placementQuestions.length / 4))} 分钟`;
  }
}

export function renderBackupNudge() {
  const nudge = document.querySelector("#backup-nudge");
  if (!nudge) return;
  const raw = localStorage.getItem(KEYS.lastBackupAt);
  const last = raw ? Date.parse(raw) : NaN;
  const days = Number.isFinite(last) ? Math.floor((Date.now() - last) / 86400000) : null;
  if (days === null) {
    nudge.hidden = false;
    nudge.textContent = "进度只存在本机浏览器。建议导出一份 JSON 备份，换设备或清缓存时可用导入恢复。";
    return;
  }
  if (days >= 7) {
    nudge.hidden = false;
    nudge.textContent = `距离上次导出备份已过 ${days} 天。定期导出可避免意外丢失学习记录。`;
    return;
  }
  nudge.hidden = true;
}

export function updateDashboard() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 6 ? "夜深了，学习一小会儿吧" : hour < 12 ? "早上好，准备开始吗？" : hour < 18 ? "下午好，继续进步吧" : "晚上好，来完成今天的学习吧";
  document.querySelector("#greeting-title").textContent = greeting;
  document.querySelector("#current-date").textContent = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(now).toUpperCase();
  document.querySelector("#copyright-year").textContent = now.getFullYear();

  const levelLabel = state.learnerLevel === "未测评" ? "等级未测评" : `Level ${state.learnerLevel}`;
  document.querySelectorAll(".profile-level").forEach((element) => { element.textContent = levelLabel; });
  document.querySelector("#home-level").textContent = state.learnerLevel === "未测评" ? "尚未测评" : `${state.learnerLevel} 建议等级`;

  let streak = 0;
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayKey = localDateKey(cursor);
  if (!state.learningDays.has(todayKey)) cursor.setDate(cursor.getDate() - 1);
  while (state.learningDays.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  document.querySelector("#streak-count").textContent = streak;

  const currentCompleted = agePrograms[state.selectedAge].modules.filter((module) => state.completedLessons.has(`${state.selectedAge}:${module.type}`)).length;
  document.querySelector("#lesson-task-progress").style.width = `${currentCompleted / 3 * 100}%`;
  document.querySelector("#word-task-progress").style.width = `${Math.min(state.learnedWords / 12 * 100, 100)}%`;
  const quizDenom = Math.max(1, buildPracticeSession(quiz, state.learnerLevel, state.selectedAge, 12).length);
  document.querySelector("#quiz-task-progress").style.width = `${Math.min(state.quizBest / quizDenom * 100, 100)}%`;

  const weeklyUnits = countWeeklyUnits();
  document.querySelector("#sidebar-progress-bar").style.width = `${weeklyUnits / WEEKLY_GOAL * 100}%`;
  document.querySelector("#sidebar-progress-label").textContent = `本周完成 ${weeklyUnits} / ${WEEKLY_GOAL} 项`;
  document.querySelector(".mini-progress").setAttribute("aria-valuenow", weeklyUnits);
  renderPersonalPath();
  renderDailyPlan();
  import("./kids-voice.js").then((mod) => mod.renderKidsHomeCoach()).catch(() => {});
}
