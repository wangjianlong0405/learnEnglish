/** Local, offline heuristics for writing / speaking self-check (no server). */

export function analyzeWritingDraft(text, writing = {}) {
  const tips = [];
  const raw = String(text || "").trim();
  const words = raw ? raw.split(/\s+/).filter(Boolean) : [];
  const minWords = Number(writing.minWords) || 40;

  if (!raw) {
    tips.push("先写几句完整英文，再点自评。");
    return tips;
  }
  if (words.length < minWords) {
    tips.push(`当前约 ${words.length} 词，建议至少写到 ${minWords} 词。`);
  } else {
    tips.push(`字数达标（约 ${words.length} 词）。`);
  }
  if (/[\u4e00-\u9fff]/.test(raw)) {
    tips.push("草稿里还有中文，尽量改成英文表达。");
  }
  if (!/[.!?…]/.test(raw)) {
    tips.push("试试用句号、问号或感叹号结束完整句子。");
  }
  if (/^[a-z]/.test(raw)) {
    tips.push("句首字母建议大写。");
  }
  const sentenceCount = (raw.match(/[.!?…]+/g) || []).length;
  if (words.length >= 50 && sentenceCount < 2) {
    tips.push("可以把内容拆成 2–3 个短句，读起来更清楚。");
  }
  if (minWords >= 80) {
    const hasLinker = /\b(however|therefore|because|although|in addition|for example)\b/i.test(raw);
    if (!hasLinker) {
      tips.push("进阶写作可加入 however / therefore / because 等连接词。");
    }
  }
  if (/\bi\b/.test(raw)) {
    tips.push("注意人称代词 I 要大写。");
  }
  return tips;
}

export function speakingSelfCheckTips(prompt = "") {
  const tips = [
    "回放录音：句子是否完整？有没有只说单词？",
    "关键词有没有说清楚？不确定的词可再录一遍。",
    "语速可以慢一点，重点词稍加重音。",
  ];
  const text = String(prompt);
  if (/理由|反对|观点|agree|opinion/i.test(text)) {
    tips.push("观点题：先说立场，再给两个理由，最后可加一句让步。");
  }
  if (/周末|家人|爱好|weekend|family|hobby/i.test(text)) {
    tips.push("介绍题：覆盖问到的每一项，并用 and / because 连接。");
  }
  if (/麻烦|迟到|迷路|delay|late/i.test(text)) {
    tips.push("叙事题：按「发生了什么 → 原因 → 结果」说 3–4 句。");
  }
  if (/比较|方案|recommend|compare/i.test(text)) {
    tips.push("比较题：各说一个优点，再明确你的选择。");
  }
  return tips;
}
