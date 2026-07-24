import { releaseRecordingResources } from "./skills.js";
import { bootstrapView } from "./view-bootstrap.js";

const viewTitles = {
  home: "Lingua — 每天进步一点点",
  learning: "标准课堂 — Lingua",
  lessons: "课程知识地图 — Lingua",
  words: "词汇复习 — Lingua",
  phonetics: "音标表 — Lingua",
  grammar: "语法目录 — Lingua",
  skills: "英语能力训练 — Lingua",
  practice: "综合测评与复习 — Lingua",
  assessment: "英语水平测试 — Lingua",
};

let activeViewName = "home";

export function showView(name, options = {}) {
  const { updateHistory = true } = options;
  const previous = activeViewName;
  if (previous === "skills" && name !== "skills") releaseRecordingResources();
  const views = [...document.querySelectorAll("[data-page]")];
  const navItems = [...document.querySelectorAll("[data-view]")];
  const sidebar = document.querySelector(".sidebar");
  const menuButton = document.querySelector(".menu-button");
  const activeView = views.find((view) => view.dataset.page === name);
  if (!activeView) return;
  views.forEach((view) => view.classList.toggle("is-active", view === activeView));
  navItems.forEach((item) => {
    const active = item.dataset.view === name;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  sidebar.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  menuButton?.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (updateHistory && location.hash !== `#${name}`) history.pushState({ view: name }, "", `#${name}`);
  document.title = viewTitles[name] || viewTitles.home;
  activeViewName = name;
  bootstrapView(name);
  requestAnimationFrame(() => activeView?.querySelector("h1")?.focus({ preventScroll: true }));
}

export function syncViewFromLocation() {
  const views = [...document.querySelectorAll("[data-page]")];
  const name = location.hash.slice(1) || "home";
  showView(views.some((view) => view.dataset.page === name) ? name : "home", { updateHistory: false });
}

export function initRouter() {
  const views = [...document.querySelectorAll("[data-page]")];
  const navItems = [...document.querySelectorAll("[data-view]")];
  const sidebar = document.querySelector(".sidebar");
  const menuButton = document.querySelector(".menu-button");

  window.addEventListener("popstate", syncViewFromLocation);
  window.addEventListener("hashchange", syncViewFromLocation);

  navItems.forEach((item) => item.addEventListener("click", () => showView(item.dataset.view)));
  document.querySelectorAll("[data-view-link]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    showView(link.dataset.viewLink);
  }));
  menuButton?.addEventListener("click", () => {
    const open = sidebar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
      sidebar.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!sidebar.classList.contains("is-open")) return;
    if (sidebar.contains(event.target) || menuButton?.contains(event.target)) return;
    sidebar.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });

  return views;
}
