import { showToast } from "./ui.js";
import { BACKUP_VERSION, KEYS, clearLinguaEntries, collectLinguaEntries, setString } from "./persist.js";

export function validateBackupPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, message: "这不是 Lingua 进度备份文件" };
  }
  if (payload.app !== "lingua-english" || !payload.data || typeof payload.data !== "object") {
    return { ok: false, message: "这不是 Lingua 进度备份文件" };
  }
  const entries = Object.entries(payload.data).filter(([key, value]) => key.startsWith("lingua") && typeof value === "string");
  if (!entries.length) {
    return { ok: false, message: "备份里没有可导入的进度" };
  }
  const version = Number.isFinite(payload.version) ? payload.version : null;
  let warning = "";
  if (version === null) {
    warning = "备份缺少版本号，将按当前格式尝试导入。";
  } else if (version > BACKUP_VERSION) {
    warning = `备份来自更新版本（v${version}，当前 v${BACKUP_VERSION}），部分字段可能无法识别。`;
  } else if (version < BACKUP_VERSION) {
    warning = `这是旧版备份（v${version}），将按当前格式导入。`;
  }
  return { ok: true, entries, version, warning };
}

function hideBackupNudge() {
  const nudge = document.querySelector("#backup-nudge");
  if (nudge) nudge.hidden = true;
}

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
  setString(KEYS.lastBackupAt, payload.exportedAt);
  hideBackupNudge();
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
  const result = validateBackupPayload(payload);
  if (!result.ok) {
    showToast(result.message);
    return;
  }
  const warnLine = result.warning ? `\n\n${result.warning}` : "";
  const confirmed = window.confirm(`将导入 ${result.entries.length} 条本地记录，并覆盖当前浏览器中的 Lingua 进度。是否继续？${warnLine}`);
  if (!confirmed) return;
  clearLinguaEntries();
  result.entries.forEach(([key, value]) => localStorage.setItem(key, value));
  if (payload.exportedAt && typeof payload.exportedAt === "string") {
    setString(KEYS.lastBackupAt, payload.exportedAt);
  } else {
    setString(KEYS.lastBackupAt, new Date().toISOString());
  }
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
