import { escapeHtml } from "./utils.js";

/**
 * Render a multiple-choice question shell into `container`.
 * @param {string} answerAttr - e.g. "quiz-answer" → data-quiz-answer
 */
export function renderMultipleChoice({
  container,
  tag,
  question,
  options,
  answerAttr = "quiz-answer",
  tagClass = "quiz-question-tag",
  titleClass = "quiz-title",
  feedbackId = "quiz-feedback",
  feedbackClass = "quiz-feedback",
}) {
  container.innerHTML = `<span class="${tagClass}">${escapeHtml(tag)}</span>
    <h2 class="${titleClass}">${escapeHtml(question)}</h2>
    <div class="quiz-options">${options.map((option, index) => `<button class="quiz-option" type="button" data-${answerAttr}="${index}"><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}</button>`).join("")}</div>
    <div class="${feedbackClass}" id="${feedbackId}"></div>`;
}

export function bindChoiceButtons(answerAttr, handler) {
  document.querySelectorAll(`[data-${answerAttr}]`).forEach((button) => {
    button.addEventListener("click", () => handler(Number(button.getAttribute(`data-${answerAttr}`))));
  });
}

export function markChoiceResult(answerAttr, correctIndex, chosenIndex) {
  document.querySelectorAll(`[data-${answerAttr}]`).forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("correct");
    if (index === chosenIndex && chosenIndex !== correctIndex) button.classList.add("wrong");
  });
}

export function showFeedbackNext(feedbackEl, messageHtml, nextLabel, onNext) {
  feedbackEl.innerHTML = `<span>${messageHtml}</span><button class="primary-button" type="button" data-quiz-next>${escapeHtml(nextLabel)}</button>`;
  feedbackEl.querySelector("[data-quiz-next]").addEventListener("click", onNext);
}

export function setBarProgress(barEl, index, total) {
  if (barEl) barEl.style.width = `${((index + 1) / total) * 100}%`;
}
