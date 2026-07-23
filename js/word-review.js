import { words } from "../data/index.js";
import { state } from "./state.js";
import { saveJson, localDateKey } from "./utils.js";
import { KEYS, setNumber } from "./persist.js";
import { showToast, speak } from "./ui.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { applySrsResult, isDue, formatReviewTime } from "./srs.js";

export function renderWord() {
  const entry = words[state.currentWord % words.length];
  const flashcard = document.querySelector("#flashcard");
  flashcard.classList.remove("is-flipped");
  flashcard.setAttribute("aria-pressed", "false");
  flashcard.querySelector(".card-front").setAttribute("aria-hidden", "false");
  flashcard.querySelector(".card-back").setAttribute("aria-hidden", "true");
  document.querySelector("#word-position").textContent = `${state.currentWord % words.length + 1} / ${words.length}`;
  document.querySelector("#word-text").textContent = entry.word;
  document.querySelector("#word-phonetic").textContent = entry.phonetic;
  document.querySelector("#word-meaning").textContent = entry.meaning;
  document.querySelector("#word-example").textContent = entry.example;
  document.querySelector("#word-translation").textContent = entry.translation;
  document.querySelector("#words-learned").textContent = state.learnedWords;
  setNumber(KEYS.wordIndex, state.currentWord);
  updateWordReviewSummary();
}

function updateWordReviewSummary() {
  const schedules = Object.values(state.wordSchedule);
  const due = words.filter((word) => isDue(state.wordSchedule[word.word])).length;
  const retained = schedules.filter((item) => item.stage >= 3).length;
  const nextTimes = schedules.map((item) => item.nextReview).filter((time) => time > Date.now()).sort((a, b) => a - b);
  document.querySelector("#words-due").textContent = due;
  document.querySelector("#word-retention").textContent = `${Math.round(retained / words.length * 100)}%`;
  document.querySelector("#next-word-review").textContent = due
    ? "还有到期单词，建议现在完成一轮复习。"
    : nextTimes.length
      ? `下一次复习：${formatReviewTime(nextTimes[0])}`
      : "根据你的回答自动安排下一次复习。";
}

function scheduleCurrentWord(success) {
  const entry = words[state.currentWord % words.length];
  const current = state.wordSchedule[entry.word] || { stage: 0 };
  const result = applySrsResult(current, success);
  current.lastReviewed = localDateKey(new Date());
  current.lastSuccess = success;
  state.wordSchedule[entry.word] = current;
  saveJson("linguaWordSchedule", state.wordSchedule);
  return result;
}

function firstDueWordIndex() {
  for (let index = 0; index < words.length; index += 1) {
    if (isDue(state.wordSchedule[words[index].word])) return index;
  }
  return null;
}

/** On vocabulary view, show a due card when any exist. */
export function ensureDueWordFocus() {
  const dueIndex = firstDueWordIndex();
  if (dueIndex === null) return;
  const current = words[state.currentWord % words.length];
  if (isDue(state.wordSchedule[current.word])) return;
  state.currentWord = dueIndex;
  renderWord();
}

function nextDueWordIndex() {
  for (let offset = 1; offset <= words.length; offset += 1) {
    const index = (state.currentWord + offset) % words.length;
    if (isDue(state.wordSchedule[words[index].word])) return index;
  }
  return (state.currentWord + 1) % words.length;
}

export function initWordReview() {
  document.querySelector("#flashcard").addEventListener("click", (event) => {
    const flipped = event.currentTarget.classList.toggle("is-flipped");
    event.currentTarget.setAttribute("aria-pressed", String(flipped));
    event.currentTarget.querySelector(".card-front").setAttribute("aria-hidden", String(flipped));
    event.currentTarget.querySelector(".card-back").setAttribute("aria-hidden", String(!flipped));
  });
  document.querySelector("#speak-word").addEventListener("click", () => speak(words[state.currentWord % words.length].word, 0.72));
  document.querySelector("#review-word").addEventListener("click", () => {
    scheduleCurrentWord(false);
    state.currentWord = nextDueWordIndex();
    renderWord();
    showToast("已安排 5 分钟后再次复习");
  });
  document.querySelector("#know-word").addEventListener("click", () => {
    const { intervalDays } = scheduleCurrentWord(true);
    state.learnedWords = Object.values(state.wordSchedule).filter((item) => item.lastReviewed === localDateKey(new Date()) && item.lastSuccess).length;
    state.currentWord = nextDueWordIndex();
    setNumber(KEYS.learnedToday, state.learnedWords);
    renderWord();
    updateDashboard();
    recordWeekActivity(1);
    showToast(`做得好，${intervalDays} 天后再复习这个单词`);
  });
}
