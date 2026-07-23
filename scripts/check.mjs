import { access, readFile, readdir } from "node:fs/promises";
import {
  agePrograms,
  courses,
  levelStandards,
  placementQuestions,
  unitQuestions,
  words,
  quiz,
  skillMaterials,
  skillTierForLevel,
  recommendPlacementLevel,
  lessonChecks,
  grammarTopics,
} from "../data/index.js";

const appModules = [
  "js/utils.js",
  "js/state.js",
  "js/ui.js",
  "js/router.js",
  "js/srs.js",
  "js/dashboard.js",
  "js/mistakes.js",
  "js/lessons.js",
  "js/word-review.js",
  "js/unit-test.js",
  "js/skills.js",
  "js/placement.js",
  "js/daily-quiz.js",
  "js/pwa.js",
  "js/backup.js",
  "js/grammar-catalog.js",
  "js/persist.js",
  "js/quiz-runner.js",
  "js/view-bootstrap.js",
  "js/tabs.js",
];

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "sw.js",
  "404.html",
  "sitemap.xml",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "scripts/dev-server.mjs",
  "scripts/stage-static.mjs",
  "_headers",
  "vercel.json",
  "playwright.config.js",
  "e2e/smoke.spec.js",
  "e2e/mistakes.spec.js",
  ".github/workflows/ci.yml",
  "data/index.js",
  ...appModules,
];

for (const file of requiredFiles) await access(file);

const [html, css, app, manifestText, server, headers, vercelText, swSource, ...moduleSources] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("styles.css", "utf8"),
  readFile("app.js", "utf8"),
  readFile("site.webmanifest", "utf8"),
  readFile("scripts/dev-server.mjs", "utf8"),
  readFile("_headers", "utf8"),
  readFile("vercel.json", "utf8"),
  readFile("sw.js", "utf8"),
  ...appModules.map((file) => readFile(file, "utf8")),
]);

const appSource = [app, ...moduleSources, swSource].join("\n");

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) throw new Error(`Duplicate HTML ids: ${[...new Set(duplicateIds)].join(", ")}`);

const buttonsWithoutType = [...html.matchAll(/<button(?![^>]*\stype=)[^>]*>/g)];
if (buttonsWithoutType.length) throw new Error(`Found ${buttonsWithoutType.length} button(s) without an explicit type`);

