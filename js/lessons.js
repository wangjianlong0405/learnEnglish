import { courses, levelStandards, agePrograms, lessonChecks, lessonOutputTasks } from "../data/index.js";
import { state } from "./state.js";
import { showToast, speak } from "./ui.js";
import { showView } from "./router.js";
import { recordMistake } from "./mistakes.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { KEYS, setCsvSet, setString } from "./persist.js";
import { syncAllTablists } from "./tabs.js";

/** In-progress multi-step lesson session. */
const lessonSession = {
  type: null,
  step: 0,
  practiceDone: false,
};

function practicePack(type) {
  return lessonChecks[state.selectedAge][type];
}

function moduleMeta(type) {
  return agePrograms[state.selectedAge].modules.find((module) => module.type === type);
}

export function renderCourses(level = "A2") {
  const standard = levelStandards[level];
  document.querySelector("#standard-grid").innerHTML = `
    <article class="standard-summary"><span>${level}</span><div><h2>${standard.summary}</h2><p>当前等级整体目标</p></div></article>
    <article><small>词汇目标</small><strong>${standard.vocab}</strong></article>
    <article><small>语法范围</small><strong>${standard.grammar}</strong></article>
    <article><small>沟通目标</small><strong>${standard.communication}</strong></article>`;
  document.querySelector("#knowledge-map").innerHTML = standard.nodes.map(([title, description], index) => `
    <article class="knowledge-node ${index === 0 ? "is-current" : ""}">
      <span>${String(index + 1).padStart(2, "0")}</span><div><h3>${title}</h3><p>${description}</p></div>
    </article>`).join("");
  document.querySelector("#course-list").innerHTML = courses[level].map(([title, description], index) => `
    <article class="course-item">
      <span class="course-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="course-copy"><h3>${title}</h3><p>${description}</p></div>
      <div class="course-side">
        <span>${level} · ${12 + index * 4} 分钟</span>
        <button type="button" data-course-title="${title}" data-course-level="${level}">进入学习</button>
      </div>
    </article>`).join("");

  document.querySelectorAll("[data-course-title]").forEach((button) => button.addEventListener("click", () => {
    const courseLevel = button.dataset.courseLevel;
    if (state.selectedAge !== "adults") {
      if (courseLevel === "B1" || courseLevel === "B2") state.selectedAge = "exam";
      else if (state.selectedAge === "exam") state.selectedAge = "teens";
    }
    state.selectedTopic = "all";
    renderAgeProgram();
    showView("learning");
    showToast(`已按 ${courseLevel} 难度打开“${button.dataset.courseTitle}”相关内容`);
  }));
}

export function recommendedCourseLevel() {
  return levelStandards[state.learnerLevel] ? state.learnerLevel : "A2";
}

