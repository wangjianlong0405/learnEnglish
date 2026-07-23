import { state } from "./state.js";
import { saveJson, escapeHtml } from "./utils.js";
import { applySrsResult, formatReviewDay } from "./srs.js";
import { KEYS } from "./persist.js";
import { recordWeekActivity, updateDashboard } from "./dashboard.js";

export function renderReviewBadge() {
  const badge = document.querySelector("#mistake-count-badge");
  if (badge) badge.textContent = state.mistakes.filter((item) => item.nextReview <= Date.now()).length;
}

export function renderReviewCenter() {
  const container = document.querySelector("#review-center");
  if (!container) return;
  const due = state.mistakes.filter((item) => item.nextReview <= Date.now());
  document.querySelector("#mistake-count-badge").textContent = due.length;
  if (!state.mistakes.length) {
    container.innerHTML = `<div class="empty-review"><span>✓</span><h2>错题本还是空的</h2><p>继续完成短课和测验，答错的知识点会自动出现在这里。</p></div>`;
    return;
  }
  const ordered = [...state.mistakes].sort((a, b) => a.nextReview - b.nextReview);
  container.innerHTML = `<div class="review-summary"><div><h2>间隔复习计划</h2><p>${due.length ? `今天有 ${due.length} 个知识点需要复习。` : "今天的复习已完成，可以提前巩固。"}</p></div><span class="review-count">${due.length}</span></div>
    <div class="mistake-list">${ordered.map((item) => `<article class="mistake-card"><div><small>${escapeHtml(item.source)}</small><strong>${escapeHtml(item.question)}</strong><span>${item.nextReview <= Date.now() ? "现在复习" : `计划于 ${formatReviewDay(item.nextReview)} 复习`}</span></div><button class="secondary-button" type="button" data-review-id="${item.id}">开始复习</button></article>`).join("")}</div>`;
  container.querySelectorAll("[data-review-id]").forEach((button) => button.addEventListener("click", () => renderReviewQuestion(button.dataset.reviewId)));
}

function renderReviewQuestion(id) {
  const item = state.mistakes.find((mistake) => mistake.id === id);
  if (!item) return;
  document.querySelector("#review-center").innerHTML = `<div class="quiz-question-tag">${escapeHtml(item.source)} · 间隔复习</div><h2 class="quiz-title">${escapeHtml(item.question)}</h2><div class="quiz-options">${item.options.map((option, index) => `<button class="quiz-option" type="button" data-review-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}</button>`).join("")}</div><div class="quiz-feedback" id="review-feedback"></div>`;
  document.querySelectorAll("[data-review-answer]").forEach((button) => button.addEventListener("click", () => answerReview(id, Number(button.dataset.reviewAnswer))));
}

function answerReview(id, answer) {
  const item = state.mistakes.find((mistake) => mistake.id === id);
  const correct = answer === item.answer;
  const buttons = [...document.querySelectorAll("[data-review-answer]")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === answer && !correct) button.classList.add("wrong");
  });
  applySrsResult(item, correct);
  if (!correct) item.attempts += 1;
  saveJson(KEYS.mistakes, state.mistakes);
  recordWeekActivity(1);
  updateDashboard();
  const feedback = correct
    ? `回答正确，下次将在 ${formatReviewDay(item.nextReview)} 复习。`
    : `正确答案是“${escapeHtml(item.options[item.answer])}”。${escapeHtml(item.note)} 已安排 5 分钟后再次复习。`;
  document.querySelector("#review-feedback").innerHTML = `<span>${feedback}</span><button class="primary-button" type="button" data-return-review>返回错题本</button>`;
  document.querySelector("[data-return-review]").addEventListener("click", renderReviewCenter);
  renderReviewBadge();
}

export function recordMistake({ source, question, options, answer, note }) {
  const existing = state.mistakes.find((item) => item.question === question);
  if (existing) {
    existing.attempts += 1;
    existing.nextReview = Date.now();
    existing.stage = 0;
  } else {
    state.mistakes.push({ id: `mistake-${Date.now()}-${state.mistakes.length}`, source, question, options, answer, note, attempts: 1, stage: 0, nextReview: Date.now() });
  }
  saveJson(KEYS.mistakes, state.mistakes);
  renderReviewCenter();
}
