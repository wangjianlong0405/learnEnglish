import { courses, levelStandards, agePrograms, lessonChecks, lessonOutputTasks, getCoursePack, adultCourseUnits } from "../data/index.js";
import { state } from "./state.js";
import { showToast, speak, speakSequence, bindSpeakable, speakable, voiceChip, stopSpeaking, looksChinese } from "./ui.js";
import { showView } from "./router.js";
import { recordMistake } from "./mistakes.js";
import { updateDashboard, recordWeekActivity } from "./dashboard.js";
import { KEYS, getString, setCsvSet, setString } from "./persist.js";
import { syncAllTablists } from "./tabs.js";
import { syncKidsModeUi } from "./kids-voice.js";
import { renderWord } from "./word-review.js";
import { escapeHtml } from "./utils.js";
import { renderKidsCoursePath } from "./kids-units.js";

/** In-progress multi-step lesson session. */
const lessonSession = {
  type: null,
  step: 0,
  practiceDone: false,
};

function isKidsMode() {
  return state.selectedAge === "kids";
}

function zh(text) {
  return { text, lang: "zh-CN", rate: 0.95 };
}

function en(text, rate = 0.72) {
  return { text, lang: "en-US", rate };
}

function speakKidsParts(parts) {
  const sequenced = [];
  for (const part of parts) {
    if (!part) continue;
    if (typeof part === "object" && part.text) {
      sequenced.push(part);
      continue;
    }
    const text = String(part);
    if (looksChinese(text)) sequenced.push(zh(text));
    else sequenced.push(en(text));
  }
  return speakSequence(sequenced);
}

function kidsVoiceAutoEnabled() {
  return getString(KEYS.kidsVoiceAuto, "1") !== "0";
}

function setKidsVoiceAuto(enabled) {
  setString(KEYS.kidsVoiceAuto, enabled ? "1" : "0");
}

function practicePack(type) {
  return lessonChecks[state.selectedAge][type];
}

function moduleMeta(type) {
  return agePrograms[state.selectedAge].modules.find((module) => module.type === type);
}

