import { preschoolUnits, preschoolUnitById, preschoolUnitsByGroup } from "../data/index.js";
import { state } from "./state.js";
import { recordWeekActivity, updateDashboard } from "./dashboard.js";
import { KEYS, getString, setString, setCsvSet } from "./persist.js";
import { loadJson, saveJson, localDateKey, weekDateKeys } from "./utils.js";
import { showToast, speakSequence, stopSpeaking } from "./ui.js";

const session = {
  unit: null,
  mode: "listen",
  queue: [],
  questionIndex: 0,
  score: 0,
  mistakes: 0,
  moving: false,
};

let pendingOpenId = null;
const WEEKDAY_LABELS = ["一", "二", "三", "四", "五", "六", "日"];

function zh(text) {
  return { text, lang: "zh-CN", rate: 0.92 };
}

function en(text) {
  return { text, lang: "en-US", rate: 0.66, pitch: 1.08 };
}

function completionKey(unitId) {
  return `preschool:${unitId}`;
}

function unitIsComplete(unitId) {
  return state.completedLessons.has(completionKey(unitId));
}

function parentHintsOn() {
  return getString(KEYS.preschoolParentHints, "1") !== "0";
}

function setParentHints(on) {
  setString(KEYS.preschoolParentHints, on ? "1" : "0");
  document.querySelector("#learning")?.classList.toggle("preschool-hide-hints", !on);
}

function syncParentHintsClass() {
  document.querySelector("#learning")?.classList.toggle("preschool-hide-hints", !parentHintsOn());
}

function loadWeakWords() {
  const data = loadJson(KEYS.preschoolWeakWords, {});
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

function saveWeakWords(data) {
  saveJson(KEYS.preschoolWeakWords, data);
}

function weakWordList() {
  return Object.entries(loadWeakWords())
    .filter(([, count]) => Number(count) > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]) || a[0].localeCompare(b[0]))
    .map(([word]) => word);
}

function noteWeakWord(word) {
  if (!word) return;
  const data = loadWeakWords();
  data[word] = Math.min(9, (Number(data[word]) || 0) + 1);
  saveWeakWords(data);
}

function clearWeakWord(word) {
  if (!word) return;
  const data = loadWeakWords();
  if (!data[word]) return;
  const next = (Number(data[word]) || 0) - 1;
  if (next <= 0) delete data[word];
  else data[word] = next;
  saveWeakWords(data);
}

