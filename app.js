import { speak, showToast } from "./js/ui.js";
import { initRouter, showView } from "./js/router.js";
import { updateDashboard } from "./js/dashboard.js";
import { initLessons, renderAgeProgram } from "./js/lessons.js";
import { initWordReview } from "./js/word-review.js";
import { initPracticeTabs } from "./js/unit-test.js";
import { initSkills } from "./js/skills.js";
import { initPlacement } from "./js/placement.js";
import { state } from "./js/state.js";
import { initGrammar } from "./js/grammar-catalog.js";
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
initBackup();
initTablists();
registerServiceWorker();

document.querySelector("#speak-phrase").addEventListener("click", () => speak("Small steps every day lead to big changes."));
document.querySelectorAll("[data-start-lesson]").forEach((button) => button.addEventListener("click", () => {
  showView("lessons");
  showToast("已为你定位到今天的课程");
}));
document.querySelectorAll("[data-go-words]").forEach((button) => button.addEventListener("click", () => showView("words")));
document.querySelectorAll("[data-go-practice]").forEach((button) => button.addEventListener("click", () => showView("practice")));
document.querySelectorAll("[data-open-age]").forEach((button) => button.addEventListener("click", () => {
  state.selectedAge = button.dataset.openAge;
  state.selectedTopic = "all";
  renderAgeProgram();
  updateDashboard();
  showView("learning");
}));

document.querySelectorAll(".view h1").forEach((heading) => { heading.tabIndex = -1; });

renderReviewBadge();

const views = [...document.querySelectorAll("[data-page]")];
const initialView = views.some((view) => view.dataset.page === location.hash.slice(1)) ? location.hash.slice(1) : "home";
showView(initialView, { updateHistory: false });