export function renderCourses(level = "A2") {
  const packPanel = document.querySelector("#course-pack");
  if (packPanel) {
    packPanel.hidden = true;
    packPanel.classList.remove("is-visible");
    packPanel.innerHTML = "";
  }
  const standard = levelStandards[level];
  document.querySelector("#standard-grid").innerHTML = `
    <article class="standard-summary"><span>${level}</span><div><h2>${standard.summary}</h2><p>当前等级整体目标</p></div></article>
    <article><small>词汇目标</small><strong>${standard.vocab}</strong></article>
    <article><small>语法范围</small><strong>${standard.grammar}</strong></article>
    <article><small>沟通目标</small><strong>${standard.communication}</strong></article>`;
  document.querySelector("#knowledge-map").innerHTML = standard.nodes.map(([title, description], index) => `
    <article class="knowledge-node ${index === 0 ? "is-current" : ""}">
      <span>${String(index + 1).padStart(2, "0")}</span><div><h3>${title}</h3><p>${description}</p></div>
    </article>`).join("");
  const adultPath = document.querySelector("#adult-course-path");
  const showAdultPath = state.selectedAge === "adults";
  adultPath.hidden = !showAdultPath;
  adultPath.innerHTML = showAdultPath ? `
    <header class="adult-course-path-header">
      <div><span class="section-number">A1-A2 PATHWAY</span><h2>4 个主题单元 · 20 节递进课</h2><p>每个单元的最后一节收束为一次真实听说任务。</p></div>
      <span>约 250 个主动词块</span>
    </header>
    <div class="adult-unit-grid">${adultCourseUnits.map((unit, index) => `
      <article class="adult-unit-card">
        <div class="adult-unit-heading"><span>${String(index + 1).padStart(2, "0")}</span><div><small>${unit.level}</small><h3>${unit.title}</h3><p>${unit.subtitle} · ${unit.goal}</p></div></div>
        <ol>${unit.lessons.map(([courseLevel, title], lessonIndex) => `
          <li><button type="button" data-adult-course-level="${courseLevel}" data-adult-course-title="${title}"><span>${lessonIndex + 1}</span>${title}${lessonIndex === unit.lessons.length - 1 ? "<em>真实任务</em>" : ""}</button></li>`).join("")}</ol>
        <p class="adult-unit-task"><strong>单元任务</strong>${unit.task}</p>
      </article>`).join("")}</div>` : "";
  document.querySelector("#course-list").innerHTML = courses[level].map(([title, description], index) => {
    const pack = getCoursePack(level, title);
    return `
    <article class="course-item">
      <span class="course-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="course-copy"><h3>${title}</h3><p>${description}</p>${pack ? `<em class="course-pack-badge">含完整课包</em>` : ""}</div>
      <div class="course-side">
        <span>${level} · ${12 + index * 4} 分钟</span>
        <button type="button" data-course-title="${title}" data-course-level="${level}">${pack ? "打开课包" : "进入学习"}</button>
      </div>
    </article>`;
  }).join("");

  const openCourse = (courseLevel, courseTitle) => {
    const pack = getCoursePack(courseLevel, courseTitle);
    if (pack) {
      renderCoursePack(pack);
      showToast(`已打开「${courseTitle}」完整课包`);
      return;
    }
    if (state.selectedAge !== "adults") {
      if (courseLevel === "B1" || courseLevel === "B2") state.selectedAge = "exam";
      else if (state.selectedAge === "exam") state.selectedAge = "teens";
    }
    state.selectedTopic = "all";
    renderAgeProgram();
    showView("learning");
    showToast(`已按 ${courseLevel} 难度打开“${courseTitle}”相关内容`);
  };
  document.querySelectorAll("[data-course-title]").forEach((button) => button.addEventListener("click", () => openCourse(button.dataset.courseLevel, button.dataset.courseTitle)));
  document.querySelectorAll("[data-adult-course-title]").forEach((button) => button.addEventListener("click", () => openCourse(button.dataset.adultCourseLevel, button.dataset.adultCourseTitle)));
}

