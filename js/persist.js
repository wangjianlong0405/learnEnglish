/** Central registry for browser-local Lingua progress keys. */
export const BACKUP_VERSION = 1;

export const KEYS = {
  wordIndex: "linguaWord",
  learnedToday: "linguaLearned",
  age: "linguaAge",
  completedLessons: "linguaCompletedLessons",
  learningDays: "linguaLearningDays",
  level: "linguaLevel",
  quizBest: "linguaQuizBest",
  unitBest: "linguaUnitBest",
  mistakes: "linguaMistakes",
  wordSchedule: "linguaWordSchedule",
  weekLog: "linguaWeekLog",
  grammarDone: "linguaGrammarDone",
  lastBackupAt: "linguaLastBackupAt",
  kidsVoiceAuto: "linguaKidsVoiceAuto",
};

const PREFIX = "lingua";

export function getString(key, fallback = "") {
  const value = localStorage.getItem(key);
  return value ?? fallback;
}

export function setString(key, value) {
  localStorage.setItem(key, value);
}

export function getNumber(key, fallback = 0) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
}

export function setNumber(key, value) {
  localStorage.setItem(key, String(value));
}

export function getCsvSet(key) {
  return new Set(getString(key).split(",").filter(Boolean));
}

export function setCsvSet(key, set) {
  setString(key, [...set].join(","));
}

/** All lingua* entries for export/import. */
export function collectLinguaEntries() {
  const data = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(PREFIX)) data[key] = localStorage.getItem(key);
  }
  return data;
}

export function clearLinguaEntries() {
  const keys = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(PREFIX)) keys.push(key);
  }
  keys.forEach((key) => localStorage.removeItem(key));
}
