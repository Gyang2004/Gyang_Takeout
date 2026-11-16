# 项目初始化与 Git 管理

> 可复用的项目/Git 操作速查卡。新项目初始化时照抄，日常操作按表查。

## 1. 仓库信息

| 项 | 值 |
|---|---|
| 本地路径 | `e:/codeProject/Gyang_Takeout` |
| 远端 | `https://github.com/Gyang2004/Gyang_Takeout.git`（origin） |
| 主分支 | `main` |
| 提交身份 | `Gyang_s <18111019157@139.com>` |

## 2. 新项目初始化步骤

```bash
git init                      # 1. 初始化
git remote add origin <url>   # 2. 关联远端
git branch -M main            # 3. 统一主分支名
# 4. 写 .gitignore / README.md
git add -A
git commit -m "docs: 初始化项目"
git push -u origin main       # 5. 首次推送并建立跟踪
```

**目录约定**：`notes/` 放过程记录与速查（本文件）；源码按技术栈分目录；根目录只留 README、构建配置、`.gitignore`。

## 3. 提交规范（Conventional Commits）

格式：`type(scope): 说明`；说明用祈使句、中文、不加句号（后两条是团队约定）。

- 规范**只强制** `feat`（新功能）与 `fix`（修 bug），下表其余类型是 `@commitlint/config-conventional` 的推荐集。
- 破坏性变更：用 `type!:`，或在 footer 写 `BREAKING CHANGE: 说明`。

| type | 用途 |
|---|---|
| feat | 新功能 |
| fix | 修 bug |
| docs | 文档 |
| style | 格式（不影响逻辑） |
| refactor | 重构 |
| perf | 性能 |
| test | 测试 |
| build / ci | 构建、CI 配置 |
| chore | 杂项（依赖、配置） |
| revert | 撤销某次提交 |

例：`feat(user): 新增手机号登录`、`fix(order): 修复金额计算精度丢失`、`feat(api)!: 移除 v1 接口`。

分支：主分支只读，改动走 `feature/xxx`、`fix/xxx`，合并后再删（团队约定）。

## 4. 日常操作速查

```bash
git status -sb                 # 看状态（简洁）
git diff                       # 看未暂存改动
git add <file>                 # 暂存指定文件；git add -A 全部
git commit -m "type(scope): x" # 提交
git pull --rebase origin main  # 拉取并在远端之上变基（线性历史）
git push                       # 推送
git log --oneline --graph -15  # 看历史
git branch -a                  # 列分支
git checkout -b feature/xxx    # 建并切换分支
git stash -u                   # 暂存现场（含未跟踪文件）
git stash list / stash pop     # 查看 / 恢复
git tag -a v1.0.0 -m "首版" && git push origin v1.0.0  # 打标签并推送该标签
```

> `pull --rebase` 会改写本地提交的哈希，只对**尚未推送**的提交安全。已推送、别人可能已基于其工作的提交不要变基（Pro Git 的 rebase 铁律）。

## 5. 撤销与回滚速查

| 场景 | 命令 |
|---|---|
| 改了未 add，想还原（从索引取回工作区） | `git restore <file>` |
| 已 add，想取消暂存（索引退回 HEAD） | `git restore --staged <file>` |
| 已 commit 未 push，想改提交信息 | `git commit --amend -m "新信息"`（生成新提交，仅限未推送） |
| 已 commit 未 push，想撤销但保留改动 | `git reset --soft HEAD~1`（改动仍在暂存区） |
| 已 commit 未 push，想彻底丢弃 | `git reset --hard HEAD~1` ⚠️ 工作区被覆盖，未跟踪文件也可能被覆盖，不可逆 |
| 已 push，想撤回 | `git revert <sha>`（新增反向提交，不改历史；要求工作区干净） |
| 误删已跟踪文件 | `git restore <file>`；删除已暂存时用 `git restore --source=HEAD --staged --worktree <file>`（旧写法 `git checkout HEAD -- <file>`） |

原则：**不要 rebase 已存在于仓库之外、别人可能已基于其工作的提交**（Pro Git）；共享分支已推送的历史不改写，撤销用 `revert`。`reset --hard`、`push -f` 属于报批操作。

## 6. .gitignore 基线

```gitignore
# 系统 / 编辑器
.DS_Store
Thumbs.db
.idea/
.vscode/
*.iml

# 依赖与产物
node_modules/
target/
dist/
build/
out/

# 日志 / 本地配置 / 敏感信息
logs/
*.log
.env
.env.*
!.env.example
application-local.*
*.local.*
```

密钥、令牌、数据库口令一律不进仓库；需要示例值时写 `.env.example`。

## 7. 交付前检查

- `git status` 无意外改动，无敏感文件被跟踪
- 提交信息符合规范，一次提交只做一件事
- 拉取无冲突后再推送；推送后确认远端已更新
- 删除/覆盖已有文件、`push -f`、改远端配置前先确认

