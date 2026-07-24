import { kidsCourseUnits, kidsUnitById } from "../data/index.js";
import { state } from "./state.js";
import { recordMistake } from "./mistakes.js";
import { recordWeekActivity, updateDashboard } from "./dashboard.js";
import { KEYS, setCsvSet } from "./persist.js";
import { escapeHtml } from "./utils.js";
import { showToast, speak, speakSequence, stopSpeaking } from "./ui.js";

const session = {
  unit: null,
  questionIndex: 0,
  results: [],
};

function completionKey(unitId) {
  return `kids-unit:${unitId}`;
}

function unitIsComplete(unitId) {
  return state.completedLessons.has(completionKey(unitId));
}

function renderUnitCards() {
  const list = document.querySelector("#kids-unit-list");
  if (!list) return;
  list.innerHTML = kidsCourseUnits.map((unit) => {
    const done = unitIsComplete(unit.id);
    return `
      <article class="kids-unit-card ${done ? "is-complete" : ""}">
        <div class="kids-unit-number"><span>${unit.icon}</span><small>UNIT ${unit.number}</small></div>
        <div class="kids-unit-card-copy">
          <span class="preview-label">${unit.level} · ${unit.duration}</span>
          <h3>${unit.title}<small>${unit.titleZh}</small></h3>
          <p>${unit.goal}</p>
          <div class="kids-unit-tags">${unit.vocabulary.slice(0, 5).map((word) => `<span>${word}</span>`).join("")}</div>
        </div>
        <button class="${done ? "secondary-button" : "primary-button"}" type="button" data-kids-unit="${unit.id}">
          ${done ? "复习单元" : "开始单元"}<span aria-hidden="true">${done ? "✓" : "→"}</span>
        </button>
      </article>`;
  }).join("");
  list.querySelectorAll("[data-kids-unit]").forEach((button) => button.addEventListener("click", () => openKidsUnit(button.dataset.kidsUnit)));
}

function lessonPath(unit) {
  return unit.lessons.map((lesson, index) => `
    <article class="kids-unit-lesson">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><small>${lesson.label}</small><strong>${lesson.title}</strong><p>${lesson.description}</p></div>
    </article>`).join("");
}

function storyLines(unit) {
  return unit.story.lines.map((line) => `
    <p><b>${line.speaker}</b><span>${line.en}</span><small hidden>${line.zh}</small></p>`).join("");
}

function phraseList(unit) {
  return unit.phrases.map((phrase, index) => `
    <li>
      <button class="sound-button" type="button" data-play-unit-phrase="${index}" aria-label="朗读 ${escapeHtml(phrase.en)}">EN</button>
      <div><strong>${phrase.en}</strong><span>${phrase.zh}</span><small>${phrase.usage}</small></div>
    </li>`).join("");
}

