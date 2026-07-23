export const placementQuestions = [
  { type: "基础词汇", question: "hungry 的中文意思是：", options: ["口渴的", "饥饿的", "疲惫的", "开心的"], answer: 1 },
  { type: "日常表达", question: "别人说 “Nice to meet you.”，最自然的回应是：", options: ["Nice to meet you, too.", "I am fine, thank you.", "You are welcome.", "See you yesterday."], answer: 0 },
  { type: "一般现在时", question: "She ___ to school every day.", options: ["go", "goes", "going", "went"], answer: 1 },
  { type: "现在进行时", question: "Look! The children ___ in the garden.", options: ["play", "played", "are playing", "have played"], answer: 2 },
  { type: "介词使用", question: "I have lived here ___ 2020.", options: ["for", "since", "from", "during"], answer: 1 },
  { type: "情态动词", question: "You ___ bring an umbrella; it might rain.", options: ["must to", "should", "should to", "are should"], answer: 1 },
  { type: "比较级", question: "This lesson is ___ than the last one.", options: ["more easy", "easier", "easyer", "most easy"], answer: 1 },
  { type: "条件句", question: "If I had more time, I ___ another language.", options: ["learn", "learned", "would learn", "will learn"], answer: 2 },
  { type: "定语从句", question: "This is the book ___ changed my mind.", options: ["who", "where", "that", "whose"], answer: 2 },
  { type: "被动语态", question: "The report ___ yesterday.", options: ["finished", "was finished", "has finish", "is finish"], answer: 1 },
  { type: "非谓语动词", question: "Despite ___ tired, she finished the report.", options: ["be", "being", "was", "to be"], answer: 1 },
  { type: "语篇理解", question: "“The proposal was met with reservations.” 最接近：", options: ["提案被立即接受", "人们对提案有所保留", "提案没有被讨论", "提案已经被撤回"], answer: 1 },
];

/** Map placement score to a CEFR-like starting level. */
export function recommendPlacementLevel(score, total = placementQuestions.length) {
  const ratio = total ? score / total : 0;
  if (ratio <= 0.2) return "Pre-A1";
  if (ratio <= 0.4) return "A1";
  if (ratio <= 0.6) return "A2";
  if (ratio <= 0.8) return "B1";
  return "B2";
}
