import { renderWeek, updateDashboard } from "./dashboard.js";
import { syncRecommendedCourseLevel, renderAgeProgram } from "./lessons.js";
import { renderWord, ensureDueWordFocus } from "./word-review.js";
import { renderGrammarCatalog } from "./grammar-catalog.js";
import { renderSkillPanels } from "./skills.js";
import { renderQuiz } from "./daily-quiz.js";
import { renderReviewBadge } from "./mistakes.js";
import { renderAssessment } from "./placement.js";

const bootstrapped = new Set();

const handlers = {
  home: () => {
    renderWeek();
    updateDashboard();
  },
  lessons: () => syncRecommendedCourseLevel(),
  learning: () => renderAgeProgram(),
  words: () => {
    ensureDueWordFocus();
    renderWord();
  },
  grammar: () => renderGrammarCatalog(),
  skills: () => renderSkillPanels(),
  practice: () => {
    renderQuiz();
    renderReviewBadge();
  },
  assessment: () => renderAssessment(),
};

/** First visit to a main view: render its heavy UI once. */
export function bootstrapView(name) {
  if (bootstrapped.has(name)) return;
  bootstrapped.add(name);
  handlers[name]?.();
}