function renderCoursePack(pack) {
  const panel = document.querySelector("#course-pack");
  if (!panel) return;
  const draftKey = `linguaCourseDraft:${pack.level}:${pack.title}`;
  const savedDraft = localStorage.getItem(draftKey) || "";
  panel.hidden = false;
  panel.classList.add("is-visible");
  panel.innerHTML = `
    <header class="lesson-flow-header">
      <div>
        <span class="preview-label">${pack.level} · 主题课包</span>
        <h2>${pack.title}</h2>
        <p>${pack.goal}</p>
      </div>
      <button class="secondary-button" type="button" data-close-course-pack>收起</button>
    </header>
    <div class="course-pack-grid">
      <section class="lesson-stage">
        <small>目标表达</small>
        <ul class="course-phrase-list">${pack.phrases.map((item) => `
          <li>
            <strong>${item.en}</strong>
            <span>${item.zh}</span>
            <button class="sound-button" type="button" data-speak-phrase="${item.en}" aria-label="朗读表达">EN</button>
          </li>`).join("")}</ul>
      </section>
      <section class="lesson-stage">
        <small>情景对话</small>
        <div class="course-dialogue">${pack.dialogue.map((line) => `
          <p><b>${line.speaker}</b> ${line.en}<small>${line.zh}</small></p>`).join("")}</div>
        <button class="lesson-audio" type="button" data-speak-dialogue>◖)) 朗读对话</button>
      </section>
    </div>
    <section class="lesson-stage">
      <small>关键词</small>
      <div class="module-tags">${pack.keywords.map((word) => `<span>${word}</span>`).join("")}</div>
    </section>
    <div class="lesson-check">
      <span class="preview-label">课内练习</span>
      <div id="course-pack-question"></div>
      <section class="lesson-output">
        <span class="preview-label">主动输出</span>
        <p>${pack.outputTask}</p>
        <textarea id="course-pack-output" rows="3" placeholder="在这里完成你的输出任务…">${escapeHtml(savedDraft)}</textarea>
      </section>
      <div class="check-feedback" id="course-pack-feedback">完成 3 道练习后可保存输出草稿到本机。</div>
    </div>`;
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });

  let step = 0;
  const renderStep = () => {
    const check = pack.questions[step];
    document.querySelector("#course-pack-question").innerHTML = `
      <div class="practice-progress"><span>练习 ${step + 1} / ${pack.questions.length}</span></div>
      <h3>${check.question}</h3>
      <div class="check-options">${check.options.map((option, index) => `
        <button type="button" data-pack-answer="${index}"><span>${String.fromCharCode(65 + index)}</span><span>${option}</span></button>`).join("")}</div>`;
    document.querySelectorAll("[data-pack-answer]").forEach((button) => button.addEventListener("click", () => {
      const answer = Number(button.dataset.packAnswer);
      const buttons = [...document.querySelectorAll("[data-pack-answer]")];
      if (buttons.some((item) => item.disabled)) return;
      buttons.forEach((item, index) => {
        item.disabled = true;
        if (index === check.answer) item.classList.add("correct");
        if (index === answer && answer !== check.answer) item.classList.add("wrong");
      });
      const correct = answer === check.answer;
      if (!correct) {
        recordMistake({
          source: `主题课包 · ${pack.title}`,
          question: check.question,
          options: check.options,
          answer: check.answer,
          note: check.note,
        });
      }
      const isLast = step >= pack.questions.length - 1;
      document.querySelector("#course-pack-feedback").innerHTML = `
        <div><strong>${correct ? "回答正确！" : "再记一下这个表达"}</strong><span>${check.note}</span></div>
        ${isLast
          ? `<button class="primary-button" type="button" data-save-pack-output>保存输出草稿</button>`
          : `<button class="primary-button" type="button" data-next-pack>下一题 →</button>`}`;
      document.querySelector("[data-next-pack]")?.addEventListener("click", () => {
        step += 1;
        renderStep();
      });
      document.querySelector("[data-save-pack-output]")?.addEventListener("click", () => {
        const output = document.querySelector("#course-pack-output");
        if (!output.value.trim()) {
          showToast("请先完成输出任务");
          output.focus();
          return;
        }
        localStorage.setItem(draftKey, output.value.trim());
        recordWeekActivity(1);
        showToast("课包练习完成，输出草稿已保存");
      });
    }));
  };
  renderStep();

  panel.querySelector("[data-close-course-pack]").addEventListener("click", () => {
    panel.hidden = true;
    panel.classList.remove("is-visible");
    panel.innerHTML = "";
  });
  panel.querySelectorAll("[data-speak-phrase]").forEach((button) => button.addEventListener("click", () => {
    speak(button.dataset.speakPhrase, { lang: "en-US", rate: 0.72 });
  }));
  panel.querySelector("[data-speak-dialogue]").addEventListener("click", () => {
    speakSequence(pack.dialogue.map((line) => ({ text: line.en, lang: "en-US", rate: 0.72 })));
  });
}

export function recommendedCourseLevel() {
  return levelStandards[state.learnerLevel] ? state.learnerLevel : "A2";
}

