# Lingua 发布说明

Lingua 当前是无后端、无第三方运行时依赖的静态网站。用户的等级、课程完成情况和练习记录只保存在当前浏览器中。

生产站点域名：**https://www.learningtoday.top/**（源码中的 `sitemap.xml` / `robots.txt` 已按此填写）。

## 发布前

```bash
npm run check
npm run dev
```

在桌面端和手机端各完成一次以下流程：

1. 完成入学测试，确认推荐等级、分龄课程和个性化路径一致。
2. 查看课程知识地图，完成一节包含导入、输入、练习、输出和复习的标准短课。
3. 故意答错一道题，确认错题进入错题本；完成一次正确复习后刷新页面，确认下次复习时间仍然存在。
4. 完成一轮词汇间隔复习，并检查听力、阅读和写作反馈；刷新页面确认写作草稿仍然存在。
5. 检查口语录音的开始、停止和回放界面。正式环境必须使用 HTTPS，否则多数浏览器不会开放麦克风。
6. 完成综合单元测试，确认结果页和错题记录正确。
7. 导出进度后再导入，确认等级、错题和周进度仍然存在。
8. 在桌面端和手机端检查所有主要页面没有横向滚动，浏览器控制台没有错误；确认 Service Worker 注册成功。
9. 可选自动化冒烟：`npm run smoke:install` 后执行 `npm run smoke`（Playwright，需本地安装依赖）。

## 静态托管（按平台）

可以部署到 Netlify、Cloudflare Pages、Vercel 或 GitHub Pages。Node.js：**20 或更高**。404 页面：`404.html`（按平台映射）。

| 平台 | 构建命令 | 发布目录 | 安全响应头 |
|------|----------|----------|------------|
| **Vercel**（推荐） | `npm run vercel-build`（由 `vercel.json` 触发） | `public/`（构建生成，已 gitignore） | `vercel.json` → `headers` |
| Netlify / Cloudflare Pages / GitHub Pages | `npm run check` | 仓库根目录 `.` | Netlify 读 `_headers`；其他平台需手动对齐 |

通用安全头要求（与 `_headers` / `vercel.json` / 本地 `scripts/dev-server.mjs` 一致）：CSP、Permissions-Policy、Referrer-Policy、X-Content-Type-Options；并保留 `media-src 'self' blob:`、`microphone=(self)`、`worker-src 'self'`。

**不要**在生产环境运行 `scripts/dev-server.mjs`；也**不要**配置 Start / Dev Command。Framework 选 **Other**（或不选框架）。

### 为何 Vercel 用 `public/`

`@vercel/static-build` 会执行 `package.json` 的 `vercel-build`：

1. `npm run check` — 语法、数据门禁、核心单测
2. `node scripts/stage-static.mjs` — 把 `index.html`、`app.js`、`js/`、`data/` 等拷到 `public/`

`vercel.json` 中 `distDir: "public"`，CDN 只托管该目录。本地 `public/` 仅为构建产物，**以源码目录为准**，修改后需重新部署（或本地再跑一次 `npm run vercel-build`）才会更新产物。

若 Dashboard 里手动覆盖了 Build / Output，请改回与仓库 `vercel.json` 一致，否则可能再次出现把项目当 Serverless 解析导致的 500。

### Vercel（推荐与 GitHub 联动）

1. 在 [Vercel Dashboard](https://vercel.com/new) 导入仓库 [wangjianlong0405/learnEnglish](https://github.com/wangjianlong0405/learnEnglish)。
2. **Framework Preset**：Other。
3. **Root Directory**：`.`。
4. 安装与构建以仓库 `vercel.json` 为准（勿在 UI 里填冲突的 Build / Output / Start）：
   - Install：`npm ci`
   - Build：`vercel-build` → `check` + 暂存到 `public/`
   - Output：`public`
5. 部署完成后访问 `*.vercel.app`；应用使用 hash 路由（如 `/#words`），入口始终为 `/`。
6. 绑定自定义域名 `www.learningtoday.top`（及必要时根域跳转）后，确认 HTTPS 强制开启。

### Netlify / 其他平台

- 构建命令：`npm run check`
- 发布目录：`.`（根目录，这样 `_headers` 才会生效）
- 勿使用 `public/` 作为发布目录，除非自行把 `_headers` 一并拷入并调整平台配置

## 正式域名上线后

1. 强制启用 HTTPS（PWA 与麦克风都需要）。
2. 在托管平台绑定 `www.learningtoday.top`（及根域重定向策略）。
3. 确认 `sitemap.xml` 的 `<loc>` 与 `robots.txt` 的 `Sitemap` 指向同一正式域名。
4. 确认平台已使用 `404.html`，并配置可用性监控。
5. 如果增加账号、云端同步、录音上传或数据分析，必须先更新隐私政策并提供数据删除方式。

## 当前产品边界

- 不包含注册、登录或自动云同步；可通过页脚导出/导入 JSON 备份进度。
- 不保存姓名或邮箱；口语录音仅在当前页面内存中临时播放，不上传、不跨会话保存。
- 水平测试和等级标准用于课程推荐，不是正式 CEFR 证书或考试成绩。
- 浏览器语音质量取决于用户设备所提供的英语语音。
- 离线可用范围为已缓存的静态页面与资源，首次访问仍需联网。
