# 项目约定 · 个人博客（旺.xyz）

## Git / GitHub 推送拉取

- 仓库：`https://github.com/w-06/personal-website.git`
- 远程名：`origin`
- 默认分支：`master`
- 提交后推送：`git push`（全局 `push.default=simple`，会推到 `origin/master`）
- 拉取：`git pull`
- 身份已全局配置：`Liu JiaWang <3356557909@qq.com>`

## 服务器（阿里云 ECS）

连接方式（Workbench CLI）：

```bash
workbench connect --instance-id i-n4a9pej12kt1sz2701oe
```

也可在远程执行命令（非交互）：

```bash
workbench exec --instance-id i-n4a9pej12kt1sz2701oe -- <命令>
```

公网 IP：`47.122.118.129`  
系统：Ubuntu 24.04 · 2 核 2 GiB  
规划：Nginx 托管本静态站；旧学习 demo 可下线。

## 站点要点

- 纯静态：`index.html` + `css/` + `js/` + `assets/`
- 域名：旺.xyz（待解析与 ICP 备案）
- 页面：首页 / 项目 / 两个项目详情 / 关于 / 简历 / 面试速查