const externalAssets = [...html.matchAll(/(?:src|href)="https?:\/\//g)];
if (externalAssets.length) throw new Error("index.html contains external runtime assets");

const moduleCount = Object.values(agePrograms)
  .flatMap((program) => program.modules)
  .filter((module) => ["vocabulary", "phonetics", "grammar"].includes(module.type)).length;
if (moduleCount !== 12) throw new Error(`Expected 12 learning modules, found ${moduleCount}`);

if (placementQuestions.length === 0 || !html.includes('id="assessment"')) {
  throw new Error("Placement assessment is missing");
}

for (const level of ["Pre-A1", "A1", "A2", "B1", "B2"]) {
  if (!courses[level] || !levelStandards[level]) throw new Error(`CEFR standard ${level} is missing`);
}

if (!html.includes('id="skills"') || !appSource.includes("getUserMedia({ audio: true })") || !appSource.includes("linguaWritingDraft")) {
  throw new Error("Listening, speaking, reading, or writing practice is incomplete");
}

if (!["01 · 情景导入", "02 · 知识输入", "03 · 控制练习", "04 · 主动输出", "5 复习"].every((label) => appSource.includes(label))) {
  throw new Error("The five-stage lesson flow is incomplete");
}

const practicePacks = Object.values(lessonChecks).flatMap((age) => Object.values(age));
if (practicePacks.length !== 12 || practicePacks.some((pack) => !Array.isArray(pack) || pack.length !== 3)) {
  throw new Error("Each of the 12 modules must provide a 3-question practice pack");
}

if (!appSource.includes("recordWeekActivity") || !appSource.includes("recordLearningDay") || !appSource.includes("weekDateKeys") || !appSource.includes("linguaWeekLog")) {
  throw new Error("Real weekly progress tracking is incomplete");
}

const mistakesSource = moduleSources[appModules.indexOf("js/mistakes.js")];
if (!mistakesSource.includes("recordWeekActivity")) {
  throw new Error("Mistake review must count toward weekly activity");
}

if (!appSource.includes("renderMultipleChoice") || !appSource.includes("quiz-runner.js")) {
  throw new Error("Shared quiz runner is missing");
}

if (!appSource.includes("bootstrapView") || !appSource.includes("view-bootstrap.js")) {
  throw new Error("Lazy view bootstrap is missing");
}

if (!appSource.includes("collectLinguaEntries") || !appSource.includes("KEYS")) {
  throw new Error("Central persist layer is missing");
}

if (!swSource.includes("SKIP_WAITING") || !appSource.includes("update-banner")) {
  throw new Error("Service worker update prompt is incomplete");
}

if (!appSource.includes("initTablists") || !appSource.includes("tabs.js")) {
  throw new Error("Tab keyboard navigation is incomplete");
}

if (appSource.includes("state.learningDays.add(localDateKey(new Date()))")) {
  throw new Error("Learning streak must not increment on page load alone");
}

if (!appSource.includes("data-next-practice") || !appSource.includes("practice-track")) {
  throw new Error("Multi-step lesson practice UI is incomplete");
}

if (!html.includes('id="grammar"') || !html.includes("data-grammar-topic") && !appSource.includes("data-grammar-topic") || !appSource.includes("grammarTopics")) {
  throw new Error("Grammar catalog page is incomplete");
}

if (grammarTopics.length < 10 || grammarTopics.some((topic) => !Array.isArray(topic.questions) || topic.questions.length < 2)) {
  throw new Error("Expected at least 10 grammar topics with 2+ practice questions each");
}

const unitQuestionCount = unitQuestions.length;
if (unitQuestionCount !== 16) throw new Error(`Expected 16 unit-test questions, found ${unitQuestionCount}`);

if (placementQuestions.length !== 12) throw new Error(`Expected 12 placement questions, found ${placementQuestions.length}`);

if (words.length < 50) throw new Error(`Expected at least 50 vocabulary items, found ${words.length}`);
if (quiz.length < 12) throw new Error(`Expected at least 12 daily quiz items, found ${quiz.length}`);
if (!skillMaterials.intermediate || skillTierForLevel("A2") !== "intermediate") {
  throw new Error("Intermediate skill tier is missing");
}
if (recommendPlacementLevel(0, 12) !== "Pre-A1" || recommendPlacementLevel(12, 12) !== "B2") {
  throw new Error("Placement level mapping is incorrect");
}

for (const level of ["Pre-A1", "A1", "A2", "B1", "B2"]) {
  if (!courses[level] || courses[level].length < 5) throw new Error(`Expected at least 5 courses for ${level}`);
}

if (!appSource.includes("linguaMistakes") || !appSource.includes("SRS_INTERVALS_DAYS = [1, 3, 7, 14, 30]") || !appSource.includes("applySrsResult")) {
  throw new Error("Mistake notebook or unified spaced review is missing");
}

if (!appSource.includes("SRS_FAIL_RETRY_MS = 5 * 60 * 1000")) {
  throw new Error("Shared fail-retry interval for spaced review is missing");
}

for (const policy of ["media-src 'self' blob:", "microphone=(self)", "worker-src 'self'"]) {
  if (!server.includes(policy) || !headers.includes(policy) || !vercelText.includes(policy)) {
    throw new Error(`Security policy is missing: ${policy}`);
  }
}

if (!headers.includes("/sw.js") || !headers.includes("Cache-Control: no-cache")) {
  throw new Error("Service worker cache headers are missing in _headers");
}

if (!vercelText.includes("/sw.js") || !vercelText.includes("no-cache")) {
  throw new Error("Service worker cache headers are missing in vercel.json");
}

JSON.parse(vercelText);
if (!vercelText.includes("@vercel/static-build") || !vercelText.includes("public")) {
  throw new Error("Vercel must deploy public/ via @vercel/static-build");
}

if (!swSource.includes("caches.open") || !appSource.includes("serviceWorker.register") || !app.includes("registerServiceWorker")) {
  throw new Error("PWA service worker registration is incomplete");
}

if (!html.includes("data-export-progress") || !html.includes("data-import-progress") || !appSource.includes("exportProgress")) {
  throw new Error("Progress export/import backup is incomplete");
}

const robots = await readFile("robots.txt", "utf8");
const sitemap = await readFile("sitemap.xml", "utf8");
if (!robots.includes("Sitemap:") || !sitemap.includes("<urlset")) {
  throw new Error("sitemap.xml or robots.txt sitemap declaration is missing");
}

if (!headers.startsWith("/*\n") || headers.trimEnd().endsWith("*/")) {
  throw new Error("_headers is not in valid Netlify header-rule format");
}

if (!css.includes(":focus-visible") || !html.includes("skip-link")) {
  throw new Error("Accessibility focus styles or skip link are missing");
}

if (!html.includes("<noscript>") || !html.includes('name="robots"') || !html.includes('name="twitter:card"')) {
  throw new Error("SEO metadata or JavaScript fallback is missing");
}

const tabCount = [...html.matchAll(/role="tab"/g)].length;
const selectedTabCount = [...html.matchAll(/role="tab" aria-selected="(?:true|false)"/g)].length;
if (tabCount !== selectedTabCount) throw new Error("Every tab needs an initial aria-selected state");

const manifest = JSON.parse(manifestText);
if (!manifest.name || !manifest.start_url || !manifest.icons?.length) {
  throw new Error("Web app manifest is incomplete");
}

const jsFiles = await readdir("js");
if (jsFiles.length < appModules.length) {
  throw new Error(`Expected at least ${appModules.length} app modules in js/, found ${jsFiles.length}`);
}

if (!app.includes("./js/")) {
  throw new Error("app.js should bootstrap feature modules from js/");
}

console.log(`Lingua release check passed: ${ids.length} unique ids, ${moduleCount} learning modules, ${unitQuestionCount} unit-test questions, ${appModules.length} app modules.`);
