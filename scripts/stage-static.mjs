import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "public");

const files = [
  "index.html",
  "app.js",
  "styles.css",
  "sw.js",
  "404.html",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
];

rmSync(out, { recursive: true, force: true });
mkdirSync(out);

for (const file of files) {
  cpSync(join(root, file), join(out, file));
}
cpSync(join(root, "js"), join(out, "js"), { recursive: true });
cpSync(join(root, "data"), join(out, "data"), { recursive: true });

console.log("Staged static site to public/");