function renderUnitShell(unit) {
  const workspace = document.querySelector("#kids-unit-workspace");
  if (!workspace) return;
  workspace.hidden = false;
  workspace.innerHTML = `
    <header class="kids-unit-workspace-header">
      <div>
        <span class="preview-label">UNIT ${unit.number} · 6–9 岁主题单元</span>
        <h2>${unit.title}<small>${unit.titleZh}</small></h2>
        <p>${unit.goal}</p>
      </div>
      <button class="secondary-button" type="button" data-close-kids-unit aria-label="收起单元">收起</button>
    </header>

    <section class="kids-unit-lesson-path" aria-label="五课学习路径">${lessonPath(unit)}</section>

    <div class="kids-unit-content-grid">
      <section class="kids-unit-panel kids-story-panel">
        <div class="kids-unit-panel-head">
          <div><span class="preview-label">故事输入</span><h3>${unit.story.title}</h3></div>
          <div class="kids-unit-panel-actions">
            <button class="primary-button" type="button" data-play-unit-story>▶ 听故事</button>
            <button class="secondary-button" type="button" data-toggle-unit-zh>显示中文</button>
          </div>
        </div>
        <div class="kids-unit-story">${storyLines(unit)}</div>
      </section>

      <section class="kids-unit-panel">
        <span class="preview-label">核心表达</span>
        <h3>Listen and say</h3>
        <ul class="kids-unit-phrases">${phraseList(unit)}</ul>
      </section>

      <section class="kids-unit-panel kids-phonics-panel">
        <span class="preview-label">自然拼读</span>
        <h3>${unit.phonics.sounds.join(" · ")}</h3>
        ${unit.phonics.review ? `<p class="kids-phonics-review">先复习：${unit.phonics.review.join(" · ")}</p>` : ""}
        <div class="kids-sound-row">${unit.phonics.examples.map((example, index) => `<button type="button" data-play-unit-sound="${index}" aria-label="听 ${example.letter} 的例词 ${example.word}"><b>${example.letter}</b><small>${example.word}</small></button>`).join("")}</div>
        <div class="kids-word-row">${unit.phonics.words.map((word) => `<button type="button" data-play-unit-word="${word}">${word}</button>`).join("")}</div>
        <div class="kids-decodable-reader">${unit.phonics.reader.map((line) => `<span>${line}</span>`).join("")}</div>
        <p>${unit.phonics.note}</p>
      </section>

      <section class="kids-unit-panel kids-output-panel">
        <span class="preview-label">分龄输出</span>
        <h3>完成一个真实任务</h3>
        <div class="kids-output-levels">
          <article><small>6–7 岁</small><p>${unit.output.younger}</p></article>
          <article><small>8–9 岁</small><p>${unit.output.older}</p></article>
        </div>
        <button class="secondary-button" type="button" data-play-output-model>▶ 听任务示范</button>
      </section>
    </div>

    <section class="kids-unit-practice">
      <div class="practice-progress">
        <div><span class="preview-label">单元练习</span><h3>听懂、拼读、表达</h3></div>
        <span id="kids-unit-question-position"></span>
      </div>
      <div class="practice-track" id="kids-unit-practice-track" aria-hidden="true"></div>
      <div id="kids-unit-question"></div>
      <div class="check-feedback" id="kids-unit-feedback">完成练习后，再完成上面的口头或书面任务。</div>
    </section>`;
  bindUnitEvents(unit);
  renderUnitQuestion();
  workspace.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindUnitEvents(unit) {
  const workspace = document.querySelector("#kids-unit-workspace");
  workspace.querySelector("[data-close-kids-unit]").addEventListener("click", closeKidsUnit);
  workspace.querySelector("[data-play-unit-story]").addEventListener("click", () => {
    speakSequence(unit.story.lines.map((line) => ({ text: line.en, lang: "en-US", rate: 0.72 })));
  });
  workspace.querySelector("[data-toggle-unit-zh]").addEventListener("click", (event) => {
    const translations = [...workspace.querySelectorAll(".kids-unit-story small")];
    const show = translations.some((node) => node.hidden);
    translations.forEach((node) => { node.hidden = !show; });
    event.currentTarget.textContent = show ? "隐藏中文" : "显示中文";
  });
  workspace.querySelectorAll("[data-play-unit-phrase]").forEach((button) => button.addEventListener("click", () => {
    speak(unit.phrases[Number(button.dataset.playUnitPhrase)].en, { lang: "en-US", rate: 0.72 });
  }));
  workspace.querySelectorAll("[data-play-unit-sound]").forEach((button) => button.addEventListener("click", () => {
    const example = unit.phonics.examples[Number(button.dataset.playUnitSound)];
    speakSequence([
      { text: example.word, lang: "en-US", rate: 0.58 },
      { text: example.word, lang: "en-US", rate: 0.72 },
    ]);
  }));
  workspace.querySelectorAll("[data-play-unit-word]").forEach((button) => button.addEventListener("click", () => {
    speak(button.dataset.playUnitWord, { lang: "en-US", rate: 0.62 });
  }));
  workspace.querySelector("[data-play-output-model]").addEventListener("click", () => {
    speak(unit.output.model, { lang: "en-US", rate: 0.7 });
  });
}

function syncQuestionTrack(unit) {
  const track = document.querySelector("#kids-unit-practice-track");
  track.innerHTML = unit.questions.map((_, index) => `<span class="${index < session.questionIndex ? "is-done" : index === session.questionIndex ? "is-current" : ""}"></span>`).join("");
}

function playQuestionAudio() {
  const question = session.unit.questions[session.questionIndex];
  speak(question.audio, { lang: "en-US", rate: 0.68 });
}

function renderUnitQuestion() {
  const unit = session.unit;
  const question = unit.questions[session.questionIndex];
  document.querySelector("#kids-unit-question-position").textContent = `${session.questionIndex + 1} / ${unit.questions.length}`;
  syncQuestionTrack(unit);
  document.querySelector("#kids-unit-question").innerHTML = `
    <div class="kids-question-head">
      <span>${question.skill}</span>
      <button class="secondary-button" type="button" data-play-kids-question>🔊 听一遍</button>
    </div>
    <h3>${question.question}</h3>
    <div class="check-options">${question.options.map((option, index) => `
      <button type="button" data-kids-unit-answer="${index}"><span>${String.fromCharCode(65 + index)}</span><b>${option}</b></button>`).join("")}</div>`;
  document.querySelector("[data-play-kids-question]").addEventListener("click", playQuestionAudio);
  document.querySelectorAll("[data-kids-unit-answer]").forEach((button) => button.addEventListener("click", () => answerUnitQuestion(Number(button.dataset.kidsUnitAnswer))));
}

function answerUnitQuestion(answer) {
  const unit = session.unit;
  const question = unit.questions[session.questionIndex];
  const buttons = [...document.querySelectorAll("[data-kids-unit-answer]")];
  if (buttons.some((button) => button.disabled)) return;
  const correct = answer === question.answer;
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    if (index === answer && !correct) button.classList.add("wrong");
  });
  session.results.push({ skill: question.skill, correct });
  if (!correct) {
    recordMistake({
      source: `少儿主题单元 · ${unit.title}`,
      question: question.question,
      options: question.options,
      answer: question.answer,
      note: question.note,
    });
  }
  const last = session.questionIndex === unit.questions.length - 1;
  document.querySelector("#kids-unit-feedback").innerHTML = `
    <div><strong>${correct ? "回答正确" : "再记一下"}</strong><span>${question.note}</span></div>
    <button class="primary-button" type="button" data-next-kids-question>${last ? "查看学习结果" : "下一题 →"}</button>`;
  document.querySelector("[data-next-kids-question]").addEventListener("click", () => {
    stopSpeaking();
    if (last) renderUnitResult();
    else {
      session.questionIndex += 1;
      renderUnitQuestion();
      document.querySelector("#kids-unit-feedback").textContent = "先听问题，再选择答案。";
    }
  });
}

