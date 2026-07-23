# Lingua 发布说明

Lingua 当前是无后端、无第三方运行时依赖的静态网站。用户的等级、课程完成情况和练习记录只保存在当前浏览器中。

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

## 静态托管

可以部署到 Netlify、Cloudflare Pages、Vercel 或 GitHub Pages。

- 构建命令：`npm run check`
- 发布目录：项目根目录 `.`
- Node.js：20 或更高版本
- 404 页面：`404.html`（按平台映射）

Netlify 会自动读取项目根目录的 `_headers` 安全响应头配置。Vercel 使用根目录的 `vercel.json`（已与 `_headers` / 本地 `scripts/dev-server.mjs` 对齐）。其他平台请在配置中加入相同的 CSP、Permissions-Policy、Referrer-Policy 和 X-Content-Type-Options 响应头，并保留 `media-src 'self' blob:`、`microphone=(self)` 与 `worker-src 'self'`。

### Vercel（推荐与 GitHub 联动）

1. 在 [Vercel Dashboard](https://vercel.com/new) 导入仓库 [wangjianlong0405/learnEnglish](https://github.com/wangjianlong0405/learnEnglish)。
2. **Framework Preset**：Other（或不选框架）。
3. **Root Directory**：`.`（默认即可）。
4. 构建与安装由仓库内 `vercel.json` 指定：
   - Install：`npm ci`
   - Build：`npm run check`（静态门禁，无打包产物）
5. **Output**：静态文件来自仓库根目录，无需额外 Output Directory。
6. 部署完成后访问分配的 `*.vercel.app` 域名；应用使用 hash 路由（如 `/#words`），入口始终为 `/`。
7. 绑定自定义域名后，更新 `sitemap.xml` 中的站点 URL。

说明：生产环境不运行开发服务器（`scripts/dev-server.mjs`）；Vercel 通过 `vercel-build` 将静态资源写入 `public/` 并由 CDN 托管。请在 Vercel 项目设置中 **不要** 填写 Start Command（留空），Framework 选 **Other**。

## 正式域名上线后

1. 强制启用 HTTPS（PWA 与麦克风都需要）。
2. 将真实域名加入站点管理平台。
3. 把 `sitemap.xml` 中的 `https://example.com/` 换成真实域名；`robots.txt` 已声明 Sitemap。
4. 确认平台已使用 `404.html`，并配置可用性监控。
5. 如果增加账号、云端同步、录音上传或数据分析，必须先更新隐私政策并提供数据删除方式。

## 当前产品边界

- 不包含注册、登录或自动云同步；可通过页脚导出/导入 JSON 备份进度。
- 不保存姓名或邮箱；口语录音仅在当前页面内存中临时播放，不上传、不跨会话保存。
- 水平测试和等级标准用于课程推荐，不是正式 CEFR 证书或考试成绩。
- 浏览器语音质量取决于用户设备所提供的英语语音。
- 离线可用范围为已缓存的静态页面与资源，首次访问仍需联网。
