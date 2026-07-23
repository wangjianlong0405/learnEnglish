import { grammarCategories, grammarTopics } from "../data/index.js";
import { state } from "./state.js";
import { showToast } from "./ui.js";
import { recordMistake } from "./mistakes.js";
import { recordWeekActivity, updateDashboard } from "./dashboard.js";
import { KEYS, getCsvSet, setCsvSet } from "./persist.js";

const session = {
  category: "all",
  topicId: null,
  step: 0,
  done: false,
};

function completedSet() {
  if (!(state.completedGrammar instanceof Set)) {
    state.completedGrammar = getCsvSet(KEYS.grammarDone);
  }
  return state.completedGrammar;
}

function visibleTopics() {
  return session.category === "all"
    ? grammarTopics
    : grammarTopics.filter((topic) => topic.category === session.category);
}

export function renderGrammarCatalog() {
  const topics = visibleTopics();
  const doneCount = grammarTopics.filter((topic) => completedSet().has(topic.id)).length;
  document.querySelector("#grammar-done-count").textContent = String(doneCount);
  document.querySelector("#grammar-total-count").textContent = String(grammarTopics.length);

  document.querySelectorAll("[data-grammar-category]").forEach((button) => {
    const active = button.dataset.grammarCategory === session.category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  document.querySelector("#grammar-topic-list").innerHTML = topics.map((topic) => {
    const done = completedSet().has(topic.id);
    const category = grammarCategories.find((item) => item.id === topic.category);
    return `
      <article class="grammar-card ${done ? "is-complete" : ""}">
        <div class="grammar-card-top">
          <span class="grammar-level">${topic.level}</span>
          <span class="grammar-category-tag">${category?.title || topic.category}</span>
        </div>
        <h3>${topic.title}</h3>
        <p>${topic.summary}</p>
        <code class="grammar-formula">${topic.formula}</code>
        <button type="button" data-grammar-topic="${topic.id}">${done ? "再练一次" : "开始练习"} <span>${done ? "✓" : "→"}</span></button>
      </article>`;
  }).join("");

  document.querySelectorAll("[data-grammar-topic]").forEach((button) => {
    button.addEventListener("click", () => openGrammarTopic(button.dataset.grammarTopic));
  });

  if (!session.topicId) {
    document.querySelector("#grammar-practice").classList.remove("is-visible");
    document.querySelector("#grammar-practice").innerHTML = "";
  }
}

function openGrammarTopic(topicId) {
  const topic = grammarTopics.find((item) => item.id === topicId);
  if (!topic) return;
  session.topicId = topicId;
  session.step = 0;
  session.done = false;
  renderGrammarPractice();
}

function renderGrammarPractice() {
  const topic = grammarTopics.find((item) => item.id === session.topicId);
  if (!topic) return;
  const panel = document.querySelector("#grammar-practice");
  const done = completedSet().has(topic.id);
  panel.innerHTML = `
    <header class="grammar-practice-header">
      <div>
        <span class="preview-label">${topic.level} · 语法专项</span>
        <h2>${topic.title}</h2>
      </div>
      <button class="secondary-button" type="button" data-close-grammar>返回目录</button>
    </header>
    <div class="grammar-teach">
      <p>${topic.summary}</p>
      <code class="grammar-formula">${topic.formula}</code>
      <div class="lesson-example">${topic.example}</div>
      <div class="lesson-points">${topic.tips.map((tip) => `<span>${tip}</span>`).join("")}</div>
    </div>
    <div class="grammar-check">
      <div class="practice-progress">
        <span class="preview-label">专项练习</span>
        <span id="grammar-step-label">练习 1 / ${topic.questions.length}</span>
      </div>
      <div class="practice-track" id="grammar-track">${topic.questions.map((_, index) => `<span data-grammar-dot="${index}"></span>`).join("")}</div>
      <div id="grammar-question"></div>
      <div class="check-feedback" id="grammar-feedback">${done ? "本专题已完成，可以再次巩固。" : "完成全部题目即可记录进度。"}</div>
    </div>`;
  panel.classList.add("is-visible");
  panel.querySelector("[data-close-grammar]").addEventListener("click", () => {
    session.topicId = null;
    panel.classList.remove("is-visible");
    panel.innerHTML = "";
    renderGrammarCatalog();
  });
  renderGrammarStep();
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function syncGrammarTrack(topic) {
  document.querySelectorAll("[data-grammar-dot]").forEach((dot) => {
    const index = Number(dot.dataset.grammarDot);
    dot.classList.toggle("is-done", index < session.step || session.done);
    dot.classList.toggle("is-current", index === session.step && !session.done);
  });
  document.querySelector("#grammar-step-label").textContent = `练习 ${Math.min(session.step + 1, topic.questions.length)} / ${topic.questions.length}`;
}

function renderGrammarStep() {
  const topic = grammarTopics.find((item) => item.id === session.topicId);
  const item = topic.questions[session.step];
  syncGrammarTrack(topic);
  document.querySelector("#grammar-question").innerHTML = `
    <h3>${item.question}</h3>
    <div class="check-options">${item.options.map((option, index) => `<button type="button" data-grammar-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("")}</div>`;
  document.querySelectorAll("[data-grammar-answer]").forEach((button) => {
    button.addEventListener("click", () => answerGrammar(Number(button.dataset.grammarAnswer)));
  });
}

function answerGrammar(answer) {
  const topic = grammarTopics.find((item) => item.id === session.topicId);
  const item = topic.questions[session.step];
  const buttons = [...document.querySelectorAll("[data-grammar-answer]")];
  if (buttons.some((button) => button.disabled)) return;
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === answer && answer !== item.answer) button.classList.add("wrong");
  });
  const correct = answer === item.answer;
  if (!correct) {
    recordMistake({
      source: `语法目录 · ${topic.title}`,
      question: item.question,
      options: item.options,
      answer: item.answer,
      note: item.note,
    });
  }

  const isLast = session.step >= topic.questions.length - 1;
  if (isLast) {
    session.done = true;
    syncGrammarTrack(topic);
    document.querySelector("#grammar-feedback").innerHTML = `
      <div><strong>${correct ? "专题练习完成！" : "最后一题可再巩固，练习已完成。"}</strong><span>${item.note}</span></div>
      <button class="primary-button" type="button" data-complete-grammar>${completedSet().has(topic.id) ? "已完成 ✓" : "完成本专题"}</button>`;
    document.querySelector("[data-complete-grammar]").addEventListener("click", completeGrammarTopic);
    return;
  }

  document.querySelector("#grammar-feedback").innerHTML = `
    <div><strong>${correct ? "回答正确！" : "继续加油！"}</strong><span>${item.note}</span></div>
    <button class="primary-button" type="button" data-next-grammar>下一题 →</button>`;
  document.querySelector("[data-next-grammar]").addEventListener("click", () => {
    session.step += 1;
    document.querySelector("#grammar-feedback").textContent = `继续完成剩余练习（还剩 ${topic.questions.length - session.step} 题）。`;
    renderGrammarStep();
  });
}

function completeGrammarTopic() {
  const topic = grammarTopics.find((item) => item.id === session.topicId);
  if (!session.done || !topic) {
    showToast("请先完成全部练习题");
    return;
  }
  completedSet().add(topic.id);
  setCsvSet(KEYS.grammarDone, completedSet());
  recordWeekActivity(1);
  updateDashboard();
  showToast(`「${topic.title}」已完成`);
  renderGrammarCatalog();
  const button = document.querySelector("[data-complete-grammar]");
  if (button) {
    button.textContent = "已完成 ✓";
    button.disabled = true;
  }
}

export function initGrammar() {
  if (!state.completedGrammar) completedSet();
  document.querySelectorAll("[data-grammar-category]").forEach((button) => {
    button.addEventListener("click", () => {
      session.category = button.dataset.grammarCategory;
      session.topicId = null;
      renderGrammarCatalog();
    });
  });
  renderGrammarCatalog();
}