export function syncRecommendedCourseLevel() {
  const level = recommendedCourseLevel();
  document.querySelectorAll("[data-level]").forEach((tab) => {
    const active = tab.dataset.level === level;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  renderCourses(level);
  syncAllTablists(document.querySelector("#lessons"));
}

export function renderAgeProgram() {
  const program = agePrograms[state.selectedAge];
  const completedCount = program.modules.filter((module) => state.completedLessons.has(`${state.selectedAge}:${module.type}`)).length;
  const kids = isKidsMode();
  document.querySelectorAll("[data-age]").forEach((button) => {
    const active = button.dataset.age === state.selectedAge;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-topic]").forEach((button) => button.classList.toggle("is-active", button.dataset.topic === state.selectedTopic));
  document.querySelector("#stage-level").textContent = program.level;
  document.querySelector("#learning")?.classList.toggle("kids-voice-mode", kids);

  const voiceBar = kids ? `
    <div class="kids-voice-bar" id="kids-voice-bar">
      <div>
        <strong>小朋友听一听</strong>
        <p>还不会认字也没关系：点橙色喇叭，就能听到中文说明。</p>
      </div>
      <div class="kids-voice-actions">
        <button class="primary-button" type="button" data-speak-stage>🔊 听本页介绍</button>
        <label class="kids-auto-toggle">
          <input type="checkbox" id="kids-voice-auto" ${kidsVoiceAutoEnabled() ? "checked" : ""} />
          自动朗读题目
        </label>
      </div>
    </div>` : "";

  document.querySelector("#stage-overview").innerHTML = `
    ${voiceBar}
    <div class="stage-overview-copy">
      <div><h2 class="${kids ? "speakable" : ""}">${program.title}${kids ? voiceChip("听") : ""}</h2>
      <p class="${kids ? "speakable" : ""}">${program.description}${kids ? voiceChip("听") : ""}</p></div>
      <div class="stage-plan">
        <span><strong>${program.pace[0]}</strong><small>${program.pace[1]}</small></span>
        <span><strong>${program.goal[0]}</strong><small>${program.goal[1]}</small></span>
        <span><strong data-completed-count>${completedCount}/3</strong><small>短课完成</small></span>
      </div>
    </div>`;

  const visibleModules = state.selectedTopic === "all" ? program.modules : program.modules.filter((module) => module.type === state.selectedTopic);
  document.querySelector("#learning-modules").innerHTML = visibleModules.map((module) => {
    const steps = practicePack(module.type).length;
    const done = state.completedLessons.has(`${state.selectedAge}:${module.type}`);
    return `
    <article class="learning-module ${done ? "is-complete" : ""} ${kids ? "kids-module" : ""}">
      <div class="module-top"><span class="module-icon ${module.type}">${module.icon}</span><span class="module-count">${steps} 题练习</span></div>
      <h3 class="${kids ? "speakable" : ""}">${module.title}${kids ? voiceChip("听") : ""}</h3>
      <p class="${kids ? "speakable" : ""}">${module.description}${kids ? voiceChip("听") : ""}</p>
      <div class="module-tags">${module.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <div class="module-actions">
        ${kids ? `<button class="secondary-button" type="button" data-listen-module="${module.type}">🔊 听课前说明</button>` : ""}
        <button type="button" data-module="${module.type}">${done ? "复习短课" : "开始短课"} <span>${done ? "✓" : "→"}</span></button>
      </div>
    </article>`;
  }).join("");

  document.querySelector("#lesson-preview").classList.remove("is-visible");
  renderKidsCoursePath(kids && state.selectedTopic === "all");
  document.querySelectorAll("[data-module]").forEach((button) => button.addEventListener("click", () => startLesson(button.dataset.module)));
  document.querySelectorAll("[data-listen-module]").forEach((button) => button.addEventListener("click", () => {
    const module = moduleMeta(button.dataset.listenModule);
    if (!module) return;
    speakKidsParts([
      zh(module.title),
      zh(module.description),
      zh("学习重点"),
      ...module.points.map((point) => zh(point)),
      zh("请听英语示例"),
      en(module.example.replaceAll("_", " "), 0.68),
    ]);
  }));
  document.querySelector("[data-speak-stage]")?.addEventListener("click", () => {
    speakKidsParts([
      zh(program.title),
      zh(program.description),
      zh(`建议每次学习 ${program.pace[0]}`),
    ]);
  });
  document.querySelector("#kids-voice-auto")?.addEventListener("change", (event) => {
    setKidsVoiceAuto(event.target.checked);
    showToast(event.target.checked ? "已开启：进入题目会自动朗读" : "已关闭自动朗读，可点喇叭收听");
  });
  bindSpeakable(document.querySelector("#stage-overview"));
  bindSpeakable(document.querySelector("#learning-modules"));
  setString(KEYS.age, state.selectedAge);
  syncKidsModeUi();
  updateDashboard();
  syncAllTablists(document.querySelector("#learning"));
}

function startLesson(type) {
  lessonSession.type = type;
  lessonSession.step = 0;
  lessonSession.practiceDone = false;
  renderLessonShell();
  renderPracticeStep();
}

function renderLessonShell() {
  const type = lessonSession.type;
  const module = moduleMeta(type);
  const pack = practicePack(type);
  const lessonKey = `${state.selectedAge}:${type}`;
  const kids = isKidsMode();
  const preview = document.querySelector("#lesson-preview");
  preview.innerHTML = `
    <header class="lesson-flow-header">
      <div>
        <span class="preview-label">${module.label} · 标准短课</span>
        <h2 class="${kids ? "speakable" : ""}">${module.title}${kids ? voiceChip("听") : ""}</h2>
      </div>
      <div class="lesson-flow-steps"><span>1 导入</span><span>2 输入</span><span>3 练习</span><span>4 输出</span><span>5 复习</span></div>
    </header>
    ${kids ? `<div class="kids-lesson-tip speakable">听不懂汉字？点橙色喇叭，或打开自动朗读题目。${voiceChip("听")}</div>` : ""}
    <div class="lesson-teach">
      <section class="lesson-stage">
        <small>01 · 情景导入</small>
        <p class="${kids ? "speakable" : ""}">${module.description}${kids ? voiceChip("听") : ""}</p>
      </section>
      <section class="lesson-stage">
        <small>02 · 知识输入</small>
        <div class="lesson-example">${module.example}</div>
        <div class="lesson-audio-row">
          <button class="lesson-audio" type="button" data-speak-example>◖)) 朗读英语示例</button>
          ${kids ? `<button class="lesson-audio lesson-audio-zh" type="button" data-speak-intro>🔊 听中文说明</button>` : ""}
        </div>
      </section>
      <div class="lesson-points">${module.points.map((point) => (
        kids
          ? `<span class="speakable">${point}${voiceChip("听")}</span>`
          : `<span>${point}</span>`
      )).join("")}</div>
    </div>
    <div class="lesson-check">
      <div class="practice-progress">
        <span class="preview-label">03 · 控制练习</span>
        <span id="practice-step-label">练习 1 / ${pack.length}</span>
      </div>
      <div class="practice-track" id="practice-track" aria-hidden="true">${pack.map((_, index) => `<span data-practice-dot="${index}"></span>`).join("")}</div>
      <div id="practice-question"></div>
      <section class="lesson-output">
        <span class="preview-label">04 · 主动输出</span>
        <p class="${kids ? "speakable" : ""}">${(lessonOutputTasks[state.selectedAge] || lessonOutputTasks.kids)[type]}${kids ? voiceChip("听") : ""}</p>
        <textarea id="lesson-output" rows="3" placeholder="${kids ? "家长可帮忙听题，孩子口头说，再一起写下来…" : "在这里完成你的输出任务…"}"></textarea>
      </section>
      <div class="check-feedback" id="check-feedback">${state.completedLessons.has(lessonKey) ? "这节短课已完成，可以再次练习全部题目。" : `完成本课 ${pack.length} 道练习和输出任务后即可记录进度。`}</div>
    </div>`;
  preview.classList.add("is-visible");
  preview.classList.toggle("kids-lesson", kids);
  preview.querySelector("[data-speak-example]").addEventListener("click", () => speak(module.example.replaceAll("_", " "), { lang: "en-US", rate: type === "phonetics" ? 0.62 : 0.72 }));
  preview.querySelector("[data-speak-intro]")?.addEventListener("click", () => {
    speakKidsParts([
      zh("情景导入"),
      zh(module.description),
      zh("学习重点"),
      ...module.points.map((point) => zh(point)),
      zh("请听英语示例"),
      en(module.example.replaceAll("_", " "), 0.68),
    ]);
  });
  bindSpeakable(preview);
  preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
  if (kids && kidsVoiceAutoEnabled()) {
    speakKidsParts([zh(module.title), zh(module.description)]);
  }
}

function syncPracticeTrack() {
  document.querySelectorAll("[data-practice-dot]").forEach((dot) => {
    const index = Number(dot.dataset.practiceDot);
    dot.classList.toggle("is-done", index < lessonSession.step || lessonSession.practiceDone);
    dot.classList.toggle("is-current", index === lessonSession.step && !lessonSession.practiceDone);
  });
}

function renderPracticeStep() {
  const type = lessonSession.type;
  const pack = practicePack(type);
  const check = pack[lessonSession.step];
  const kids = isKidsMode();
  document.querySelector("#practice-step-label").textContent = `练习 ${lessonSession.step + 1} / ${pack.length}`;
  syncPracticeTrack();
  document.querySelector("#practice-question").innerHTML = `
    <div class="practice-question-head">
      <h3 class="${kids ? "speakable" : ""}">${check.question}${kids ? voiceChip("听题") : ""}</h3>
      ${kids ? `<button class="secondary-button" type="button" data-replay-question>🔊 再听一遍</button>` : ""}
    </div>
    <div class="check-options">${check.options.map((option, index) => `
      <button type="button" data-lesson-answer="${index}">
        <span>${String.fromCharCode(65 + index)}</span>
        <span class="option-text ${kids ? "speakable" : ""}">${option}${kids ? voiceChip("听") : ""}</span>
      </button>`).join("")}</div>`;
  document.querySelectorAll("[data-lesson-answer]").forEach((button) => button.addEventListener("click", (event) => {
    if (event.target.closest(".voice-chip")) return;
    answerLesson(Number(button.dataset.lessonAnswer));
  }));
  const replay = () => {
    const parts = [
      zh(`第 ${lessonSession.step + 1} 题`),
      zh(check.question),
    ];
    check.options.forEach((option, index) => {
      const letter = String.fromCharCode(65 + index);
      parts.push(zh(`选项 ${letter}`));
      parts.push(looksChinese(option) ? zh(option) : en(option, 0.7));
    });
    speakKidsParts(parts);
  };
  document.querySelector("[data-replay-question]")?.addEventListener("click", replay);
  bindSpeakable(document.querySelector("#practice-question"));
  if (kids && kidsVoiceAutoEnabled()) replay();
}

function answerLesson(answer) {
  const type = lessonSession.type;
  const pack = practicePack(type);
  const check = pack[lessonSession.step];
  const kids = isKidsMode();
  const buttons = [...document.querySelectorAll("[data-lesson-answer]")];
  if (buttons.some((button) => button.disabled)) return;
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === check.answer) button.classList.add("correct");
    if (index === answer && answer !== check.answer) button.classList.add("wrong");
  });
  const correct = answer === check.answer;
  if (!correct) {
    recordMistake({
      source: `${agePrograms[state.selectedAge].title} · ${moduleMeta(type).label}`,
      question: check.question,
      options: check.options,
      answer: check.answer,
      note: check.note,
    });
  }

  const isLast = lessonSession.step >= pack.length - 1;
  const resultTitle = correct ? (isLast ? "本课练习全部完成！" : "回答正确！") : (isLast ? "最后一题可再巩固，练习已完成。" : "继续加油！");
  if (isLast) {
    lessonSession.practiceDone = true;
    syncPracticeTrack();
    document.querySelector("#check-feedback").innerHTML = `
      <div>
        <strong class="${kids ? "speakable" : ""}">${resultTitle}${kids ? voiceChip("听") : ""}</strong>
        <span class="${kids ? "speakable" : ""}">${check.note}${kids ? voiceChip("听") : ""}</span>
      </div>
      <button class="primary-button complete-lesson" type="button" data-complete-lesson>${state.completedLessons.has(`${state.selectedAge}:${type}`) ? "已完成 ✓" : "完成本课"}</button>`;
    document.querySelector("[data-complete-lesson]").addEventListener("click", (event) => completeLesson(event.currentTarget));
    bindSpeakable(document.querySelector("#check-feedback"));
    if (kids && kidsVoiceAutoEnabled()) speakKidsParts([zh(resultTitle), zh(check.note)]);
    return;
  }

  document.querySelector("#check-feedback").innerHTML = `
    <div>
      <strong class="${kids ? "speakable" : ""}">${resultTitle}${kids ? voiceChip("听") : ""}</strong>
      <span class="${kids ? "speakable" : ""}">${check.note}${kids ? voiceChip("听") : ""}</span>
    </div>
    <button class="primary-button" type="button" data-next-practice>下一题 →</button>`;
  document.querySelector("[data-next-practice]").addEventListener("click", () => {
    stopSpeaking();
    lessonSession.step += 1;
    document.querySelector("#check-feedback").innerHTML = kids
      ? speakable(`继续完成剩余练习，还剩 ${pack.length - lessonSession.step} 题。`)
      : `继续完成剩余练习（还剩 ${pack.length - lessonSession.step} 题）。`;
    if (kids) bindSpeakable(document.querySelector("#check-feedback"));
    renderPracticeStep();
  });
  bindSpeakable(document.querySelector("#check-feedback"));
  if (kids && kidsVoiceAutoEnabled()) speakKidsParts([zh(resultTitle), zh(check.note), zh("准备好后，点下一题")]);
}

