import { speak, showToast } from "./js/ui.js";
import { initRouter, showView } from "./js/router.js";
import { updateDashboard } from "./js/dashboard.js";
import { initLessons, renderAgeProgram } from "./js/lessons.js";
import { initWordReview } from "./js/word-review.js";
import { initPracticeTabs, showPracticeMode } from "./js/unit-test.js";
import { initSkills } from "./js/skills.js";
import { initPlacement, startAssessment } from "./js/placement.js";
import { state } from "./js/state.js";
import { initGrammar } from "./js/grammar-catalog.js";
import { initPhoneticsChart } from "./js/phonetics-chart.js";
import { initKidsVoice, speakAgeChoice, syncKidsModeUi } from "./js/kids-voice.js";
import { registerServiceWorker } from "./js/pwa.js";
import { initBackup } from "./js/backup.js";
import { renderReviewBadge } from "./js/mistakes.js";
import { initTablists } from "./js/tabs.js";

initRouter();
initLessons();
initWordReview();
initPracticeTabs();
initSkills();
initPlacement();
initGrammar();
initPhoneticsChart();
initKidsVoice();
initBackup();
initTablists();
registerServiceWorker();

function runTodayFocus(kind = "lesson") {
  if (kind === "assessment") {
    startAssessment();
    return;
  }
  if (kind === "review") {
    showView("practice");
    showPracticeMode("review");
    showToast("已定位到到期错题");
    return;
  }
  if (kind === "words") {
    showView("words");
    showToast("已定位到词汇复习");
    return;
  }
  showView("lessons");
  showToast("已为你定位到今天的课程");
}

document.querySelector("#speak-phrase").addEventListener("click", () => speak("Small steps every day lead to big changes.", { lang: "en-US", rate: 0.72 }));
document.querySelectorAll("[data-today-focus]").forEach((button) => button.addEventListener("click", () => {
  runTodayFocus(button.dataset.focusKind || "lesson");
}));
document.querySelectorAll("[data-start-lesson]").forEach((button) => button.addEventListener("click", () => {
  showView("lessons");
  showToast("已为你定位到今天的课程");
}));
document.querySelectorAll("[data-go-words]").forEach((button) => button.addEventListener("click", () => showView("words")));
document.body.addEventListener("click", (event) => {
  const review = event.target.closest("[data-go-review]");
  if (review) {
    showView("practice");
    showPracticeMode("review");
    return;
  }
  const practice = event.target.closest("[data-go-practice]");
  if (practice) showView("practice");
});
document.querySelectorAll("[data-open-age]").forEach((button) => button.addEventListener("click", async (event) => {
  if (event.target.closest("[data-kids-listen-age]")) return;
  state.selectedAge = button.dataset.openAge;
  state.selectedTopic = "all";
  syncKidsModeUi();
  if (state.selectedAge === "kids") await speakAgeChoice("kids");
  renderAgeProgram();
  updateDashboard();
  showView("learning");
}));

document.querySelectorAll(".view h1").forEach((heading) => { heading.tabIndex = -1; });

renderReviewBadge();

const views = [...document.querySelectorAll("[data-page]")];
const initialView = views.some((view) => view.dataset.page === location.hash.slice(1)) ? location.hash.slice(1) : "home";
showView(initialView, { updateHistory: false });