function loadStarWall() {
  const data = loadJson(KEYS.preschoolStars, {});
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

function addStarWall(stars) {
  if (!stars) return { before: weekStarTotal(), after: weekStarTotal(), gained: 0 };
  const before = weekStarTotal();
  const key = localDateKey(new Date());
  const data = loadStarWall();
  data[key] = Math.min(21, (Number(data[key]) || 0) + stars);
  const keep = new Set(weekDateKeys());
  for (const day of Object.keys(data)) {
    if (keep.has(day)) continue;
    const ageMs = Date.now() - new Date(`${day}T00:00:00`).getTime();
    if (ageMs > 21 * 24 * 60 * 60 * 1000) delete data[day];
  }
  saveJson(KEYS.preschoolStars, data);
  const after = weekStarTotal();
  return { before, after, gained: after - before };
}

function weekStarCells() {
  const today = localDateKey(new Date());
  const data = loadStarWall();
  return weekDateKeys().map((key, index) => ({
    key,
    label: WEEKDAY_LABELS[index],
    stars: Number(data[key]) || 0,
    isToday: key === today,
  }));
}

function weekStarTotal() {
  return weekStarCells().reduce((sum, cell) => sum + cell.stars, 0);
}

const STAR_MILESTONES = [10, 20];

function loadCelebrations() {
  const data = loadJson(KEYS.preschoolCelebrations, {});
  if (!data || typeof data !== "object" || Array.isArray(data)) return { groups: {}, milestones: {} };
  return {
    groups: data.groups && typeof data.groups === "object" ? data.groups : {},
    milestones: data.milestones && typeof data.milestones === "object" ? data.milestones : {},
  };
}

function saveCelebrations(data) {
  saveJson(KEYS.preschoolCelebrations, data);
}

function weekMilestoneKey(threshold) {
  return `${weekDateKeys()[0]}:${threshold}`;
}

function claimStarMilestones(before, after) {
  const claimed = [];
  const data = loadCelebrations();
  for (const threshold of STAR_MILESTONES) {
    if (before >= threshold || after < threshold) continue;
    const key = weekMilestoneKey(threshold);
    if (data.milestones[key]) continue;
    data.milestones[key] = 1;
    claimed.push(threshold);
  }
  if (claimed.length) saveCelebrations(data);
  return claimed;
}

function groupStats(group) {
  const done = group.units.filter((unit) => unitIsComplete(unit.id)).length;
  return { done, total: group.units.length, complete: done === group.units.length && group.units.length > 0 };
}

function claimGroupBadge(unitId) {
  if (!unitId || unitId === "mix-review") return null;
  const group = preschoolUnitsByGroup().find((entry) => entry.units.some((unit) => unit.id === unitId));
  if (!group || !groupStats(group).complete) return null;
  const data = loadCelebrations();
  if (data.groups[group.id]) return null;
  data.groups[group.id] = 1;
  saveCelebrations(data);
  return group;
}

function itemFor(unit, word) {
  return unit.items.find((item) => item.word === word);
}

function itemCatalog() {
  const map = new Map();
  for (const unit of preschoolUnits) {
    for (const item of unit.items) map.set(item.word, item);
  }
  return map;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function picture(item, className = "") {
  const style = item.swatch ? ` style="--picture-color: ${item.swatch}"` : "";
  return `<span class="preschool-picture ${item.swatch ? "is-swatch" : ""} ${className}"${style} aria-hidden="true">${item.visual}</span>`;
}

function speakWord(item, intro = "") {
  const parts = intro ? [zh(intro)] : [];
  parts.push(en(item.word), en(item.word));
  return speakSequence(parts);
}

function completedUnits() {
  return preschoolUnits.filter((unit) => unitIsComplete(unit.id));
}

function nextIncompleteUnit(fromId = null) {
  if (!fromId) return preschoolUnits.find((unit) => !unitIsComplete(unit.id)) || null;
  const start = preschoolUnits.findIndex((unit) => unit.id === fromId);
  const ordered = [
    ...preschoolUnits.slice(start + 1),
    ...preschoolUnits.slice(0, Math.max(start, 0)),
  ];
  return ordered.find((unit) => !unitIsComplete(unit.id)) || null;
}

function mixReady() {
  return completedUnits().length >= 2 || weakWordList().length >= 3;
}

/** Prefer weak-word mix, then first incomplete theme, then general mix. */
export function recommendedPreschoolUnitId() {
  if (weakWordList().length >= 3 && buildMixUnit()) return "mix-review";
  return nextIncompleteUnit()?.id || (mixReady() ? "mix-review" : preschoolUnits[0]?.id || null);
}

export function queuePreschoolOpen(unitId) {
  pendingOpenId = unitId;
}

function buildMixUnit() {
  if (!mixReady()) return null;
  const catalog = itemCatalog();
  const weak = weakWordList();
  const completedPool = completedUnits().flatMap((unit) => unit.items);
  const fillerPool = completedPool.length ? completedPool : [...catalog.values()];
  const selected = [];
  const seen = new Set();

  for (const word of weak) {
    const item = catalog.get(word);
    if (!item || seen.has(word)) continue;
    seen.add(word);
    selected.push(item);
    if (selected.length >= 6) break;
  }
  for (const item of shuffle(fillerPool)) {
    if (seen.has(item.word)) continue;
    seen.add(item.word);
    selected.push(item);
    if (selected.length >= 6) break;
  }
  if (selected.length < 6) return null;

  const weakFocus = selected.filter((item) => weak.includes(item.word)).length;
  return {
    id: "mix-review",
    icon: "🎲",
    title: "Mix Review",
    titleZh: weakFocus ? "错词混合复习" : "混合复习",
    color: "#efe6ff",
    instruction: weakFocus
      ? `优先练习 ${weakFocus} 个之前容易点错的词，再搭配熟悉词一起听辨。`
      : "从已完成主题里抽出词语，再听一遍、点一遍。",
    isMix: true,
    items: selected,
    questions: selected.map((item) => {
      const distractors = shuffle(selected.filter((entry) => entry.word !== item.word)).slice(0, 2);
      return {
        prompt: `${item.zh}在哪里？`,
        audio: item.word,
        answer: item.word,
        choices: shuffle([item.word, ...distractors.map((entry) => entry.word)]),
      };
    }),
  };
}

function resolveUnit(unitId) {
  if (unitId === "mix-review") return buildMixUnit();
  return preschoolUnitById(unitId);
}

function buildListenQueue(unit) {
  return unit.questions.map((question) => ({ ...question, mode: "listen" }));
}

function buildSoundQueue(unit) {
  return unit.items.map((item) => {
    const distractors = shuffle(unit.items.filter((entry) => entry.word !== item.word)).slice(0, 2);
    const choices = shuffle([item.word, ...distractors.map((entry) => entry.word)]);
    return {
      mode: "sound",
      prompt: `这是${item.zh}，哪一段声音是它的英文？`,
      target: item.word,
      answer: item.word,
      choices,
    };
  });
}

function starCount() {
  if (session.mistakes === 0) return 3;
  if (session.mistakes <= 2) return 2;
  return 1;
}

function renderStarWall() {
  const cells = weekStarCells();
  const total = weekStarTotal();
  const nextGoal = STAR_MILESTONES.find((threshold) => total < threshold) || null;
  return `
    <section class="preschool-star-wall" aria-label="本周星星墙">
      <header>
        <strong>本周星星墙</strong>
        <span>共 ${total} 颗${nextGoal ? ` · 距 ${nextGoal} 颗还差 ${nextGoal - total}` : " · 本周目标达成"}</span>
      </header>
      <div class="preschool-star-meter" aria-hidden="true">
        <i style="width: ${Math.min(100, (total / 20) * 100)}%"></i>
      </div>
      <div class="preschool-star-days">
        ${cells.map((cell) => `
          <div class="preschool-star-day ${cell.isToday ? "is-today" : ""} ${cell.stars ? "has-stars" : ""}">
            <small>${cell.label}</small>
            <span aria-hidden="true">${cell.stars ? "★".repeat(Math.min(cell.stars, 5)) : "·"}</span>
            <em>${cell.stars || 0}</em>
          </div>`).join("")}
      </div>
    </section>`;
}

function renderGroupBadges() {
  const celebrated = loadCelebrations().groups;
  return `
    <section class="preschool-badges" aria-label="分组徽章">
      ${preschoolUnitsByGroup().map((group) => {
        const stats = groupStats(group);
        const earned = Boolean(celebrated[group.id]) || stats.complete;
        return `
          <div class="preschool-badge ${earned ? "is-earned" : ""} ${stats.complete && !celebrated[group.id] ? "is-new" : ""}">
            <span aria-hidden="true">${earned ? "🏅" : "◌"}</span>
            <div>
              <strong>${group.title}</strong>
              <small>${stats.complete ? "徽章已点亮" : `${stats.done}/${stats.total} 完成`}</small>
            </div>
          </div>`;
      }).join("")}
    </section>`;
}

function renderCards() {
  const list = document.querySelector("#preschool-unit-list");
  if (!list) return;
  const done = preschoolUnits.filter((unit) => unitIsComplete(unit.id)).length;
  const recommendId = recommendedPreschoolUnitId();
  const recommend = resolveUnit(recommendId);
  const weakCount = weakWordList().length;
  const canMix = mixReady() && Boolean(buildMixUnit());

  list.innerHTML = `
    <div class="preschool-toolbar">
      <div class="preschool-progress-strip" aria-label="幼儿游戏进度">
        <strong>${done}/${preschoolUnits.length}</strong>
        <span>已完成听音游戏${weakCount ? ` · ${weakCount} 个待巩固词` : ""}</span>
      </div>
      <label class="preschool-hint-toggle">
        <input type="checkbox" data-preschool-hints ${parentHintsOn() ? "checked" : ""} />
        <span>显示中文提示（家长）</span>
      </label>
    </div>
    ${renderStarWall()}
    ${renderGroupBadges()}
    ${recommend ? `
      <section class="preschool-today" aria-label="今日推荐">
        <div>
          <small>今日推荐</small>
          <strong>${recommend.icon} ${recommend.titleZh}</strong>
          <p>${recommend.isMix
            ? (weakCount >= 3 ? `优先复习 ${weakCount} 个容易点错的词。` : "把学过的主题混在一起练，记得更牢。")
            : recommend.instruction}</p>
        </div>
        <button class="preschool-today-go" type="button" data-preschool-open="${recommend.id}">开始</button>
      </section>` : ""}
    ${canMix ? `
      <button class="preschool-mix-card" type="button" data-preschool-open="mix-review" aria-label="开始混合复习">
        <span aria-hidden="true">🎲</span>
        <span>
          <strong>${weakCount ? "错词混合复习" : "混合复习"}</strong>
          <small>${weakCount
            ? `优先抽 ${Math.min(weakCount, 6)} 个易错词，再补齐到 6 个`
            : `从 ${completedUnits().length} 个已完成主题中抽 6 个词再练`}</small>
        </span>
        <span class="preschool-play" aria-hidden="true">▶</span>
      </button>` : ""}
    ${preschoolUnitsByGroup().map((group) => {
      const stats = groupStats(group);
      return `
      <section class="preschool-group ${stats.complete ? "is-complete" : ""}" aria-labelledby="preschool-group-${group.id}">
        <header class="preschool-group-head">
          <div>
            <h3 id="preschool-group-${group.id}">${group.title}${stats.complete ? " 🏅" : ""}</h3>
            <p>${group.blurb}</p>
          </div>
          <small>${stats.done}/${stats.total}</small>
        </header>
        <div class="preschool-group-grid">
          ${group.units.map((unit) => {
            const index = preschoolUnits.findIndex((entry) => entry.id === unit.id);
            const isToday = unit.id === recommendId;
            return `
              <article class="preschool-unit-card ${unitIsComplete(unit.id) ? "is-complete" : ""} ${isToday ? "is-today" : ""}" style="--unit-color: ${unit.color}">
                <button type="button" data-preschool-unit="${unit.id}" aria-label="${unit.titleZh}，第 ${index + 1} 个游戏">
                  <span class="preschool-unit-icon" aria-hidden="true">${unit.icon}</span>
                  <span class="preschool-unit-copy">
                    <small>${unitIsComplete(unit.id) ? "已完成" : isToday ? "今日推荐" : `游戏 ${index + 1}`}</small>
                    <strong>${unit.titleZh}</strong>
                    <span>${unit.title}</span>
                  </span>
                  <span class="preschool-play" aria-hidden="true">▶</span>
                </button>
              </article>`;
          }).join("")}
        </div>
      </section>`;
    }).join("")}`;

  list.querySelector("[data-preschool-hints]")?.addEventListener("change", (event) => {
    setParentHints(event.target.checked);
    showToast(event.target.checked ? "已显示中文家长提示" : "已隐藏中文提示，更适合孩子独立点选");
  });
  list.querySelectorAll("[data-preschool-unit]").forEach((button) => {
    button.addEventListener("click", () => openUnit(button.dataset.preschoolUnit));
  });
  list.querySelectorAll("[data-preschool-open]").forEach((button) => {
    button.addEventListener("click", () => openUnit(button.dataset.preschoolOpen));
  });
}

function renderWarmup(unit) {
  const workspace = document.querySelector("#preschool-workspace");
  workspace.hidden = false;
  workspace.innerHTML = `
    <header class="preschool-workspace-head">
      <button class="preschool-icon-button" type="button" data-close-preschool aria-label="返回游戏列表">←</button>
      <div><small>${unit.isMix ? "混合复习" : "先听一听"}</small><h2>${unit.titleZh}</h2><p class="preschool-parent-line">给家长：${unit.instruction}</p></div>
      <button class="preschool-icon-button is-sound" type="button" data-preschool-help aria-label="播放玩法说明">🔊</button>
    </header>
    <div class="preschool-warmup" aria-label="点图片听单词">
      ${unit.items.map((item) => `
        <button type="button" data-preschool-word="${item.word}" aria-label="听 ${item.zh} 的英文">
          ${picture(item)}
          <small class="preschool-word-zh">${item.zh}</small>
          <span class="preschool-sound-mark" aria-hidden="true">🔊</span>
        </button>`).join("")}
    </div>
    <div class="preschool-mode-pick" aria-label="选择玩法">
      <p class="preschool-parent-line">选一个玩法开始</p>
      <div>
        <button class="preschool-mode-button" type="button" data-preschool-mode="listen">
          <span aria-hidden="true">👂</span>
          <strong>听声音点图片</strong>
          <small>先听英文，再找出对的图</small>
        </button>
        <button class="preschool-mode-button is-alt" type="button" data-preschool-mode="sound">
          <span aria-hidden="true">🖼️</span>
          <strong>看图片找声音</strong>
          <small>先看图，再听出正确英文</small>
        </button>
      </div>
    </div>`;

  workspace.querySelector("[data-close-preschool]").addEventListener("click", closeUnit);
  workspace.querySelector("[data-preschool-help]").addEventListener("click", () => speakSequence([
    zh(unit.instruction),
    zh("点每张大图片，可以先听英文。下面有两种玩法，选一个开始。"),
  ]));
  workspace.querySelectorAll("[data-preschool-word]").forEach((button) => {
    button.addEventListener("click", () => speakWord(itemFor(unit, button.dataset.preschoolWord)));
  });
  workspace.querySelectorAll("[data-preschool-mode]").forEach((button) => {
    button.addEventListener("click", () => startMode(button.dataset.preschoolMode));
  });
}

function startMode(mode) {
  const unit = session.unit;
  if (!unit) return;
  session.mode = mode === "sound" ? "sound" : "listen";
  session.queue = session.mode === "sound" ? buildSoundQueue(unit) : buildListenQueue(unit);
  session.questionIndex = 0;
  session.score = 0;
  session.mistakes = 0;
  renderQuestion();
}

function playListenQuestion(question) {
  return speakSequence([
    zh("听一听，点出正确的图片。"),
    en(question.audio),
    en(question.audio),
  ]);
}

function playSoundQuestion(question, unit) {
  const item = itemFor(unit, question.target);
  return speakSequence([
    zh(`看看这张图片，这是${item.zh}。`),
    zh("点喇叭，找出正确的英文声音。"),
  ]);
}

function renderQuestion() {
  const unit = session.unit;
  const question = session.queue[session.questionIndex];
  const workspace = document.querySelector("#preschool-workspace");
  if (!unit || !question || !workspace) return;
  session.moving = false;

  if (question.mode === "sound") {
    const target = itemFor(unit, question.target);
    workspace.innerHTML = `
      <div class="preschool-game-head">
        <button class="preschool-icon-button" type="button" data-close-preschool aria-label="退出游戏">←</button>
        <div class="preschool-game-progress" aria-label="第 ${session.questionIndex + 1} 题，共 ${session.queue.length} 题">
          ${session.queue.map((_, index) => `<span class="${index < session.questionIndex ? "is-done" : index === session.questionIndex ? "is-current" : ""}"></span>`).join("")}
        </div>
        <button class="preschool-replay" type="button" data-replay-preschool aria-label="再听说明">🔊</button>
      </div>
      <div class="preschool-prompt is-picture">
        ${picture(target, "is-hero")}
        <p class="preschool-parent-line">给家长：${question.prompt}</p>
      </div>
      <div class="preschool-sound-options" aria-label="选择一段英文声音">
        ${question.choices.map((word, index) => `
          <button type="button" data-preschool-answer="${word}" aria-label="试听选项 ${index + 1}">
            <span class="preschool-sound-option-icon" aria-hidden="true">🔊</span>
            <strong>${index + 1}</strong>
          </button>`).join("")}
      </div>
      <div class="preschool-feedback" aria-live="polite"></div>`;
  } else {
    workspace.innerHTML = `
      <div class="preschool-game-head">
        <button class="preschool-icon-button" type="button" data-close-preschool aria-label="退出游戏">←</button>
        <div class="preschool-game-progress" aria-label="第 ${session.questionIndex + 1} 题，共 ${session.queue.length} 题">
          ${session.queue.map((_, index) => `<span class="${index < session.questionIndex ? "is-done" : index === session.questionIndex ? "is-current" : ""}"></span>`).join("")}
        </div>
        <button class="preschool-replay" type="button" data-replay-preschool aria-label="再听一遍">🔊</button>
      </div>
      <div class="preschool-prompt">
        <span aria-hidden="true">👂</span>
        <p class="preschool-parent-line">给家长：${question.prompt}</p>
      </div>
      <div class="preschool-options" aria-label="选择一张图片">
        ${question.choices.map((word) => {
          const item = itemFor(unit, word);
          return `<button type="button" data-preschool-answer="${word}" aria-label="${item.zh}">${picture(item)}</button>`;
        }).join("")}
      </div>
      <div class="preschool-feedback" aria-live="polite"></div>`;
  }

  workspace.querySelector("[data-close-preschool]").addEventListener("click", closeUnit);
  workspace.querySelector("[data-replay-preschool]").addEventListener("click", () => {
    if (question.mode === "sound") playSoundQuestion(question, unit);
    else playListenQuestion(question);
  });
  workspace.querySelectorAll("[data-preschool-answer]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (session.moving) return;
      if (question.mode === "sound") {
        session.moving = true;
        await speakSequence([en(button.dataset.preschoolAnswer)]);
        if (session.unit?.id !== unit.id || session.queue[session.questionIndex] !== question) return;
        session.moving = false;
        answerQuestion(button);
        return;
      }
      answerQuestion(button);
    });
  });

  if (question.mode === "sound") playSoundQuestion(question, unit);
  else playListenQuestion(question);
}

