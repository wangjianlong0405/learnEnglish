import { placementQuestions, levelRecommendations, recommendPlacementLevel } from "../data/index.js";
import { state } from "./state.js";
import { showToast } from "./ui.js";
import { showView } from "./router.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { syncRecommendedCourseLevel, renderAgeProgram } from "./lessons.js";
import { renderSkillPanels } from "./skills.js";
import { renderWord } from "./word-review.js";
import { KEYS, setString } from "./persist.js";
import { bindChoiceButtons, markChoiceResult, renderMultipleChoice, setBarProgress, showFeedbackNext } from "./quiz-runner.js";
import { escapeHtml } from "./utils.js";
import { queuePreschoolOpen, recommendedPreschoolUnitId } from "./preschool.js";

const ANSWER_ATTR = "quiz-placement-answer";

export function startAssessment() {
  if (state.selectedAge === "preschool") {
    queuePreschoolOpen(recommendedPreschoolUnitId());
    showView("learning");
    renderAgeProgram();
    showToast("4–6 岁幼儿课程无需水平测试，已打开今日推荐游戏");
    return;
  }
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
      <h2>你的建议起点：${level}</h2>
      <p>本次答对 ${state.placementScore} / ${placementQuestions.length} 题。这个结果用于安排当前网站的学习难度，你可以随时重新测试。</p>
      <div class="recommendation-card"><small>学习建议</small><strong>${escapeHtml(recommendation.title)}</strong><span>${escapeHtml(recommendation.description)}</span></div>
      <div class="assessment-result-actions">
        <button class="secondary-button" type="button" data-restart-assessment>重新测试</button>
        <button class="primary-button" type="button" data-use-recommendation>进入推荐课程 →</button>
      </div>
    </div>`;
    document.querySelector("[data-restart-assessment]").addEventListener("click", startAssessment);
    document.querySelector("[data-use-recommendation]").addEventListener("click", () => {
      syncRecommendedCourseLevel();
      showView("lessons");
      showToast(`已为你筛选 ${state.learnerLevel} 等级课程`);
    });
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
  renderMultipleChoice({
    container: content,
    tag: item.type,
    question: item.question,
    options: item.options,
    answerAttr: ANSWER_ATTR,
    tagClass: "assessment-question-tag",
    titleClass: "assessment-title",
    feedbackId: "assessment-feedback",
    feedbackClass: "assessment-feedback",
  });
  bindChoiceButtons(ANSWER_ATTR, answerAssessment);
}

function answerAssessment(answer) {
  if (state.placementAnswered) return;
  state.placementAnswered = true;
  const item = placementQuestions[state.placementIndex];
  markChoiceResult(ANSWER_ATTR, item.answer, answer);
  if (answer === item.answer) state.placementScore += 1;
  const message = answer === item.answer
    ? "回答正确"
    : `正确答案是：${escapeHtml(item.options[item.answer])}`;
  showFeedbackNext(
    document.querySelector("#assessment-feedback"),
    message,
    `${state.placementIndex === placementQuestions.length - 1 ? "查看结果" : "下一题"} →`,
    () => {
      state.placementIndex += 1;
      renderAssessment();
    },
  );
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
  document.querySelector("[data-close-assessment]").addEventListener("click", () => showView("home"));
}
