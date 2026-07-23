const CACHE_NAME = "lingua-static-v4";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./favicon.svg",
  "./site.webmanifest",
  "./robots.txt",
  "./404.html",
  "./sitemap.xml",
  "./js/utils.js",
  "./js/state.js",
  "./js/ui.js",
  "./js/router.js",
  "./js/srs.js",
  "./js/dashboard.js",
  "./js/mistakes.js",
  "./js/lessons.js",
  "./js/word-review.js",
  "./js/unit-test.js",
  "./js/skills.js",
  "./js/placement.js",
  "./js/daily-quiz.js",
  "./js/pwa.js",
  "./js/backup.js",
  "./js/grammar-catalog.js",
  "./js/persist.js",
  "./js/quiz-runner.js",
  "./js/view-bootstrap.js",
  "./js/tabs.js",
  "./data/index.js",
  "./data/words.js",
  "./data/curriculum.js",
  "./data/age-programs.js",
  "./data/assessment.js",
  "./data/skills.js",
  "./data/practice.js",
  "./data/grammar.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html").then((cached) => cached || caches.match("./404.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => cached);
    }),
  );
});