function answerQuestion(button) {
  if (session.moving) return;
  const unit = session.unit;
  const question = session.queue[session.questionIndex];
  const correct = button.dataset.preschoolAnswer === question.answer;
  const feedback = document.querySelector(".preschool-feedback");
  const targetWord = question.mode === "sound" ? question.answer : question.audio;
  if (!correct) {
    session.mistakes += 1;
    noteWeakWord(targetWord);
    button.classList.add("is-wrong");
    feedback.innerHTML = `<span aria-hidden="true">↻</span>`;
    if (question.mode === "sound") {
      speakSequence([zh("再听听。"), en(question.answer), en(question.answer)]);
    } else {
      speakSequence([zh("再听一次。"), en(question.audio), en(question.audio)]);
    }
    window.setTimeout(() => button.classList.remove("is-wrong"), 650);
    return;
  }

  session.moving = true;
  session.score += 1;
  clearWeakWord(targetWord);
  button.classList.add("is-correct");
  document.querySelectorAll("[data-preschool-answer]").forEach((option) => { option.disabled = true; });
  feedback.innerHTML = `<span class="is-success" aria-hidden="true">★</span>`;
  const spoken = question.mode === "sound" ? question.answer : question.audio;
  speakSequence([zh("答对啦！"), en(spoken)]);
  const unitId = unit.id;
  window.setTimeout(() => {
    if (session.unit?.id !== unitId) return;
    session.questionIndex += 1;
    if (session.questionIndex >= session.queue.length) finishUnit();
    else renderQuestion();
  }, 1050);
}