export function syncRecommendedCourseLevel() {
  const level = recommendedCourseLevel();
  document.querySelectorAll("[data-level]").forEach((tab) => {
    const active = tab.dataset.level === level;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  renderCourses(level);
  syncAllTablists(document.querySelector("#lessons"));
}

export function renderAgeProgram() {
  const program = agePrograms[state.selectedAge];
  const completedCount = program.modules.filter((module) => state.completedLessons.has(`${state.selectedAge}:${module.type}`)).length;
  document.querySelectorAll("[data-age]").forEach((button) => {
    const active = button.dataset.age === state.selectedAge;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-topic]").forEach((button) => button.classList.toggle("is-active", button.dataset.topic === state.selectedTopic));
  document.querySelector("#stage-level").textContent = program.level;
  document.querySelector("#stage-overview").innerHTML = `
    <div><h2>${program.title}</h2><p>${program.description}</p></div>
    <div class="stage-plan">
      <span><strong>${program.pace[0]}</strong><small>${program.pace[1]}</small></span>
      <span><strong>${program.goal[0]}</strong><small>${program.goal[1]}</small></span>
      <span><strong data-completed-count>${completedCount}/3</strong><small>短课完成</small></span>
    </div>`;

  const visibleModules = state.selectedTopic === "all" ? program.modules : program.modules.filter((module) => module.type === state.selectedTopic);
  document.querySelector("#learning-modules").innerHTML = visibleModules.map((module) => {
    const steps = practicePack(module.type).length;
    const done = state.completedLessons.has(`${state.selectedAge}:${module.type}`);
    return `
    <article class="learning-module ${done ? "is-complete" : ""}">
      <div class="module-top"><span class="module-icon ${module.type}">${module.icon}</span><span class="module-count">${steps} 题练习</span></div>
      <h3>${module.title}</h3>
      <p>${module.description}</p>
      <div class="module-tags">${module.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <button type="button" data-module="${module.type}">${done ? "复习短课" : "开始短课"} <span>${done ? "✓" : "→"}</span></button>
    </article>`;
  }).join("");

  document.querySelector("#lesson-preview").classList.remove("is-visible");
  document.querySelectorAll("[data-module]").forEach((button) => button.addEventListener("click", () => startLesson(button.dataset.module)));
  setString(KEYS.age, state.selectedAge);
  updateDashboard();
  syncAllTablists(document.querySelector("#learning"));
}

function startLesson(type) {
  lessonSession.type = type;
  lessonSession.step = 0;
  lessonSession.practiceDone = false;
  renderLessonShell();
  renderPracticeStep();
}

function renderLessonShell() {
  const type = lessonSession.type;
  const module = moduleMeta(type);
  const pack = practicePack(type);
  const lessonKey = `${state.selectedAge}:${type}`;
  const preview = document.querySelector("#lesson-preview");
  preview.innerHTML = `
    <header class="lesson-flow-header">
      <div><span class="preview-label">${module.label} · 标准短课</span><h2>${module.title}</h2></div>
      <div class="lesson-flow-steps"><span>1 导入</span><span>2 输入</span><span>3 练习</span><span>4 输出</span><span>5 复习</span></div>
    </header>
    <div class="lesson-teach">
      <section class="lesson-stage"><small>01 · 情景导入</small><p>${module.description}</p></section>
      <section class="lesson-stage"><small>02 · 知识输入</small><div class="lesson-example">${module.example}</div><button class="lesson-audio" type="button" data-speak-example>◖)) 朗读示例</button></section>
      <div class="lesson-points">${module.points.map((point) => `<span>${point}</span>`).join("")}</div>
    </div>
    <div class="lesson-check">
      <div class="practice-progress">
        <span class="preview-label">03 · 控制练习</span>
        <span id="practice-step-label">练习 1 / ${pack.length}</span>
      </div>
      <div class="practice-track" id="practice-track" aria-hidden="true">${pack.map((_, index) => `<span data-practice-dot="${index}"></span>`).join("")}</div>
      <div id="practice-question"></div>
      <section class="lesson-output"><span class="preview-label">04 · 主动输出</span><p>${lessonOutputTasks[type]}</p><textarea id="lesson-output" rows="3" placeholder="在这里完成你的输出任务…"></textarea></section>
      <div class="check-feedback" id="check-feedback">${state.completedLessons.has(lessonKey) ? "这节短课已完成，可以再次练习全部题目。" : `完成本课 ${pack.length} 道练习和输出任务后即可记录进度。`}</div>
    </div>`;
  preview.classList.add("is-visible");
  preview.querySelector("[data-speak-example]").addEventListener("click", () => speak(module.example.replaceAll("_", " "), type === "phonetics" ? 0.68 : 0.82));
  preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function syncPracticeTrack() {
  document.querySelectorAll("[data-practice-dot]").forEach((dot) => {
    const index = Number(dot.dataset.practiceDot);
    dot.classList.toggle("is-done", index < lessonSession.step || lessonSession.practiceDone);
    dot.classList.toggle("is-current", index === lessonSession.step && !lessonSession.practiceDone);
  });
}

function renderPracticeStep() {
  const type = lessonSession.type;
  const pack = practicePack(type);
  const check = pack[lessonSession.step];
  document.querySelector("#practice-step-label").textContent = `练习 ${lessonSession.step + 1} / ${pack.length}`;
  syncPracticeTrack();
  document.querySelector("#practice-question").innerHTML = `
    <h3>${check.question}</h3>
    <div class="check-options">${check.options.map((option, index) => `<button type="button" data-lesson-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("")}</div>`;
  document.querySelectorAll("[data-lesson-answer]").forEach((button) => button.addEventListener("click", () => answerLesson(Number(button.dataset.lessonAnswer))));
}

function answerLesson(answer) {
  const type = lessonSession.type;
  const pack = practicePack(type);
  const check = pack[lessonSession.step];
  const buttons = [...document.querySelectorAll("[data-lesson-answer]")];
  if (buttons.some((button) => button.disabled)) return;
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === check.answer) button.classList.add("correct");
    if (index === answer && answer !== check.answer) button.classList.add("wrong");
  });
  const correct = answer === check.answer;
  if (!correct) {
    recordMistake({
      source: `${agePrograms[state.selectedAge].title} · ${moduleMeta(type).label}`,
      question: check.question,
      options: check.options,
      answer: check.answer,
      note: check.note,
    });
  }

  const isLast = lessonSession.step >= pack.length - 1;
  if (isLast) {
    lessonSession.practiceDone = true;
    syncPracticeTrack();
    document.querySelector("#check-feedback").innerHTML = `
      <div><strong>${correct ? "本课练习全部完成！" : "最后一题可再巩固，练习已完成。"}</strong><span>${check.note}</span></div>
      <button class="primary-button complete-lesson" type="button" data-complete-lesson>${state.completedLessons.has(`${state.selectedAge}:${type}`) ? "已完成 ✓" : "完成本课"}</button>`;
    document.querySelector("[data-complete-lesson]").addEventListener("click", (event) => completeLesson(event.currentTarget));
    return;
  }

  document.querySelector("#check-feedback").innerHTML = `
    <div><strong>${correct ? "回答正确！" : "继续加油！"}</strong><span>${check.note}</span></div>
    <button class="primary-button" type="button" data-next-practice>下一题 →</button>`;
  document.querySelector("[data-next-practice]").addEventListener("click", () => {
    lessonSession.step += 1;
    document.querySelector("#check-feedback").innerHTML = `继续完成剩余练习（还剩 ${pack.length - lessonSession.step} 题）。`;
    renderPracticeStep();
  });
}

function completeLesson(button) {
  const type = lessonSession.type;
  if (!lessonSession.practiceDone) {
    showToast("请先完成全部练习题");
    return;
  }
  const output = document.querySelector("#lesson-output");
  if (!output.value.trim()) {
    showToast("请先完成第 4 步主动输出任务");
    output.focus();
    return;
  }
  const lessonKey = `${state.selectedAge}:${type}`;
  state.completedLessons.add(lessonKey);
  setCsvSet(KEYS.completedLessons, state.completedLessons);
  button.textContent = "已完成 ✓";
  button.disabled = true;
  const moduleButton = document.querySelector(`[data-module="${type}"]`);
  moduleButton.closest(".learning-module").classList.add("is-complete");
  moduleButton.innerHTML = "复习短课 <span>✓</span>";
  const completedCount = agePrograms[state.selectedAge].modules.filter((module) => state.completedLessons.has(`${state.selectedAge}:${module.type}`)).length;
  document.querySelector("[data-completed-count]").textContent = `${completedCount}/3`;
  updateDashboard();
  recordWeekActivity(1);
  showToast("短课完成，学习进度已保存！");
}

export function initLessons() {
  document.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-level]").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    renderCourses(button.dataset.level);
  }));

  document.querySelectorAll("[data-age]").forEach((button) => button.addEventListener("click", () => {
    state.selectedAge = button.dataset.age;
    renderAgeProgram();
  }));
  document.querySelectorAll("[data-topic]").forEach((button) => button.addEventListener("click", () => {
    state.selectedTopic = button.dataset.topic;
    renderAgeProgram();
  }));
}