function completeLesson(button) {
  const type = lessonSession.type;
  if (!lessonSession.practiceDone) {
    showToast("请先完成全部练习题");
    return;
  }
  const output = document.querySelector("#lesson-output");
  if (!output.value.trim()) {
    showToast(isKidsMode() ? "请先完成输出任务：可以说出来，再请家长帮忙写下来" : "请先完成第 4 步主动输出任务");
    output.focus();
    return;
  }
  const lessonKey = `${state.selectedAge}:${type}`;
  state.completedLessons.add(lessonKey);
  setCsvSet(KEYS.completedLessons, state.completedLessons);
  button.textContent = "已完成 ✓";
  button.disabled = true;
  const moduleButton = document.querySelector(`[data-module="${type}"]`);
  moduleButton.closest(".learning-module").classList.add("is-complete");
  moduleButton.innerHTML = "复习短课 <span>✓</span>";
  const completedCount = agePrograms[state.selectedAge].modules.filter((module) => state.completedLessons.has(`${state.selectedAge}:${module.type}`)).length;
  document.querySelector("[data-completed-count]").textContent = `${completedCount}/3`;
  updateDashboard();
  recordWeekActivity(1);
  showToast("短课完成，学习进度已保存！");
  if (isKidsMode()) speak("太棒了，这节短课完成了。", { lang: "zh-CN", rate: 0.95 });
}

export function initLessons() {
  document.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-level]").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    renderCourses(button.dataset.level);
  }));

  document.querySelectorAll("[data-age]").forEach((button) => button.addEventListener("click", () => {
    stopSpeaking();
    state.selectedAge = button.dataset.age;
    renderAgeProgram();
    renderWord();
  }));
  document.querySelectorAll("[data-topic]").forEach((button) => button.addEventListener("click", () => {
    state.selectedTopic = button.dataset.topic;
    renderAgeProgram();
  }));
}
