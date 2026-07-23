import { showToast } from "./ui.js";
import { BACKUP_VERSION, clearLinguaEntries, collectLinguaEntries } from "./persist.js";

export function exportProgress() {
  const payload = {
    app: "lingua-english",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: collectLinguaEntries(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `lingua-progress-${stamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("学习进度已导出");
}

async function importProgressFile(file) {
  const text = await file.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    showToast("文件不是有效的 JSON");
    return;
  }
  if (!payload || payload.app !== "lingua-english" || !payload.data || typeof payload.data !== "object") {
    showToast("这不是 Lingua 进度备份文件");
    return;
  }
  const entries = Object.entries(payload.data).filter(([key, value]) => key.startsWith("lingua") && typeof value === "string");
  if (!entries.length) {
    showToast("备份里没有可导入的进度");
    return;
  }
  const confirmed = window.confirm(`将导入 ${entries.length} 条本地记录，并覆盖当前浏览器中的 Lingua 进度。是否继续？`);
  if (!confirmed) return;
  clearLinguaEntries();
  entries.forEach(([key, value]) => localStorage.setItem(key, value));
  showToast("进度已导入，正在刷新…");
  setTimeout(() => window.location.reload(), 600);
}

export function initBackup() {
  document.querySelector("[data-export-progress]")?.addEventListener("click", exportProgress);
  const input = document.querySelector("[data-import-progress]");
  input?.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      await importProgressFile(file);
    } catch {
      showToast("导入失败，请重试");
    } finally {
      input.value = "";
    }
  });
}
