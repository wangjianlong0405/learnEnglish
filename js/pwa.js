let refreshing = false;

function showUpdateBanner(registration) {
  if (document.querySelector(".update-banner")) return;

  const bar = document.createElement("div");
  bar.className = "update-banner";
  bar.setAttribute("role", "status");
  bar.innerHTML = `
    <span>有新版本可用，刷新后即可使用最新内容。</span>
    <button class="primary-button compact-button" type="button" data-apply-update>立即刷新</button>
    <button class="secondary-button compact-button" type="button" data-dismiss-update>稍后</button>`;

  bar.querySelector("[data-apply-update]").addEventListener("click", () => {
    const waiting = registration.waiting;
    if (waiting) waiting.postMessage({ type: "SKIP_WAITING" });
    else window.location.reload();
  });
  bar.querySelector("[data-dismiss-update]").addEventListener("click", () => bar.remove());

  document.body.appendChild(bar);
}

function watchWaitingWorker(registration) {
  if (registration.waiting) showUpdateBanner(registration);

  registration.addEventListener("updatefound", () => {
    const worker = registration.installing;
    if (!worker) return;
    worker.addEventListener("statechange", () => {
      if (worker.state === "installed" && navigator.serviceWorker.controller) {
        showUpdateBanner(registration);
      }
    });
  });
}

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((registration) => {
        watchWaitingWorker(registration);
        if (registration.waiting) showUpdateBanner(registration);
      })
      .catch(() => {
        // Offline install is optional; keep the app usable without it.
      });
  });
}
