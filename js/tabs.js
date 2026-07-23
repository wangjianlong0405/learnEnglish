/** WAI-ARIA tablist keyboard support (roving tabindex). */
export function syncTablist(tablist) {
  if (!tablist) return;
  tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
  });
}

function focusTab(tabs, index) {
  const tab = tabs[index];
  if (!tab) return;
  tab.focus();
  tab.click();
}

function onTabKeydown(event, tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const current = tabs.indexOf(event.currentTarget);
  if (current < 0) return;

  let next = current;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      next = (current + 1) % tabs.length;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      next = (current - 1 + tabs.length) % tabs.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = tabs.length - 1;
      break;
    default:
      return;
  }
  event.preventDefault();
  focusTab(tabs, next);
}

export function initTablists(root = document) {
  root.querySelectorAll('[role="tablist"]').forEach((tablist) => {
    syncTablist(tablist);
    tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.addEventListener("keydown", (event) => onTabKeydown(event, tablist));
      tab.addEventListener("click", () => syncTablist(tablist));
    });
  });
}

export function syncAllTablists(root = document) {
  root.querySelectorAll('[role="tablist"]').forEach((tablist) => syncTablist(tablist));
}
