import { state } from "./state.js";
import { agePrograms, levelStandards, quiz, words, placementQuestions } from "../data/index.js";
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

function countDueWords() {
  return words.filter((word) => isDue(state.wordSchedule[word.word])).length;
}

export function renderDailyPlan() {
  const module = nextLessonModule();
  const dueWords = countDueWords();
  const quizMinutes = Math.max(5, Math.ceil(quiz.length / 3));

  document.querySelector("#hero-lesson-label").textContent = `今日推荐 · ${module.label} · 约 12 分钟`;
  document.querySelector("#hero-module-title").textContent = module.title;
  document.querySelector("#hero-description").textContent = module.description;

  document.querySelector("#daily-plan-duration").textContent = `约 ${12 + 8 + quizMinutes} 分钟`;

  document.querySelector("#task-lesson-title").textContent = module.title;
  document.querySelector("#task-lesson-desc").textContent = "五阶段短课：导入、输入、练习与主动输出";

  document.querySelector("#task-word-title").textContent = dueWords ? `到期词汇（${dueWords} 个）` : "词汇巩固";
  document.querySelector("#task-word-desc").textContent = dueWords
    ? "优先复习今天到期的单词卡片"
    : `浏览词库并完成主动回忆（共 ${words.length} 词）`;

  document.querySelector("#task-quiz-title").textContent = "每日小测";
  document.querySelector("#task-quiz-desc").textContent = `共 ${quiz.length} 道题，检查今天的学习效果`;
  document.querySelector("#task-quiz-meta").textContent = `综合练习 · ${quizMinutes} 分钟`;

  const intro = document.querySelector("#assessment-intro-text");
  if (intro) {
    intro.textContent = `${placementQuestions.length} 道由易到难的题目，帮助你选择更合适的起点。结果仅用于学习推荐，不替代正式语言考试。`;
  }
  const duration = document.querySelector("#assessment-duration");
  if (duration) {
    duration.textContent = `约 ${Math.max(3, Math.ceil(placementQuestions.length / 4))} 分钟`;
  }
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
  document.querySelector("#quiz-task-progress").style.width = `${state.quizBest / quiz.length * 100}%`;

  const weeklyUnits = countWeeklyUnits();
  document.querySelector("#sidebar-progress-bar").style.width = `${weeklyUnits / WEEKLY_GOAL * 100}%`;
  document.querySelector("#sidebar-progress-label").textContent = `本周完成 ${weeklyUnits} / ${WEEKLY_GOAL} 项`;
  document.querySelector(".mini-progress").setAttribute("aria-valuenow", weeklyUnits);
  renderPersonalPath();
  renderDailyPlan();
}
