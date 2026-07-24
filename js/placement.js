import { placementQuestions, levelRecommendations, recommendPlacementLevel } from "../data/index.js";
import { state } from "./state.js";
import { showToast, speakSequence, stopSpeaking, bindSpeakable, voiceChip, looksChinese } from "./ui.js";
import { showView } from "./router.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { syncRecommendedCourseLevel, renderAgeProgram } from "./lessons.js";
import { renderSkillPanels } from "./skills.js";
import { renderWord } from "./word-review.js";
import { KEYS, getString, setString } from "./persist.js";
import { markChoiceResult, setBarProgress, showFeedbackNext } from "./quiz-runner.js";
import { escapeHtml } from "./utils.js";
import { queuePreschoolOpen, recommendedPreschoolUnitId } from "./preschool.js";

const ANSWER_ATTR = "quiz-placement-answer";

function zh(text) {
  return { text, lang: "zh-CN", rate: 0.95 };
}

function en(text, rate = 0.72) {
  return { text, lang: "en-US", rate };
}

function speakPart(text) {
  return looksChinese(text) ? zh(text) : en(text, 0.7);
}

function kidsVoiceAutoEnabled() {
  return getString(KEYS.kidsVoiceAuto, "1") !== "0";
}

function speakQuestion(item, index) {
  const parts = [
    zh(`第 ${index + 1} 题，共 ${placementQuestions.length} 题`),
    zh(item.type),
    speakPart(item.question),
  ];
  item.options.forEach((option, optionIndex) => {
    parts.push(zh(`选项 ${String.fromCharCode(65 + optionIndex)}`));
    parts.push(speakPart(option));
  });
  return speakSequence(parts);
}

function speakFeedback(correct, item) {
  if (correct) return speakSequence([zh("回答正确")]);
  return speakSequence([
    zh("再想一想。正确答案是"),
    speakPart(item.options[item.answer]),
  ]);
}

function speakResult(level, score, recommendation) {
  return speakSequence([
    zh("测试完成"),
    zh(`你的建议起点是 ${level}`),
    zh(`本次答对 ${score} 题，一共 ${placementQuestions.length} 题`),
    zh(recommendation.title),
    zh(recommendation.description),
  ]);
}

export function startAssessment() {
  if (state.selectedAge === "preschool") {
    queuePreschoolOpen(recommendedPreschoolUnitId());
    showView("learning");
    renderAgeProgram();
    showToast("4–6 岁幼儿课程无需水平测试，已打开今日推荐游戏");
    return;
  }
  stopSpeaking();
  state.placementIndex = 0;
  state.placementScore = 0;
  state.placementAnswered = false;
  showView("assessment");
  renderAssessment();
}