function finishUnit() {
  const unit = session.unit;
  const stars = starCount();
  const next = unit.isMix ? nextIncompleteUnit() : nextIncompleteUnit(unit.id);
  if (!unit.isMix) {
    state.completedLessons.add(completionKey(unit.id));
    setCsvSet(KEYS.completedLessons, state.completedLessons);
  }
  const starDelta = addStarWall(stars);
  const milestones = claimStarMilestones(starDelta.before, starDelta.after);
  const newGroup = unit.isMix ? null : claimGroupBadge(unit.id);
  recordWeekActivity(1);
  updateDashboard();
  renderCards();
  const workspace = document.querySelector("#preschool-workspace");
  const canMixAgain = mixReady() && Boolean(buildMixUnit());
  const celebrate = stars === 3 || milestones.length > 0 || Boolean(newGroup);
  const banners = [
    newGroup ? `🏅 点亮「${newGroup.title}」徽章！` : "",
    ...milestones.map((threshold) => `✨ 本周星星达到 ${threshold} 颗！`),
  ].filter(Boolean);
  workspace.innerHTML = `
    <div class="preschool-finish ${celebrate ? "is-celebrate" : ""}">
      <div class="preschool-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="preschool-stars" aria-hidden="true">${"★ ".repeat(stars).trim()}${"☆ ".repeat(3 - stars).trim()}</div>
      <span class="preschool-finish-picture" aria-hidden="true">${unit.icon}</span>
      <h2>完成啦！</h2>
      ${banners.length ? `<ul class="preschool-finish-banners">${banners.map((line) => `<li>${line}</li>`).join("")}</ul>` : ""}
      <p class="preschool-parent-line">给家长：本轮听辨 ${session.score}/${session.queue.length} 个词${session.mistakes ? `，中间试错 ${session.mistakes} 次` : "，一次就对"}。本周星星墙已加上 ${stars} 颗（本周共 ${starDelta.after} 颗）。</p>
      <div class="preschool-finish-actions">
        <button class="preschool-icon-button" type="button" data-close-preschool aria-label="返回游戏列表">←</button>
        <button class="preschool-icon-button is-restart" type="button" data-restart-preschool aria-label="再玩一次">↻</button>
        ${next ? `<button class="preschool-next" type="button" data-next-preschool="${next.id}">下一个：${next.titleZh}</button>` : ""}
        ${!next && canMixAgain ? `<button class="preschool-next" type="button" data-next-preschool="mix-review">再来一轮混合复习</button>` : ""}
      </div>
    </div>`;
  workspace.querySelector("[data-close-preschool]").addEventListener("click", closeUnit);
  workspace.querySelector("[data-restart-preschool]").addEventListener("click", () => {
    if (unit.isMix) {
      openUnit("mix-review");
      return;
    }
    session.questionIndex = 0;
    session.score = 0;
    session.mistakes = 0;
    renderWarmup(unit);
  });
  workspace.querySelector("[data-next-preschool]")?.addEventListener("click", (event) => {
    openUnit(event.currentTarget.dataset.nextPreschool);
  });
  const speakParts = [
    zh(stars === 3 ? "太棒了，三颗星！" : stars === 2 ? "很棒，两颗星！" : "完成啦，再玩一次会更熟练！"),
  ];
  if (newGroup) speakParts.push(zh(`恭喜点亮${newGroup.title}徽章！`));
  if (milestones.length) speakParts.push(zh(`本周星星已经达到${milestones[milestones.length - 1]}颗啦！`));
  speakParts.push(zh(unit.isMix ? "混合复习完成啦！" : "这个游戏完成啦！"));
  speakSequence(speakParts);
  showToast(newGroup
    ? `点亮「${newGroup.title}」徽章，星星已记入本周`
    : milestones.length
      ? `本周星星达到 ${milestones[milestones.length - 1]} 颗`
      : unit.isMix
        ? "混合复习完成，星星已记入本周"
        : "幼儿听音游戏已完成，星星已记入本周");
}

