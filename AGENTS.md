# 项目约定 · 个人博客（wy06.xyz）

## Git / GitHub 推送拉取

- 仓库：`https://github.com/w-06/personal-website.git`
- 远程名：`origin`
- 默认分支：`master`
- 提交后推送：`git push`（全局 `push.default=simple`，会推到 `origin/master`）
- 拉取：`git pull`
- 身份已全局配置：`Liu JiaWang <3356557909@qq.com>`

## 域名（已切换）

- **当前正式域名：`wy06.xyz`**
- **旧域名 `旺.xyz` / `xn--ihv.xyz` 已弃用**，站内文案、分享、简历一律不再使用
- 解析：A 记录 → `47.122.118.129`
- 访问：`https://wy06.xyz`（HTTPS 配好后）/ `http://wy06.xyz`

## 备案

- ICP：`湘ICP备2026044026号-2` → 链接 https://beian.miit.gov.cn
- 公安：`湘公网安备43042402000050号` → 链接 https://beian.mps.gov.cn
- 页脚必须展示以上备案号（已实现）

## 服务器（阿里云 ECS）

连接方式（Workbench CLI）：

```bash
workbench connect --instance-id i-n4a9pej12kt1sz2701oe
```

远程执行：

```bash
workbench exec --instance-id i-n4a9pej12kt1sz2701oe --timeout 90 --command "<命令>"
```

公网 IP：`47.122.118.129`  
系统：Ubuntu 24.04 · 2 核 2 GiB  
站点目录：`/var/www/personal-website`  
Nginx：`/etc/nginx/sites-available/default`  
旧 demo 备份：`/var/backups/html-demo-20260927.tar.gz`

## 站点要点

- 纯静态：`index.html` + `css/` + `js/` + `assets/`
- 部署：GitHub `master` → codeload tarball → rsync 到 `/var/www/personal-website`
- 页面：首页 / 项目 / 两个项目详情 / 关于 / 简历 / 面试速查
