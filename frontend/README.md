# Gyang Takeout 管理端

Vue 3 + Vite + Element Plus + JavaScript 的管理端前端。开发方案见
[docs/p3/前端重构方案.md](../docs/p3/前端重构方案.md)。

## 运行

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173，/api 代理到 http://localhost:8080/admin
npm run build      # 产物在 dist/，生产构建不生成 sourcemap
npm run lint
```

登录需要后端 `EmployeeController`（`POST /admin/employee/login`）与本地 MySQL 已启动。

## 模块进度

| 模块 | 内容 | 状态 |
|---|---|---|
| 1 | 工程初始化 + 登录闭环（路由守卫、401、退出） | ✅ 验收通过（构建/Lint/登录全链路/1280·1440 视觉）；本地 MySQL 口令见 [开发记录 §4.4](../notes/p3_前端开发记录.md) |
| 2 | 布局、侧边栏、面包屑、404、未实现页面占位 | 已实现，待验收（构建/浏览器） |
| 3 | 员工管理 | 等后端 CRUD |
| 4 | 分类 → 菜品 → 套餐 | 等后端 |
| 5 | 订单管理 | 等后端 |
| 6 | 工作台与数据统计 | 等后端 report |

原则：没有真实接口的页面不开工；每完成一个模块，验收通过后再进入下一个模块。

## 目录约定

```
src/
├── api/        # 一个接口一个函数，只拼路径和参数
├── stores/     # Pinia：user（登录态）、app（UI 状态，模块 2 加）
├── router/     # 路由表 + 全局守卫
├── layout/     # 布局（模块 2）
├── views/      # 页面，views/<module>/index.vue
├── styles/     # 设计 token 与 Element Plus 主题
└── utils/      # 纯函数（token 等）
```

- 页面不直接调用 `axios`，统一走 `api/`。
- 颜色/圆角/阴影/间距使用 `styles/variables.scss` 中的 token。
- 所有导出函数写 JSDoc，为后续按模块迁移 TypeScript 留边界。
