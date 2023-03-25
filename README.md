---
lang: zh-CN
title: duxlite 开发系统
home: true
heroImage: /logo.png
heroHeight: 100
actions:
  - text: 快速开始
    link: /#快速开始
    type: primary
  - text: 指南
    link: /docs/guide/introduce
    type: secondary

features:
  - title: 大道至简
    details: 基于 SlimPHP 路由框架，外加简单的使用方法，一个类包含所有显性类库调用，拒绝复杂设计模式。
  - title: Psr 标准
    details: 集成了各大 Psr 规范化的主流组件，如 PSR-7、PSR-11、PSR-15 等，提供高度的可扩展性和互操作性。
  - title: 易于维护
    details: 不做过度封装，便于开发者灵活选择和随版本升级。
  - title: 高扩展性
    details: 采用应用入口式的模块化设计，提高项目的可维护性和可扩展性。
  - title: Eloquent ORM
    details: 整合 Eloquent ORM 10.x 作为主要的数据驱动，提供良好的数据库操作支持。
  - title: 组件整合
    details: 整合常用三方维护库，并进行全局懒加载，无加载压力，同时封装常用 JWT 权限等验证类库。

footer: MIT Licensed | Copyright ©2023 duxweb
---

### 快速开始


```bash
# 创建目录
mkdir duxlite && cd duxlite

# 安装项目
composer create-project duxphp/duxlite:dev-main

# 启动web服务
php -S localhost:8000 -t public
```
