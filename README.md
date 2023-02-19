---
lang: zh-CN
title: duxlite 开发系统
home: true
modules:
  - BannerBrand
  - MdContent
  - Footer
bannerBrand:
  title: dux-lite
  description: 一款轻量级的 PHP 基础开发框架
  tagline: 基于 php8.2 并使用严格模式与 Psr 系列规范的应用化架构框架，React 前后端分离 RESTful 风格 Api，所有功能开箱即用，低耦合设计模块即插即用，同时拒绝隐晦式的方法调用，采用主流 Composer 三方包，无开发与维护负担。
  bgImage: /bg.svg
  buttons:
  - { text: 快速开始, link: '#快速开始' }
  - { text: 指南, link: '/docs/guide/introduce', type: 'plain' }

footer: # 底部模块的配置
  record: 域名备案文案
  recordLink: 域名备案地址
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

### 文档说明

本文档仅介绍 DuxLite 相关开发，其中集成的第三方类库请，查看类库各自文档，本文档部分内容由 ChatGPT 编写，如有错误请进行反馈。