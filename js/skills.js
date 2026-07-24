import { skillMaterials, skillTierForLevel, skillItemList } from "../data/index.js";
import { state } from "./state.js";
import { escapeHtml } from "./utils.js";
import { speak, showToast } from "./ui.js";
import { recordMistake } from "./mistakes.js";
import { analyzeWritingDraft, speakingSelfCheckTips } from "./output-tips.js";

const skillIndex = {
  listening: 0,
  speaking: 0,
  reading: 0,
  writing: 0,
};

function currentTierMaterials() {
  return skillMaterials[skillTierForLevel(state.learnerLevel)];
}

function currentItem(skill) {
  const list = skillItemList(currentTierMaterials(), skill);
  if (!list.length) return null;
  if (skillIndex[skill] >= list.length) skillIndex[skill] = 0;
  return { list, index: skillIndex[skill], item: list[skillIndex[skill]] };
}

function setSkillIndex(skill, index) {
  const list = skillItemList(currentTierMaterials(), skill);
  if (!list.length) return;
  skillIndex[skill] = (index + list.length) % list.length;
  renderSkillPanels();
}

function itemSwitcher(skill, index, total) {
  if (total <= 1) return "";
  return `<div class="skill-item-switcher">
    <button class="secondary-button" type="button" data-skill-prev="${skill}" aria-label="上一篇">←</button>
    <span>材料 ${index + 1} / ${total}</span>
    <button class="secondary-button" type="button" data-skill-next="${skill}" aria-label="下一篇">→</button>
  </div>`;
}

