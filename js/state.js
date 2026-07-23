import { agePrograms } from "../data/index.js";
import { loadJson, localDateKey } from "./utils.js";
import { KEYS, getCsvSet, getNumber, getString } from "./persist.js";

const storedMistakes = loadJson(KEYS.mistakes, []);
const storedWordSchedule = loadJson(KEYS.wordSchedule, {});
const storedWeekLog = loadJson(KEYS.weekLog, {});

export const state = {
  currentWord: getNumber(KEYS.wordIndex),
  learnedWords: getNumber(KEYS.learnedToday),
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  selectedAge: getString(KEYS.age, "kids"),
  selectedTopic: "all",
  completedLessons: getCsvSet(KEYS.completedLessons),
  learningDays: getCsvSet(KEYS.learningDays),
  mistakes: Array.isArray(storedMistakes)
    ? storedMistakes.filter((item) => item && typeof item.question === "string" && Array.isArray(item.options) && Number.isInteger(item.answer)).map((item, index) => ({
      ...item,
      id: typeof item.id === "string" ? item.id : `legacy-mistake-${index}`,
      source: typeof item.source === "string" ? item.source : "历史练习",
      note: typeof item.note === "string" ? item.note : "请重新查看正确答案并完成复习。",
      attempts: Number.isFinite(item.attempts) ? item.attempts : 1,
      stage: Number.isFinite(item.stage) ? item.stage : 0,
      nextReview: Number.isFinite(item.nextReview) ? item.nextReview : Date.now(),
    }))
    : [],
  wordSchedule: storedWordSchedule && typeof storedWordSchedule === "object" && !Array.isArray(storedWordSchedule)
    ? Object.fromEntries(Object.entries(storedWordSchedule).filter(([, item]) => item && typeof item === "object" && Number.isFinite(item.nextReview)))
    : {},
  learnerLevel: getString(KEYS.level, "未测评"),
  quizBest: getNumber(KEYS.quizBest),
  placementIndex: 0,
  placementScore: 0,
  placementAnswered: false,
  unitIndex: 0,
  unitScore: 0,
  unitAnswered: false,
  mediaRecorder: undefined,
  recordingStream: undefined,
  recordedChunks: [],
  recordingUrl: undefined,
  weekLog: storedWeekLog && typeof storedWeekLog === "object" && !Array.isArray(storedWeekLog)
    ? Object.fromEntries(Object.entries(storedWeekLog).filter(([, value]) => Number.isFinite(value) && value > 0))
    : {},
};

if (!agePrograms[state.selectedAge]) state.selectedAge = "kids";

state.learnedWords = Object.values(state.wordSchedule).filter((item) => item.lastReviewed === localDateKey(new Date()) && item.lastSuccess).length;