export function renderAssessment() {
  const progress = document.querySelector("#assessment-progress-bar");
  const position = document.querySelector("#assessment-position");
  const content = document.querySelector("#assessment-content");

  if (state.placementIndex >= placementQuestions.length) {
    const level = recommendPlacementLevel(state.placementScore, placementQuestions.length);
    const recommendation = levelRecommendations[level];
    state.learnerLevel = level;
    setString(KEYS.level, state.learnerLevel);
    progress.style.width = "100%";
    position.textContent = "测试完成";
    content.innerHTML = `<div class="assessment-result">
      <div class="assessment-result-icon">${level}</div>
      <div class="assessment-voice-bar">
        <button class="secondary-button" type="button" data-speak-assessment-result>🔊 听结果说明</button>
      </div>
      <h2 class="speakable">你的建议起点：${level}${voiceChip("听")}</h2>
      <p class="speakable">本次答对 ${state.placementScore} / ${placementQuestions.length} 题。这个结果用于安排当前网站的学习难度，你可以随时重新测试。${voiceChip("听")}</p>
      <div class="recommendation-card">
        <small>学习建议</small>
        <strong class="speakable">${escapeHtml(recommendation.title)}${voiceChip("听")}</strong>
        <span class="speakable">${escapeHtml(recommendation.description)}${voiceChip("听")}</span>
      </div>
      <div class="assessment-result-actions">
        <button class="secondary-button" type="button" data-restart-assessment>重新测试</button>
        <button class="primary-button" type="button" data-use-recommendation>进入推荐课程 →</button>
      </div>
    </div>`;
    document.querySelector("[data-restart-assessment]").addEventListener("click", startAssessment);
    document.querySelector("[data-use-recommendation]").addEventListener("click", () => {
      stopSpeaking();
      syncRecommendedCourseLevel();
      showView("lessons");
      showToast(`已为你筛选 ${state.learnerLevel} 等级课程`);
    });
    document.querySelector("[data-speak-assessment-result]")?.addEventListener("click", () => {
      speakResult(level, state.placementScore, recommendation);
    });
    bindSpeakable(content);
    speakResult(level, state.placementScore, recommendation);
    updateDashboard();
    recordWeekActivity(1);
    renderSkillPanels();
    renderWord();
    return;
  }

  const item = placementQuestions[state.placementIndex];
  setBarProgress(progress, state.placementIndex, placementQuestions.length);
  position.textContent = `问题 ${state.placementIndex + 1} / ${placementQuestions.length}`;
  state.placementAnswered = false;
  content.innerHTML = `
    <div class="assessment-voice-bar">
      <button class="secondary-button" type="button" data-speak-assessment-question>🔊 听题目和选项</button>
      <label class="kids-auto-toggle assessment-auto-toggle">
        <input type="checkbox" data-assessment-voice-auto ${kidsVoiceAutoEnabled() ? "checked" : ""} />
        自动朗读
      </label>
    </div>
    <span class="assessment-question-tag speakable">${escapeHtml(item.type)}${voiceChip("听")}</span>
    <div class="practice-question-head">
      <h2 class="assessment-title speakable">${escapeHtml(item.question)}${voiceChip("听题")}</h2>
    </div>
    <div class="quiz-options">${item.options.map((option, index) => `
      <button class="quiz-option" type="button" data-${ANSWER_ATTR}="${index}">
        <span>${String.fromCharCode(65 + index)}</span>
        <span class="option-text speakable">${escapeHtml(option)}${voiceChip("听")}</span>
      </button>`).join("")}</div>
    <div class="assessment-feedback" id="assessment-feedback"></div>`;

  content.querySelectorAll(`[data-${ANSWER_ATTR}]`).forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.closest(".voice-chip")) return;
      answerAssessment(Number(button.getAttribute(`data-${ANSWER_ATTR}`)));
    });
  });
  content.querySelector("[data-speak-assessment-question]")?.addEventListener("click", () => {
    speakQuestion(item, state.placementIndex);
  });
  content.querySelector("[data-assessment-voice-auto]")?.addEventListener("change", (event) => {
    setString(KEYS.kidsVoiceAuto, event.target.checked ? "1" : "0");
    showToast(event.target.checked ? "已开启：进入题目会自动朗读" : "已关闭自动朗读，可点喇叭收听");
  });
  bindSpeakable(content);
  if (kidsVoiceAutoEnabled()) speakQuestion(item, state.placementIndex);
}

function answerAssessment(answer) {
  if (state.placementAnswered) return;
  state.placementAnswered = true;
  stopSpeaking();
  const item = placementQuestions[state.placementIndex];
  const correct = answer === item.answer;
  markChoiceResult(ANSWER_ATTR, item.answer, answer);
  if (correct) state.placementScore += 1;
  const message = correct
    ? "回答正确"
    : `正确答案是：${escapeHtml(item.options[item.answer])}`;
  const feedback = document.querySelector("#assessment-feedback");
  showFeedbackNext(
    feedback,
    `<span class="speakable">${message}${voiceChip("听")}</span>`,
    `${state.placementIndex === placementQuestions.length - 1 ? "查看结果" : "下一题"} →`,
    () => {
      stopSpeaking();
      state.placementIndex += 1;
      renderAssessment();
    },
  );
  bindSpeakable(feedback);
  speakFeedback(correct, item);
}

export function initPlacement() {
  document.querySelectorAll("[data-start-assessment]:not(#personal-path-action)").forEach((button) => button.addEventListener("click", startAssessment));
  document.querySelector("#personal-path-action").addEventListener("click", () => {
    if (state.selectedAge === "preschool") {
      queuePreschoolOpen(recommendedPreschoolUnitId());
      showView("learning");
      renderAgeProgram();
      return;
    }
    else if (state.learnerLevel === "未测评") startAssessment();
    else {
      syncRecommendedCourseLevel();
      showView("lessons");
    }
  });
  document.querySelector("[data-close-assessment]").addEventListener("click", () => {
    stopSpeaking();
    showView("home");
  });
}