export function renderSkillPanels() {
  const tier = currentTierMaterials();
  const levelLabel = state.learnerLevel === "未测评" ? "基础" : state.learnerLevel;

  const listeningState = currentItem("listening");
  const listening = listeningState.item;
  document.querySelector("#listening-panel").innerHTML = `<div class="skill-workspace"><div class="skill-copy"><span class="skill-label">分级听力 · ${levelLabel}</span>${itemSwitcher("listening", listeningState.index, listeningState.list.length)}<h2>${listening.title}</h2><p>先只听内容并完成问题。如果需要，可以降低语速或在作答后查看原文。</p><div class="audio-controls"><button class="primary-button" type="button" data-play-listening="0.88">▶ 正常语速</button><button class="secondary-button" type="button" data-play-listening="0.68">慢速播放</button><button class="secondary-button" type="button" data-toggle-transcript>显示原文</button></div><div class="reading-passage skill-transcript" hidden>${listening.passage}</div></div><div class="skill-action-card"><span class="preview-label">听力理解</span><h3>${listening.question}</h3><div class="quiz-options">${listening.options.map((option, index) => `<button class="quiz-option" type="button" data-listening-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("")}</div><div class="skill-feedback" id="listening-feedback"></div></div></div>`;

  const speakingState = currentItem("speaking");
  const speaking = speakingState.item;
  document.querySelector("#speaking-panel").innerHTML = `<div class="skill-workspace"><div class="skill-copy"><span class="skill-label">本地口语录音</span>${itemSwitcher("speaking", speakingState.index, speakingState.list.length)}<h2>${speaking.title}</h2><p>${speaking.prompt}</p><div class="audio-controls"><button class="primary-button" type="button" data-start-recording>● 开始录音</button><button class="secondary-button" type="button" data-stop-recording disabled>停止录音</button><button class="secondary-button" type="button" data-toggle-model>查看示范</button></div><p class="record-status" id="record-status">录音只在当前设备中播放，不会上传。</p><audio class="recording-playback" id="recording-playback" controls hidden></audio><div class="skill-local-tips" id="speaking-local-tips" hidden></div></div><div class="skill-action-card"><span class="preview-label">口语自评</span><h3>完成录音后，检查下面三点</h3><div class="writing-checklist"><label><input type="checkbox" /> 我完整回答了问题</label><label><input type="checkbox" /> 我使用了连接词或完整句</label><label><input type="checkbox" /> 我听到了需要改进的发音</label></div><div class="sample-answer" id="speaking-model">${speaking.model}</div></div></div>`;

  const readingState = currentItem("reading");
  const reading = readingState.item;
  document.querySelector("#reading-panel").innerHTML = `<div class="skill-workspace"><div class="skill-copy"><span class="skill-label">分级阅读 · ${levelLabel}</span>${itemSwitcher("reading", readingState.index, readingState.list.length)}<h2>${reading.title}</h2><div class="reading-passage">${reading.passage}</div></div><div class="skill-action-card"><span class="preview-label">阅读理解</span><h3>${reading.question}</h3><div class="quiz-options">${reading.options.map((option, index) => `<button class="quiz-option" type="button" data-reading-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("")}</div><div class="skill-feedback" id="reading-feedback"></div></div></div>`;

  const writingState = currentItem("writing");
  const writing = writingState.item;
  const draftKey = `linguaWritingDraft:${state.learnerLevel}:${writingState.index}`;
  const savedDraft = localStorage.getItem(draftKey) || "";
  document.querySelector("#writing-panel").innerHTML = `<div class="skill-workspace"><div class="skill-copy"><span class="skill-label">过程写作</span>${itemSwitcher("writing", writingState.index, writingState.list.length)}<h2>${writing.title}</h2><p>${writing.prompt}</p><div class="writing-checklist">${writing.checklist.map((item, index) => `<label><input type="checkbox" data-writing-check="${index}" /> ${item}</label>`).join("")}</div></div><div class="skill-action-card"><textarea class="writing-area" id="writing-area" placeholder="Write your response here…">${escapeHtml(savedDraft)}</textarea><div class="writing-meta"><span id="writing-count">0 words</span><span>建议至少 ${writing.minWords} 词</span></div><div class="audio-controls"><button class="primary-button" type="button" data-check-writing>完成自评</button><button class="secondary-button" type="button" data-show-writing-sample>查看参考答案</button></div><div class="skill-feedback" id="writing-feedback"></div><div class="sample-answer" id="writing-sample">${writing.sample}</div></div></div>`;

  document.querySelectorAll("[data-skill-prev]").forEach((button) => button.addEventListener("click", () => {
    const skill = button.dataset.skillPrev;
    setSkillIndex(skill, skillIndex[skill] - 1);
  }));
  document.querySelectorAll("[data-skill-next]").forEach((button) => button.addEventListener("click", () => {
    const skill = button.dataset.skillNext;
    setSkillIndex(skill, skillIndex[skill] + 1);
  }));

  document.querySelectorAll("[data-play-listening]").forEach((button) => button.addEventListener("click", () => speak(listening.passage, Number(button.dataset.playListening))));
  document.querySelector("[data-toggle-transcript]").addEventListener("click", (event) => {
    const transcript = document.querySelector(".skill-transcript");
    transcript.hidden = !transcript.hidden;
    event.currentTarget.textContent = transcript.hidden ? "显示原文" : "隐藏原文";
  });
  document.querySelectorAll("[data-listening-answer]").forEach((button) => button.addEventListener("click", () => answerSkillQuestion("listening", Number(button.dataset.listeningAnswer))));
  document.querySelectorAll("[data-reading-answer]").forEach((button) => button.addEventListener("click", () => answerSkillQuestion("reading", Number(button.dataset.readingAnswer))));
  document.querySelector("[data-start-recording]").addEventListener("click", startRecording);
  document.querySelector("[data-stop-recording]").addEventListener("click", stopRecording);
  document.querySelector("[data-toggle-model]").addEventListener("click", () => document.querySelector("#speaking-model").classList.toggle("is-visible"));
  const writingArea = document.querySelector("#writing-area");
  const updateWritingCount = () => {
    const count = writingArea.value.trim() ? writingArea.value.trim().split(/\s+/).length : 0;
    document.querySelector("#writing-count").textContent = `${count} words`;
    localStorage.setItem(draftKey, writingArea.value);
  };
  writingArea.addEventListener("input", updateWritingCount);
  updateWritingCount();
  document.querySelector("[data-check-writing]").addEventListener("click", () => {
    const count = writingArea.value.trim() ? writingArea.value.trim().split(/\s+/).length : 0;
    const checks = [...document.querySelectorAll("[data-writing-check]")].filter((item) => item.checked).length;
    const tips = analyzeWritingDraft(writingArea.value, writing);
    const base = count >= writing.minWords && checks === writing.checklist.length
      ? "已完成字数和结构检查。建议朗读一遍，继续修改不自然的句子。"
      : `当前 ${count} 词、完成 ${checks}/${writing.checklist.length} 项检查，请继续完善后再提交。`;
    document.querySelector("#writing-feedback").innerHTML = `<p>${base}</p><ul class="skill-tip-list">${tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>`;
  });
  document.querySelector("[data-show-writing-sample]").addEventListener("click", () => document.querySelector("#writing-sample").classList.toggle("is-visible"));
}

function answerSkillQuestion(skill, answer) {
  const { item: material, list, index } = currentItem(skill);
  const selector = skill === "listening" ? "[data-listening-answer]" : "[data-reading-answer]";
  const feedback = document.querySelector(`#${skill}-feedback`);
  const buttons = [...document.querySelectorAll(selector)];
  buttons.forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === material.answer) button.classList.add("correct");
    if (optionIndex === answer && answer !== material.answer) button.classList.add("wrong");
  });
  if (answer !== material.answer) {
    recordMistake({
      source: skill === "listening" ? "听力训练" : "阅读训练",
      question: material.question,
      options: material.options,
      answer: material.answer,
      note: material.note,
    });
  }
  const nextHint = list.length > 1 && index < list.length - 1
    ? ` <button class="secondary-button" type="button" data-skill-next-inline="${skill}">下一篇 →</button>`
    : list.length > 1
      ? ` <button class="secondary-button" type="button" data-skill-next-inline="${skill}">换一篇 →</button>`
      : "";
  feedback.innerHTML = `${answer === material.answer ? `回答正确。${material.note}` : `正确答案是“${material.options[material.answer]}”。${material.note}`}${nextHint}`;
  feedback.querySelector("[data-skill-next-inline]")?.addEventListener("click", () => {
    setSkillIndex(skill, skillIndex[skill] + 1);
    showToast("已切换到下一份材料");
  });
}

