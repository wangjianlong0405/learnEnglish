import { phoneticsInCategory, phoneticById, pairsForSymbol, phoneticMinimalPairs } from "../data/index.js";
import { speak, speakSequence, showToast, stopSpeaking } from "./ui.js";
import { syncAllTablists } from "./tabs.js";
import { recordMistake } from "./mistakes.js";

const session = {
  category: "all",
  selectedId: null,
  pairId: null,
  targetSide: "left",
  answered: false,
};

function selectedSymbol() {
  return phoneticById(session.selectedId) || phoneticsInCategory(session.category)[0] || null;
}

/** Prefer accurate English example; Chinese tip is coaching only. */
function playSymbol(symbol, mode = "full") {
  if (!symbol) return;
  stopSpeaking();
  if (mode === "example") {
    speakSequence([
      { text: symbol.example, lang: "en-US", rate: 0.62 },
      { text: symbol.example, lang: "en-US", rate: 0.78 },
    ]);
    return;
  }
  if (mode === "tip") {
    speakSequence([
      { text: `${symbol.label}。${symbol.tipZh}`, lang: "zh-CN", rate: 0.95 },
    ]);
    return;
  }
  speakSequence([
    { text: `${symbol.label}。${symbol.tipZh}`, lang: "zh-CN", rate: 0.95 },
    { text: symbol.example, lang: "en-US", rate: 0.62 },
    { text: symbol.example, lang: "en-US", rate: 0.8 },
  ]);
}

function activePairs() {
  const related = pairsForSymbol(session.selectedId);
  return related.length ? related : phoneticMinimalPairs;
}

function currentPair() {
  const pairs = activePairs();
  if (!pairs.some((pair) => pair.id === session.pairId)) {
    session.pairId = pairs[0]?.id || null;
    session.answered = false;
    session.targetSide = Math.random() < 0.5 ? "left" : "right";
  }
  return pairs.find((pair) => pair.id === session.pairId) || pairs[0] || null;
}

function pairSideWord(pair, side) {
  return side === "left" ? pair.left : pair.right;
}

function playPairWord(pair, side) {
  const item = pairSideWord(pair, side);
  stopSpeaking();
  speakSequence([
    { text: item.word, lang: "en-US", rate: 0.6 },
    { text: item.word, lang: "en-US", rate: 0.78 },
  ]);
}

function renderMinimalPairs() {
  const panel = document.querySelector("#phonetic-pairs");
  if (!panel) return;
  const pairs = activePairs();
  const pair = currentPair();
  if (!pair) {
    panel.innerHTML = "";
    return;
  }
  const left = phoneticById(pair.left.symbolId);
  const right = phoneticById(pair.right.symbolId);
  const filtered = Boolean(session.selectedId && pairsForSymbol(session.selectedId).length);

  panel.innerHTML = `
    <div class="phonetic-pairs-card">
      <div class="phonetic-pairs-head">
        <div>
          <span class="preview-label">最小对立练习</span>
          <h2>听一听，选出你听到的词</h2>
          <p>${filtered ? "已按当前音标筛选相关对立组。" : "练习常见易混音：先听，再点选。"}</p>
        </div>
        <span class="phonetic-group-tag">${pairs.findIndex((item) => item.id === pair.id) + 1} / ${pairs.length}</span>
      </div>
      <p class="phonetic-tip">${pair.tipZh}</p>
      <div class="phonetic-pair-compare">
        <article>
          <small>/${left?.ipa || "?"}/</small>
          <strong>${pair.left.word}</strong>
          <span>${pair.left.gloss}</span>
          <button class="sound-button" type="button" data-pair-preview="left" aria-label="预听左边">EN</button>
        </article>
        <span class="phonetic-pair-vs">vs</span>
        <article>
          <small>/${right?.ipa || "?"}/</small>
          <strong>${pair.right.word}</strong>
          <span>${pair.right.gloss}</span>
          <button class="sound-button" type="button" data-pair-preview="right" aria-label="预听右边">EN</button>
        </article>
      </div>
      <div class="audio-controls">
        <button class="primary-button" type="button" data-pair-play-target>▶ 播放题目（只听一遍）</button>
        <button class="secondary-button" type="button" data-pair-next>下一组</button>
      </div>
      <div class="check-options phonetic-pair-choices">
        <button type="button" data-pair-answer="left"><span>A</span><span>${pair.left.word}</span></button>
        <button type="button" data-pair-answer="right"><span>B</span><span>${pair.right.word}</span></button>
      </div>
      <div class="check-feedback" id="pair-feedback">先点播放，再选择你听到的词。也可以先点 EN 对比两边。</div>
    </div>`;

  panel.querySelectorAll("[data-pair-preview]").forEach((button) => {
    button.addEventListener("click", () => playPairWord(pair, button.dataset.pairPreview));
  });
  panel.querySelector("[data-pair-play-target]")?.addEventListener("click", () => {
    session.answered = false;
    playPairWord(pair, session.targetSide);
    showToast("仔细听，然后选择");
  });
  panel.querySelector("[data-pair-next]")?.addEventListener("click", () => {
    const index = pairs.findIndex((item) => item.id === pair.id);
    const next = pairs[(index + 1) % pairs.length];
    session.pairId = next.id;
    session.answered = false;
    session.targetSide = Math.random() < 0.5 ? "left" : "right";
    renderMinimalPairs();
  });
  panel.querySelectorAll("[data-pair-answer]").forEach((button) => {
    button.addEventListener("click", () => answerPair(button.dataset.pairAnswer));
  });
}

