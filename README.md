---
lang: zh-CN
title: ddsadsadsad
home: true
modules:
  - BannerBrand
  - MdContent
  - Footer
bannerBrand:
  title: dux-slim
  description: 一款轻量级的 PHP 基础开发系统
  tagline: 基于 php8 并遵循 Psr 系列规范与应用化架构设计，React 前后端分离化设计，所有功能开箱即用，低耦合设计让功能模块即插即用，同时拒绝隐晦式的方法调用，采用主流 Composer 三方包，无开发与维护负担。
  bgImage: /bg.svg
  buttons:
  - { text: 快速开始, link: '#简单开始' }
  - { text: 指南, link: '/docs/theme/introduce', type: 'plain' }

footer: # 底部模块的配置
  record: 域名备案文案
  recordLink: 域名备案地址
---

### 快速开始

<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash
# install in your project
pnpm add -D vuepress@next @vuepress/client@next vue

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
pnpm vuepress dev

# build to static files
pnpm vuepress build
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash
# install in your project
yarn add -D vuepress@next

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
yarn vuepress dev

# build to static files
yarn vuepress build
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# install in your project
npm install -D vuepress@next

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
npx vuepress dev

# build to static files
npx vuepress build
```

  </CodeGroupItem>
</CodeGroup>