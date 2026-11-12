---
title: 内容更新与网站发布
description: 如何维护公开指南、预览页面，并通过 GitHub Pages 自动发布。
---

# 内容更新与网站发布

本站由 Markdown 文档和 Vue 页面组成，使用 VitePress 生成静态网站，再交给 GitHub Pages 发布。**日常修改文字通常只需要编辑文档。**

## 这是一个公开站点

本站及 `gitops-gateway` 说明代码仓库公开。关联的基础设施仓库保持私有，阅读它们需要另外取得权限。

公开内容可以包括体系原理、职责、申请步骤、词语解释和仓库链接。真实地址、组织层级、账号标识、权限明细、部署位置、内部日志和业务数据应留在私有仓库。

本仓库的提交历史、Issue、PR、附件和 Actions 日志也是公开内容。改稿前就要排除内部细节，不能先提交再删除；不要通过公开 Issue 收集真实的资源申请。

## 什么变化需要更新本站？

- 新增仓库、仓库改名，或职责发生变化。
- 申请入口、所需材料和办理步骤发生变化。
- 共用能力正式落地，通用说明需要调整。
- 网站导航、搜索或发布方式需要更新。

更新时同步核对 README、指南和首页。详细执行状态由私有仓库记录，不在本站复制内部配置快照。

## 内容放在哪里？

| 位置 | 内容 |
| --- | --- |
| `README.md` | GitHub 仓库首页的公开介绍 |
| `docs/guide/start.md` | 新手如何办理一次申请 |
| `docs/guide/requests.md` | 办事步骤和申请模板 |
| `docs/guide/architecture.md` | 运行机制、仓库关系和设计原因 |
| `docs/guide/repositories.md` | 仓库职责和访问入口 |
| `docs/guide/network.md` | 地址申请原则 |
| `docs/guide/glossary.md` | 常见词语解释 |
| `docs/.vitepress/theme/data.ts` | 首页办事导航和仓库卡片内容 |
| `docs/.vitepress/theme/components/` | 首页、办事切换和体系图 |
| `docs/.vitepress/theme/style.css` | 页面样式和手机适配 |
| `docs/.vitepress/config.mts` | 导航、搜索和网站路径配置 |
| `.github/workflows/pages.yml` | 构建检查与发布流程 |

## 保持说明容易理解

先写“去哪里、准备什么、下一步做什么”，再解释机制。首次出现的技术词应附简短说明。举例使用“某个业务团队”等通用场景，不复制真实组织关系或内部数据。

网站只提供公开说明。具体业务申请仍在对应的私有仓库中办理。

## 在本地预览

使用 Node.js 22 或更新版本，在仓库根目录运行：

```sh
npm ci
npm run docs:dev
```

打开终端输出的地址，访问 `/gitops-gateway/` 路径。保存文档后，开发页面会自动更新。

提交前检查正式构建：

```sh
npm run docs:build
npm run docs:preview
```

构建会检查文档内部链接。浏览器中还应核对所改页面、办事切换、搜索和手机显示。

生成的 `docs/.vitepress/dist/`、`cache/` 和 `.temp/` 不应提交到 Git。修改公开范围后，清理旧构建文件再生成，检查最终页面、脚本和搜索索引，避免残留旧内容。

## 发布前检查内容

`npm run docs:build` 会在构建前后运行公开内容检查，拦截部分常见内部地址和云账号标识。它是辅助检查，不能代替人工阅读。

至少确认：

- 没有真实地址范围、组织树、账号标识或资源标识。
- 没有内部截图、日志、配置文件或凭证。
- 业务仓库链接仍指向私有仓库，没有把其内容复制进本站。
- README、页面、首页组件和搜索内容的公开范围一致。

## GitHub Pages 配置 {#pages}

本站公开发布，网址为 `https://shrealin.github.io/gitops-gateway/`。VitePress 的 `base` 已配置为 `/gitops-gateway/`。

首次设置时，在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。随后查看 **Actions → Build and deploy documentation** 的结果。

| 操作 | 网站工作流行为 |
| --- | --- |
| 向 `main` 提交 PR | 检查公开内容并构建，不发布预览站 |
| 合并到 `main` | 检查、构建并发布到 GitHub Pages |
| 在 `main` 手动运行网站工作流 | 检查并重新发布当前内容 |
| 在其他分支手动运行 | 只构建，不发布 |

发布使用 GitHub 提供的临时身份，不需要设置长期部署密钥。发布成功后，可以在 `github-pages` 部署记录中打开网站。

## 依赖维护

使用 `package-lock.json` 和 `npm ci` 保持本地与自动构建的依赖一致。VitePress 使用稳定版 1.6.4；`package.json` 将其 Vite 构建依赖覆盖为包含安全修复的 6.4.6。升级时重新确认是否需要该设置，并验证构建、预览和搜索。

图标使用 `@lucide/vue`，中文字体优先使用系统已有字体。页面不依赖外部字体服务。

## 发布失败时先看哪里？

| 情况 | 检查方式 |
| --- | --- |
| 公开内容检查未通过 | 根据文件位置检查内部信息，删除或改为通用说明 |
| 安装依赖失败 | 核对 Node 版本以及配置与 lockfile 是否一起提交 |
| 构建提示链接不存在 | 检查文件名、路径和页内标题 |
| 配置 Pages 失败 | 确认本站仓库可使用 Pages，来源设置为 GitHub Actions |
| 一直等待发布 | 查看 `github-pages` 环境是否等待审核 |
| 页面 404 或样式丢失 | 核对访问路径、`base` 和成功部署记录中的网址 |
| 更换仓库名或使用自定义域名 | 同步更新 `base`、图标路径和站点地址 |
