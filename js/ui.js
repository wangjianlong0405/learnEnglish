let toastTimer;

export function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

export function speak(text, rate = 0.88) {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器暂不支持语音播放");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
}
