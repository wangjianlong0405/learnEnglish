let toastTimer = 0;
let speakGeneration = 0;

const PREFERRED_EN = [
  /google us english/i,
  /microsoft (aria|jenny|guy)/i,
  /samantha/i,
  /aaron/i,
  /daniel/i,
  /enhanced/i,
  /premium/i,
];

const PREFERRED_ZH = [
  /google.*普通话|google.*chinese/i,
  /microsoft (xiaoxiao|yunyang|xiaoyi)/i,
  /tingting|ting-ting|婷婷/i,
  /meijia|美佳/i,
  /sinji|sin-ji/i,
];

function ensureVoices() {
  if (!("speechSynthesis" in window)) return [];
  return speechSynthesis.getVoices();
}

export function whenVoicesReady() {
  if (!("speechSynthesis" in window)) return Promise.resolve([]);
  const existing = ensureVoices();
  if (existing.length) return Promise.resolve(existing);
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      speechSynthesis.removeEventListener("voiceschanged", finish);
      resolve(ensureVoices());
    };
    speechSynthesis.addEventListener("voiceschanged", finish);
    window.setTimeout(finish, 700);
  });
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  ensureVoices();
  speechSynthesis.addEventListener?.("voiceschanged", ensureVoices);
}

export function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

/** True when text contains CJK characters (instructions kids cannot read). */
export function looksChinese(text) {
  return /[\u4e00-\u9fff]/.test(String(text || ""));
}

/** Strip IPA / slash notation that Chinese voices misread. */
export function sanitizeForChineseTts(text) {
  return String(text || "")
    .replace(/\/[^/\n]+?\//g, "这个音")
    .replace(/[æɑɒɔəɜɪʊʌθðʃʒŋɡɹɾɟːˈˌ͡.ˈˌ]/g, " ")
    .replace(/选项\s*([A-D])/gi, "选项$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeForEnglishTts(text) {
  return String(text || "")
    .replace(/[ˈˌ]/g, "")
    .replace(/\/([^/]+)\//g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreVoice(voice, lang) {
  const target = String(lang || "").toLowerCase().replace("_", "-");
  const voiceLang = String(voice.lang || "").toLowerCase().replace("_", "-");
  let score = 0;
  if (voiceLang === target) score += 60;
  else if (voiceLang.startsWith(target.slice(0, 2))) score += 25;
  const prefs = target.startsWith("zh") ? PREFERRED_ZH : PREFERRED_EN;
  prefs.forEach((pattern, index) => {
    if (pattern.test(voice.name || "")) score += Math.max(8, 36 - index * 3);
  });
  if (voice.localService) score += 4;
  return score;
}

function pickVoice(lang) {
  const voices = ensureVoices();
  if (!voices.length) return null;
  const target = String(lang || "en-US").toLowerCase().replace("_", "-");
  const prefix = target.slice(0, 2);
  const pool = voices.filter((voice) => String(voice.lang || "").toLowerCase().replace("_", "-").startsWith(prefix));
  const ranked = (pool.length ? pool : voices)
    .slice()
    .sort((left, right) => scoreVoice(right, target) - scoreVoice(left, target));
  return ranked[0] || null;
}

function normalizeSpeakOptions(rateOrOptions) {
  if (typeof rateOrOptions === "number") return { rate: rateOrOptions, cancel: true };
  return { rate: undefined, cancel: true, ...rateOrOptions };
}

function prepareText(text, lang) {
  if (String(lang || "").startsWith("zh")) return sanitizeForChineseTts(text);
  return sanitizeForEnglishTts(text);
}

function buildUtterance(text, options = {}) {
  const lang = options.lang || (looksChinese(text) ? "zh-CN" : "en-US");
  const cleaned = prepareText(text, lang);
  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.lang = lang;
  utterance.rate = options.rate ?? (lang.startsWith("zh") ? 0.95 : 0.78);
  utterance.pitch = options.pitch ?? 1;
  const voice = pickVoice(lang);
  if (voice) {
    utterance.voice = voice;
    // Keep lang aligned with the chosen voice when possible.
    if (voice.lang) utterance.lang = voice.lang;
  }
  return { utterance, cleaned };
}

function unlockSpeech() {
  try {
    if (speechSynthesis.paused) speechSynthesis.resume();
  } catch {
    // ignore
  }
}

function speakOnce(text, options = {}) {
  return new Promise((resolve) => {
    if (!text || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    const { utterance, cleaned } = buildUtterance(text, options);
    if (!cleaned) {
      resolve();
      return;
    }
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      resolve();
    };
    utterance.onend = done;
    utterance.onerror = done;
    unlockSpeech();
    speechSynthesis.speak(utterance);
    // Safari occasionally never fires end for tiny utterances.
    window.setTimeout(done, Math.max(2500, cleaned.length * 180));
  });
}

/**
 * Speak text. Second arg may be a rate number (legacy) or options:
 * `{ rate, lang, pitch, cancel }`.
 */
export function speak(text, rateOrOptions = 0.88) {
  if (!text) return;
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器暂不支持语音播放");
    return;
  }
  const options = normalizeSpeakOptions(rateOrOptions);
  speakGeneration += 1;
  if (options.cancel !== false) speechSynthesis.cancel();
  unlockSpeech();
  whenVoicesReady().then(() => {
    speechSynthesis.speak(buildUtterance(text, options).utterance);
  });
}

/**
 * Speak parts in order, waiting for each to finish.
 * Parts may be strings or `{ text, lang, rate, pitch }`.
 */
export async function speakSequence(parts, rateOrOptions = {}) {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器暂不支持语音播放");
    return;
  }
  const base = normalizeSpeakOptions(rateOrOptions);
  const generation = ++speakGeneration;
  if (base.cancel !== false) speechSynthesis.cancel();
  await whenVoicesReady();
  if (generation !== speakGeneration) return;

  const list = (parts || [])
    .map((part) => (typeof part === "string" ? { text: part } : part))
    .filter((part) => part && String(part.text || "").trim());

  for (const part of list) {
    if (generation !== speakGeneration) return;
    await speakOnce(part.text, {
      ...base,
      ...part,
      cancel: false,
    });
    // Small gap improves clarity between Chinese tip and English example.
    await new Promise((resolve) => window.setTimeout(resolve, 120));
  }
}

export function stopSpeaking() {
  speakGeneration += 1;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

/** Bind 🔊 chips inside `.speakable` blocks (chip itself is ignored when reading). */
export function bindSpeakable(root) {
  if (!root || root.dataset.speakableBound === "1") return;
  root.dataset.speakableBound = "1";
  root.addEventListener("click", (event) => {
    const chip = event.target.closest(".voice-chip");
    if (!chip || !root.contains(chip)) return;
    event.preventDefault();
    event.stopPropagation();
    const block = chip.closest(".speakable");
    if (!block) return;
    const clone = block.cloneNode(true);
    clone.querySelectorAll(".voice-chip").forEach((node) => node.remove());
    const text = clone.textContent.replace(/\s+/g, " ").trim();
    if (!text) return;
    if (looksChinese(text)) speak(text, { lang: "zh-CN", rate: 0.95 });
    else speak(text, { lang: "en-US", rate: 0.78 });
  });
}

export function voiceChip(label = "听") {
  return `<button class="voice-chip" type="button" aria-label="${label}">🔊 ${label}</button>`;
}

export function speakable(htmlOrText, { asHtml = false } = {}) {
  const body = asHtml ? htmlOrText : escapeForSpeakable(htmlOrText);
  return `<span class="speakable">${body}${voiceChip()}</span>`;
}

function escapeForSpeakable(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
