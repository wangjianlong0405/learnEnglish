import { quiz } from "../data/index.js";
import { state } from "./state.js";
import { recordMistake } from "./mistakes.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { KEYS, setNumber } from "./persist.js";
import { bindChoiceButtons, markChoiceResult, renderMultipleChoice, showFeedbackNext } from "./quiz-runner.js";
import { escapeHtml } from "./utils.js";

const ANSWER_ATTR = "quiz-daily-answer";

export function renderQuiz() {
  const progress = document.querySelector("#quiz-progress-bar");
  const content = document.querySelector("#quiz-content");
  document.querySelector("#quiz-position").textContent = state.quizIndex < quiz.length ? `问题 ${state.quizIndex + 1} / ${quiz.length}` : "练习完成";
  progress.style.width = `${Math.min((state.quizIndex + 1) / quiz.length * 100, 100)}%`;

  if (state.quizIndex >= quiz.length) {
    state.quizBest = Math.max(state.quizBest, state.quizScore);
    setNumber(KEYS.quizBest, state.quizBest);
    recordWeekActivity(1);
    updateDashboard();
    content.innerHTML = `<div class="quiz-result">
      <div class="result-icon">${state.quizScore >= 3 ? "★" : "✓"}</div>
      <h2>${state.quizScore >= 3 ? "太棒了！" : "完成练习！"}</h2>
      <p>你答对了 ${state.quizScore} / ${quiz.length} 题，获得 ${state.quizScore * 10} XP。</p>
      <button class="primary-button" id="restart-quiz" type="button">再练一次</button>
    </div>`;
    document.querySelector("#restart-quiz").addEventListener("click", () => {
      state.quizIndex = 0;
      state.quizScore = 0;
      state.quizAnswered = false;
      renderQuiz();
    });
    return;
  }

  const item = quiz[state.quizIndex];
  state.quizAnswered = false;
  renderMultipleChoice({
    container: content,
    tag: item.type,
    question: item.question,
    options: item.options,
    answerAttr: ANSWER_ATTR,
    feedbackId: "quiz-feedback",
  });
  bindChoiceButtons(ANSWER_ATTR, answerQuiz);
}

function answerQuiz(answer) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  const item = quiz[state.quizIndex];
  markChoiceResult(ANSWER_ATTR, item.answer, answer);
  if (answer === item.answer) state.quizScore += 1;
  else recordMistake({ source: "每日小测", question: item.question, options: item.options, answer: item.answer, note: item.success });
  const message = answer === item.answer
    ? escapeHtml(item.success)
    : `再想想：正确答案是 “${escapeHtml(item.options[item.answer])}”`;
  const feedback = document.querySelector("#quiz-feedback");
  showFeedbackNext(
    feedback,
    message,
    `${state.quizIndex === quiz.length - 1 ? "查看结果" : "下一题"} →`,
    () => {
      state.quizIndex += 1;
      renderQuiz();
    },
  );
}