function answerPair(side) {
  const pair = currentPair();
  if (!pair || session.answered) return;
  session.answered = true;
  const correct = side === session.targetSide;
  const buttons = [...document.querySelectorAll("[data-pair-answer]")];
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.pairAnswer === session.targetSide) button.classList.add("correct");
    if (button.dataset.pairAnswer === side && !correct) button.classList.add("wrong");
  });
  const target = pairSideWord(pair, session.targetSide);
  const feedback = document.querySelector("#pair-feedback");
  if (correct) {
    feedback.innerHTML = `<strong>听对了！</strong><span>目标词是 ${target.word}（/${phoneticById(target.symbolId)?.ipa || ""}/）。${pair.tipZh}</span>`;
  } else {
    feedback.innerHTML = `<strong>再听一次对比。</strong><span>刚才播放的是 ${target.word}。${pair.tipZh}</span>`;
    recordMistake({
      source: "音标最小对立",
      question: `听辨：${pair.left.word} / ${pair.right.word}`,
      options: [pair.left.word, pair.right.word],
      answer: session.targetSide === "left" ? 0 : 1,
      note: pair.tipZh,
    });
  }
}

export function renderPhoneticsChart() {
  const grid = document.querySelector("#phonetic-grid");
  const countEl = document.querySelector("#phonetic-count");
  const detail = document.querySelector("#phonetic-detail");
  if (!grid || !countEl || !detail) return;

  const symbols = phoneticsInCategory(session.category);
  if (!Array.isArray(symbols) || symbols.length === 0) {
    countEl.textContent = "0";
    grid.innerHTML = "";
    detail.innerHTML = `<p class="muted">音标数据未加载。请硬刷新页面（Ctrl/Cmd+Shift+R），或清除站点缓存后重试。</p>`;
    return;
  }

  if (!symbols.some((item) => item.id === session.selectedId)) {
    session.selectedId = symbols[0]?.id || null;
  }
  const current = selectedSymbol();

  document.querySelectorAll("[data-phonetic-category]").forEach((button) => {
    const active = button.dataset.phoneticCategory === session.category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  countEl.textContent = String(symbols.length);
  grid.innerHTML = symbols.map((item) => `
    <button
      class="phonetic-tile ${item.id === session.selectedId ? "is-active" : ""}"
      type="button"
      data-phonetic-id="${item.id}"
      aria-pressed="${item.id === session.selectedId ? "true" : "false"}"
      aria-label="音标 ${item.ipa}，例词 ${item.example}"
    >
      <strong>/${item.ipa}/</strong>
      <span>${item.example}</span>
    </button>`).join("");

  if (!current) {
    detail.innerHTML = `<p class="muted">暂无音标。</p>`;
    return;
  }

  detail.innerHTML = `
    <div class="phonetic-detail-card">
      <div class="phonetic-detail-head">
        <span class="phonetic-symbol">/${current.ipa}/</span>
        <span class="phonetic-group-tag">${current.label}</span>
      </div>
      <p class="phonetic-tip">${current.tipZh}</p>
      <div class="phonetic-example-row">
        <div>
          <small>例词（主要听这个）</small>
          <strong>${current.example}</strong>
          <span>${current.gloss}</span>
        </div>
        <div class="phonetic-actions">
          <button class="secondary-button" type="button" data-play-tip>听口型说明</button>
          <button class="primary-button" type="button" data-play-example>听例词两遍</button>
        </div>
      </div>
      <p class="phonetic-note">说明：浏览器无法可靠朗读单个音标符号。本页用「中文口型提示 + 英语例词慢速朗读」来学习；请以例词发音为准。</p>
    </div>`;

  document.querySelectorAll("[data-phonetic-id]").forEach((button) => {
    button.addEventListener("click", () => {
      session.selectedId = button.dataset.phoneticId;
      session.pairId = null;
      session.answered = false;
      renderPhoneticsChart();
      playSymbol(phoneticById(session.selectedId), "full");
    });
  });

  detail.querySelector("[data-play-tip]")?.addEventListener("click", () => playSymbol(current, "tip"));
  detail.querySelector("[data-play-example]")?.addEventListener("click", () => {
    playSymbol(current, "example");
    showToast(`例词：${current.example}`);
  });

  renderMinimalPairs();
  syncAllTablists(document.querySelector("#phonetics"));
}

export function initPhoneticsChart() {
  document.querySelectorAll("[data-phonetic-category]").forEach((button) => {
    button.addEventListener("click", () => {
      stopSpeaking();
      session.category = button.dataset.phoneticCategory;
      session.pairId = null;
      renderPhoneticsChart();
    });
  });
}
