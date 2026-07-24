import { unitQuestions, buildPracticeSession } from "../data/index.js";
import { state } from "./state.js";
import { recordMistake, renderReviewCenter } from "./mistakes.js";
import { recordWeekActivity, updateDashboard } from "./dashboard.js";
import { KEYS, getNumber, setNumber } from "./persist.js";
import { bindChoiceButtons, markChoiceResult, renderMultipleChoice, setBarProgress, showFeedbackNext } from "./quiz-runner.js";
import { escapeHtml } from "./utils.js";

const ANSWER_ATTR = "quiz-unit-answer";
const SESSION_SIZE = 10;

let sessionUnit = null;
let sessionKey = "";

function ensureUnitSession(force = false) {
  const key = `${state.learnerLevel}|${state.selectedAge}`;
  if (force || !sessionUnit?.length || sessionKey !== key) {
    if (sessionKey && sessionKey !== key) {
      state.unitIndex = 0;
      state.unitScore = 0;
      state.unitAnswered = false;
    }
    sessionKey = key;
    sessionUnit = buildPracticeSession(unitQuestions, state.learnerLevel, state.selectedAge, SESSION_SIZE);
  }
  return sessionUnit;
}

export function currentUnitSession() {
  return ensureUnitSession();
}

export function renderUnitTest() {
  const items = ensureUnitSession();
  const progress = document.querySelector("#unit-progress-bar");
  const position = document.querySelector("#unit-position");
  const content = document.querySelector("#unit-content");
  if (state.unitIndex >= items.length) {
    const mastery = state.unitScore >= Math.ceil(items.length * 0.85) ? "掌握良好" : state.unitScore >= Math.ceil(items.length * 0.6) ? "基本达标" : "建议复习";
    const best = Math.max(getNumber(KEYS.unitBest), state.unitScore);
    setNumber(KEYS.unitBest, best);
    recordWeekActivity(1);
    updateDashboard();
    progress.style.width = "100%";
    position.textContent = "单元测试完成";
    const levelHint = state.learnerLevel === "未测评" ? "按当前分龄" : `按 ${state.learnerLevel}`;
    content.innerHTML = `<div class="quiz-result"><div class="result-icon">${state.unitScore}/${items.length}</div><h2>${mastery}</h2><p>本次答对 ${state.unitScore} / ${items.length} 题（${levelHint}抽题）。答错内容已经加入错题本，并按照间隔复习计划安排。</p><div class="assessment-result-actions"><button class="secondary-button" type="button" data-restart-unit>重新测试</button><button class="primary-button" type="button" data-open-review>查看错题本</button></div></div>`;
    document.querySelector("[data-restart-unit]").addEventListener("click", () => {
      state.unitIndex = 0;
      state.unitScore = 0;
      state.unitAnswered = false;
      ensureUnitSession(true);
      renderUnitTest();
    });
    document.querySelector("[data-open-review]").addEventListener("click", () => document.querySelector('[data-practice-mode="review"]').click());
    return;
  }
  const item = items[state.unitIndex];
  setBarProgress(progress, state.unitIndex, items.length);
  position.textContent = `问题 ${state.unitIndex + 1} / ${items.length}`;
  state.unitAnswered = false;
  renderMultipleChoice({
    container: content,
    tag: `${item.type} · ${item.level}`,
    question: item.question,
    options: item.options,
    answerAttr: ANSWER_ATTR,
    feedbackId: "unit-feedback",
  });
  bindChoiceButtons(ANSWER_ATTR, answerUnitQuestion);
}

function answerUnitQuestion(answer) {
  if (state.unitAnswered) return;
  state.unitAnswered = true;
  const items = ensureUnitSession();
  const item = items[state.unitIndex];
  const correct = answer === item.answer;
  markChoiceResult(ANSWER_ATTR, item.answer, answer);
  if (correct) state.unitScore += 1;
  else recordMistake({ source: "综合单元测试", question: item.question, options: item.options, answer: item.answer, note: item.note });
  const message = correct
    ? escapeHtml(item.note)
    : `正确答案是“${escapeHtml(item.options[item.answer])}”。${escapeHtml(item.note)}`;
  showFeedbackNext(
    document.querySelector("#unit-feedback"),
    message,
    `${state.unitIndex === items.length - 1 ? "查看结果" : "下一题"} →`,
    () => {
      state.unitIndex += 1;
      renderUnitTest();
    },
  );
}

export function showPracticeMode(mode) {
  const tab = document.querySelector(`[data-practice-mode="${mode}"]`);
  if (!tab) return;
  document.querySelectorAll("[data-practice-mode]").forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-practice-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.practicePanel === mode);
  });
  refreshPracticePanel(mode);
}

export function initPracticeTabs() {
  document.querySelectorAll("[data-practice-mode]").forEach((button) => button.addEventListener("click", () => {
    showPracticeMode(button.dataset.practiceMode);
  }));
}

function refreshPracticePanel(mode) {
  if (mode === "daily") renderQuiz();
  if (mode === "unit") renderUnitTest();
  if (mode === "review") renderReviewCenter();
}