export function openUnit(unitId) {
  const unit = resolveUnit(unitId);
  if (!unit) {
    showToast(unitId === "mix-review"
      ? "先完成 2 个主题，或先积累 3 个待巩固词，再开始混合复习"
      : "找不到这个游戏");
    return;
  }
  stopSpeaking();
  session.unit = unit;
  session.mode = "listen";
  session.queue = [];
  session.questionIndex = 0;
  session.score = 0;
  session.mistakes = 0;
  renderWarmup(unit);
  document.querySelector("#preschool-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
  speakSequence([
    zh(unit.isMix ? "混合复习开始啦。" : `欢迎来到${unit.titleZh}游戏。`),
    zh(unit.instruction),
    zh("先点大图片听一听，再选玩法。"),
  ]);
}

function closeUnit() {
  stopSpeaking();
  session.unit = null;
  session.moving = false;
  const workspace = document.querySelector("#preschool-workspace");
  if (workspace) {
    workspace.hidden = true;
    workspace.innerHTML = "";
  }
  document.querySelector("#preschool-course-path")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function renderPreschoolCoursePath(visible) {
  const section = document.querySelector("#preschool-course-path");
  if (!section) return;
  section.hidden = !visible;
  if (!visible) {
    stopSpeaking();
    session.unit = null;
    session.moving = false;
    const workspace = document.querySelector("#preschool-workspace");
    if (workspace) {
      workspace.hidden = true;
      workspace.innerHTML = "";
    }
    return;
  }
  syncParentHintsClass();
  renderCards();
  const guide = section.querySelector("[data-preschool-guide]");
  if (guide && guide.dataset.bound !== "1") {
    guide.dataset.bound = "1";
    guide.addEventListener("click", () => speakSequence([
      zh(`这里有 ${preschoolUnits.length} 个听音游戏，分成三组。`),
      zh("可以先做今日推荐。点错的词会进入混合复习。"),
      zh("完成后星星会记到本周星星墙，整组通关还能点亮徽章。"),
    ]));
  }
  if (pendingOpenId) {
    const id = pendingOpenId;
    pendingOpenId = null;
    window.requestAnimationFrame(() => openUnit(id));
  }
}
