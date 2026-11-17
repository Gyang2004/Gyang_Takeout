# Gyang_Takeout

一个从零开始搭建的外卖平台（Takeout）学习型项目，完整记录从环境搭建到前后端联调的过程。

## 项目目标

1. 增长开发经验
2. 提高业务分析能力
3. 提高接口设计能力
4. 提高代码调试能力
5. 提高文档阅读能力
6. 提高编码能力

## 技术栈

| 层 | 选型 | 状态 |
|---|---|---|
| 前端 | Vue 3 + Vite + Element Plus + Vue Router + Pinia + Axios | 工程已初始化（JavaScript，登录闭环待验收） |
| 后端 | Spring Boot 2.7.3 + Maven 多模块（sky-commons / sky-pojo / sky-server）+ MyBatis | 已有代码 |
| 数据库 | MySQL 8.x | 本地待搭建 |
| 部署 | Nginx（静态托管 + 反向代理） | 本地已配置 |

## 当前进度

- [x] Git 仓库初始化与提交规范 — [p1](<notes/p1_项目初始化管理（git仓库).md>)
- [ ] 软件开发整体了解 — [p2](notes/p2_软件开发整体了解.md)
- [ ] 环境搭建：前端 → 后端 → 数据库 → 联调 — [p3](notes/p3环境搭建.md)
- [ ] 前端重写：用 Vue 3 + Element Plus（JavaScript）重构现有全部页面 — 工程初始化 + 登录闭环（待验收），见 [p3 前端开发记录](notes/p3_前端开发记录.md)

## 目录结构

```
Gyang_Takeout/
├── frontend/   # 前端源码（Vue 3 + Vite + Element Plus）
├── backend/    # 后端 Spring Boot 多模块
├── nginx/      # Nginx 运行目录（conf/ 配置，html/ 旧前端产物，作重构参考）
├── docs/       # 接口文档、Swagger / OpenAPI
├── notes/      # 各阶段开发记录
└── README.md   # 项目总览（本文件）
```

## 本地运行（待验证）

| 服务 | 地址 | 说明 |
|---|---|---|
| 后端 | http://localhost:8080 | Spring Boot，默认 `dev` 配置 |
| 前端 dev server | http://localhost:5173 | Vite（`npm run dev`），`/api` 代理到 8080 |
| Nginx（旧产物） | http://localhost | 静态托管旧前端 + `/api` 反向代理 |
| 接口文档 | http://localhost:8080/doc.html | Knife4j，启动后验证 |

> 本地配置：`application-dev.example.yml` → `application-dev.yml`（数据库连接）；`application-secret.example.yml` → `application-secret.yml`（JWT 密钥）。两者都已被 `.gitignore` 忽略，真实口令/密钥不入库。`application.yml` 通过 `spring.profiles.active: dev,secret` 加载这两个配置。启动步骤待前后端跑通后补充。

## 部署（规划）

- 前端：`npm run build` 产出 `dist/`，上传到服务器由 Nginx 托管。
- 后端：`mvn package` 打包，服务器运行 jar，连接服务器 MySQL。
- Nginx：`/api/` 反向代理到后端；history 路由配 `try_files`。

## 文档指引

- [docs/README.md](docs/README.md) — 接口文档与 Swagger / OpenAPI 文档
- [notes/README.md](notes/README.md) — 开发过程记录总览（p1、p2、p3…）

## 记录约定

- 每个阶段先在 `notes/` 记录过程：目标 → 步骤（含关键命令/配置）→ 问题与解决 → 结论与下一步。
- 产出文档放 `docs/`：接口说明、Swagger / OpenAPI 规范等。
- 过程记录与结果文档分开维护，避免混在一起。
