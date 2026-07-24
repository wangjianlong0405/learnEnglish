import { renderWeek, updateDashboard } from "./dashboard.js";
import { syncRecommendedCourseLevel, renderAgeProgram } from "./lessons.js";
import { renderWord, ensureDueWordFocus } from "./word-review.js";
import { renderGrammarCatalog } from "./grammar-catalog.js";
import { renderPhoneticsChart } from "./phonetics-chart.js";
import { renderSkillPanels } from "./skills.js";
import { renderQuiz } from "./daily-quiz.js";
import { renderReviewBadge } from "./mistakes.js";
import { renderAssessment } from "./placement.js";
import { maybeWelcomeKidsHome, renderKidsHomeCoach } from "./kids-voice.js";

const bootstrapped = new Set();

const handlers = {
  home: () => {
    renderWeek();
    updateDashboard();
    renderKidsHomeCoach();
    maybeWelcomeKidsHome();
  },
  lessons: () => syncRecommendedCourseLevel(),
  learning: () => renderAgeProgram(),
  words: () => {
    ensureDueWordFocus();
    renderWord();
  },
  phonetics: () => renderPhoneticsChart(),
  grammar: () => renderGrammarCatalog(),
  skills: () => renderSkillPanels(),
  practice: () => {
    renderQuiz();
    renderReviewBadge();
  },
  assessment: () => renderAssessment(),
};

/** Home / phonetics always refresh; other views render once on first visit. */
export function bootstrapView(name) {
  if (name === "home" || name === "phonetics") {
    handlers[name]?.();
    bootstrapped.add(name);
    return;
  }
  if (bootstrapped.has(name)) return;
  handlers[name]?.();
  bootstrapped.add(name);
}