function renderUnitResult() {
  const unit = session.unit;
  const score = session.results.filter((result) => result.correct).length;
  document.querySelectorAll("#kids-unit-practice-track span").forEach((node) => node.className = "is-done");
  document.querySelector("#kids-unit-question-position").textContent = `${unit.questions.length} / ${unit.questions.length}`;
  document.querySelector("#kids-unit-question").innerHTML = `
    <div class="kids-unit-result">
      <div class="kids-unit-score"><strong>${score}/${unit.questions.length}</strong><span>本次练习</span></div>
      <div>
        <h3>${score === unit.questions.length ? "全部答对，可以完成输出任务了" : "练习完成，错题已经加入复习计划"}</h3>
        <div class="kids-mastery-row">${session.results.map((result) => `<span class="${result.correct ? "is-mastered" : "needs-review"}">${result.skill} ${result.correct ? "✓" : "再练"}</span>`).join("")}</div>
      </div>
    </div>`;
  document.querySelector("#kids-unit-feedback").innerHTML = `
    <label class="kids-output-confirm"><input type="checkbox" data-confirm-kids-output /> 我已经完成上面的口头或书面任务</label>
    <button class="primary-button" type="button" data-complete-kids-unit disabled>${unitIsComplete(unit.id) ? "再次完成单元" : "完成本单元"}</button>`;
  const confirm = document.querySelector("[data-confirm-kids-output]");
  const complete = document.querySelector("[data-complete-kids-unit]");
  confirm.addEventListener("change", () => { complete.disabled = !confirm.checked; });
  complete.addEventListener("click", completeKidsUnit);
}

function completeKidsUnit() {
  const unit = session.unit;
  const key = completionKey(unit.id);
  const firstCompletion = !state.completedLessons.has(key);
  state.completedLessons.add(key);
  setCsvSet(KEYS.completedLessons, state.completedLessons);
  if (firstCompletion) recordWeekActivity(1);
  updateDashboard();
  renderUnitCards();
  document.querySelector("#kids-unit-feedback").innerHTML = `<div class="kids-unit-complete"><strong>单元完成 ✓</strong><span>下一次学习时先复习本单元，再进入新内容。</span></div>`;
  showToast(firstCompletion ? "少儿主题单元已完成，进度已保存" : "本次复习已完成");
  speak("太棒了，这个主题单元完成了。", { lang: "zh-CN", rate: 0.95 });
}

function openKidsUnit(unitId) {
  const unit = kidsUnitById(unitId);
  if (!unit) return;
  stopSpeaking();
  session.unit = unit;
  session.questionIndex = 0;
  session.results = [];
  renderUnitShell(unit);
}

function closeKidsUnit() {
  stopSpeaking();
  const workspace = document.querySelector("#kids-unit-workspace");
  workspace.hidden = true;
  workspace.innerHTML = "";
  session.unit = null;
  document.querySelector("#kids-course-path")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function renderKidsCoursePath(visible) {
  const section = document.querySelector("#kids-course-path");
  if (!section) return;
  section.hidden = !visible;
  if (!visible) {
    const workspace = document.querySelector("#kids-unit-workspace");
    if (workspace) {
      workspace.hidden = true;
      workspace.innerHTML = "";
    }
    session.unit = null;
    return;
  }
  const release = document.querySelector("#kids-course-release");
  if (release) release.textContent = `先行单元 ${kidsCourseUnits.length} / 12`;
  renderUnitCards();
}
