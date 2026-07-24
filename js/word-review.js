import { activeWordDeck } from "../data/index.js";
import { state } from "./state.js";
import { saveJson, localDateKey } from "./utils.js";
import { KEYS, setNumber } from "./persist.js";
import { showToast, speak, speakSequence } from "./ui.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { applySrsResult, isDue, formatReviewTime } from "./srs.js";

function deck() {
  return activeWordDeck(state.learnerLevel, state.selectedAge);
}

function deckLabel() {
  if (state.learnerLevel in { "Pre-A1": 1, A1: 1, A2: 1, B1: 1, B2: 1 }) {
    return `当前词库：≤ ${state.learnerLevel}（${deck().length} 词）`;
  }
  const ageNames = { preschool: "幼儿启蒙", kids: "少儿启蒙", teens: "青少年", exam: "考试进阶", adults: "成人实用" };
  return `当前词库：${ageNames[state.selectedAge] || "分龄"}（${deck().length} 词）`;
}

export function renderWord() {
  const list = deck();
  if (!list.length) return;
  if (state.currentWord >= list.length) state.currentWord = 0;
  const entry = list[state.currentWord % list.length];
  const flashcard = document.querySelector("#flashcard");
  flashcard.classList.remove("is-flipped");
  flashcard.setAttribute("aria-pressed", "false");
  flashcard.querySelector(".card-front").setAttribute("aria-hidden", "false");
  flashcard.querySelector(".card-back").setAttribute("aria-hidden", "true");
  document.querySelector("#word-position").textContent = `${state.currentWord % list.length + 1} / ${list.length}`;
  document.querySelector("#word-text").textContent = entry.word;
  document.querySelector("#word-phonetic").textContent = entry.phonetic;
  document.querySelector("#word-meta").textContent = `${entry.level} · ${entry.theme}`;
  document.querySelector("#word-deck-label").textContent = deckLabel();
  document.querySelector("#word-meaning").textContent = entry.meaning;
  document.querySelector("#word-example").textContent = entry.example;
  document.querySelector("#word-translation").textContent = entry.translation;
  document.querySelector("#words-learned").textContent = state.learnedWords;
  setNumber(KEYS.wordIndex, state.currentWord);
  updateWordReviewSummary();
}

function updateWordReviewSummary() {
  const list = deck();
  const schedules = Object.values(state.wordSchedule);
  const due = list.filter((word) => isDue(state.wordSchedule[word.word])).length;
  const retained = list.filter((word) => (state.wordSchedule[word.word]?.stage || 0) >= 3).length;
  const nextTimes = schedules.map((item) => item.nextReview).filter((time) => time > Date.now()).sort((a, b) => a - b);
  document.querySelector("#words-due").textContent = due;
  document.querySelector("#word-retention").textContent = `${Math.round((retained / Math.max(list.length, 1)) * 100)}%`;
  document.querySelector("#next-word-review").textContent = due
    ? "还有到期单词，建议现在完成一轮复习。"
    : nextTimes.length
      ? `下一次复习：${formatReviewTime(nextTimes[0])}`
      : "根据你的回答自动安排下一次复习。";
}

function scheduleCurrentWord(success) {
  const list = deck();
  const entry = list[state.currentWord % list.length];
  const current = state.wordSchedule[entry.word] || { stage: 0 };
  const result = applySrsResult(current, success);
  current.lastReviewed = localDateKey(new Date());
  current.lastSuccess = success;
  state.wordSchedule[entry.word] = current;
  saveJson("linguaWordSchedule", state.wordSchedule);
  return result;
}

function firstDueWordIndex() {
  const list = deck();
  for (let index = 0; index < list.length; index += 1) {
    if (isDue(state.wordSchedule[list[index].word])) return index;
  }
  return null;
}

/** On vocabulary view, show a due card when any exist. */
export function ensureDueWordFocus() {
  const list = deck();
  const dueIndex = firstDueWordIndex();
  if (dueIndex === null) return;
  const current = list[state.currentWord % list.length];
  if (isDue(state.wordSchedule[current.word])) return;
  state.currentWord = dueIndex;
  renderWord();
}

function nextDueWordIndex() {
  const list = deck();
  for (let offset = 1; offset <= list.length; offset += 1) {
    const index = (state.currentWord + offset) % list.length;
    if (isDue(state.wordSchedule[list[index].word])) return index;
  }
  return (state.currentWord + 1) % list.length;
}

export function initWordReview() {
  document.querySelector("#flashcard").addEventListener("click", (event) => {
    const flipped = event.currentTarget.classList.toggle("is-flipped");
    event.currentTarget.setAttribute("aria-pressed", String(flipped));
    event.currentTarget.querySelector(".card-front").setAttribute("aria-hidden", String(flipped));
    event.currentTarget.querySelector(".card-back").setAttribute("aria-hidden", String(!flipped));
  });
  document.querySelector("#speak-word").addEventListener("click", (event) => {
    event.stopPropagation();
    const list = deck();
    speak(list[state.currentWord % list.length].word, { rate: 0.62, lang: "en-US" });
  });
  document.querySelector("#speak-meaning").addEventListener("click", (event) => {
    event.stopPropagation();
    const list = deck();
    const entry = list[state.currentWord % list.length];
    speakSequence([
      { text: entry.meaning, lang: "zh-CN", rate: 0.95 },
      { text: entry.translation, lang: "zh-CN", rate: 0.95 },
    ]);
  });
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