async function startRecording() {
  const status = document.querySelector("#record-status");
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    status.textContent = "当前浏览器不支持本地录音，请使用最新版 Chrome、Edge 或 Safari。";
    return;
  }
  try {
    state.recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordedChunks = [];
    state.mediaRecorder = new MediaRecorder(state.recordingStream);
    state.mediaRecorder.addEventListener("dataavailable", (event) => { if (event.data.size) state.recordedChunks.push(event.data); });
    state.mediaRecorder.addEventListener("stop", () => {
      if (state.recordingUrl) URL.revokeObjectURL(state.recordingUrl);
      state.recordingUrl = URL.createObjectURL(new Blob(state.recordedChunks, { type: state.mediaRecorder.mimeType || "audio/webm" }));
      const playback = document.querySelector("#recording-playback");
      playback.src = state.recordingUrl;
      playback.hidden = false;
      state.recordingStream.getTracks().forEach((track) => track.stop());
      status.textContent = "录音完成。请播放并根据右侧清单进行自评。";
      status.classList.remove("is-recording");
      const prompt = currentItem("speaking")?.item?.prompt || "";
      const tips = speakingSelfCheckTips(prompt);
      const tipBox = document.querySelector("#speaking-local-tips");
      if (tipBox) {
        tipBox.innerHTML = `<strong>本地口语提示</strong><ul class="skill-tip-list">${tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>`;
        tipBox.hidden = false;
      }
      showToast("录音完成，看看下方自评提示");
    });
    state.mediaRecorder.start();
    status.textContent = "正在录音…完成后点击“停止录音”。";
    status.classList.add("is-recording");
    document.querySelector("[data-start-recording]").disabled = true;
    document.querySelector("[data-stop-recording]").disabled = false;
  } catch {
    status.textContent = "无法使用麦克风。请在浏览器设置中允许本站访问麦克风后重试。";
  }
}

function stopRecording() {
  if (state.mediaRecorder?.state === "recording") state.mediaRecorder.stop();
  const startBtn = document.querySelector("[data-start-recording]");
  const stopBtn = document.querySelector("[data-stop-recording]");
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
}

/** Stop mic and release blob URLs when leaving speaking practice. */
export function releaseRecordingResources() {
  if (state.mediaRecorder?.state === "recording") {
    try {
      state.mediaRecorder.stop();
    } catch {
      // ignore
    }
  }
  state.recordingStream?.getTracks().forEach((track) => track.stop());
  state.recordingStream = undefined;
  state.mediaRecorder = undefined;
  state.recordedChunks = [];
  if (state.recordingUrl) {
    URL.revokeObjectURL(state.recordingUrl);
    state.recordingUrl = undefined;
  }
}

export function initSkills() {
  document.querySelectorAll("[data-skill]").forEach((button) => button.addEventListener("click", () => {
    const skill = button.dataset.skill;
    document.querySelectorAll("[data-skill]").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-skill-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.skillPanel === skill));
  }));
}
