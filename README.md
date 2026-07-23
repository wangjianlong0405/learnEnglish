# Lingua 英语学习网站

一个以静态前端为主的响应式英语学习网站（**线上运行无 npm 依赖**；开发可选 Playwright），围绕 CEFR 分级和不同年龄阶段组织完整学习闭环。

主要功能：

- Pre-A1 至 B2 课程知识地图、等级目标和分龄课程
- 入学测试、个性化学习路径和五阶段标准课堂
- 词汇、音标、语法、听力、口语、阅读和写作训练
- 本地口语录音、写作草稿保存和综合单元测试
- 错题本，以及 1、3、7、14、30 天间隔复习计划
- 本地学习进度、连续学习天数和课程完成记录

当前内容规模：约 52 个词汇卡、12 个语法专题、12 题入学测试、16 题单元测、12 题每日小测，各等级至少 5 门课程，以及 foundation / intermediate / advanced 三档能力训练材料。每节分龄短课含 3 道递进练习题与主动输出任务；侧边栏进度按自然周真实累计。

分龄内容覆盖少儿启蒙（6–9 岁）、青少年（10–14 岁）、高中备考（15–18 岁）和成人英语（18+）。

## 启动

```bash
npm run dev
```

然后打开 <http://localhost:4173>。

学习进度、写作草稿和复习计划保存在浏览器的 `localStorage` 中。口语录音只在当前页面内存中播放，不会上传或跨会话保存。

## 代码结构

- `app.js`：启动编排与跨模块事件绑定
- `js/`：功能模块（路由、课堂、词汇间隔复习、能力训练、测评、错题本、PWA、进度备份等）
- `js/persist.js`：localStorage 键名与导出/导入
- `js/quiz-runner.js`：入学测 / 每日小测 / 单元测共用选择题 UI
- `js/view-bootstrap.js`：按视图懒加载首屏以外的页面内容
- `js/tabs.js`：Tab 列表键盘导航（方向键 / Home / End）
- `js/srs.js`：词汇与错题共用的间隔复习算法（1/3/7/14/30 天；失败后 5 分钟重试）
- `sw.js`：Service Worker，缓存静态资源以支持离线打开；新版本可用时提示刷新
- `data/`：课程、测评与练习内容数据
- `e2e/`：Playwright 冒烟与错题流程测试
- `vercel.json`：Vercel 构建命令与安全响应头（与 `_headers` 一致）

页脚可导出 / 导入本地学习进度 JSON，方便换设备备份（仍不上传服务器）。

## 发布前检查

```bash
npm run check    # 语法 + 数据门禁 + 核心单测
npm test         # 仅 SRS / 入学测映射单测
npm run smoke    # Playwright（首次需 npm run smoke:install）
```

GitHub Actions 会在 push/PR 时自动跑 `check` 与 `smoke`（见 `.github/workflows/ci.yml`）。

部署步骤与上线检查清单见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 设计参考

- [British Council LearnEnglish](https://learnenglish.britishcouncil.org/)：分龄与分级学习路径
- [Cambridge English](https://www.cambridgeenglish.org/learning-english/)：按等级和语言技能筛选活动
- [BBC Learning English](https://www.bbc.co.uk/learningenglish)：围绕主题组织短课

本项目仅参考信息架构与学习模式，课程文字、例句和界面均为独立设计。
