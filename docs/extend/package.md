---
lang: zh-CN
title: 打包发布
---

您可以将一个或多个应用模块上传至 `git` 同时加入 `composer.json` 配置参数并发布至 [packagist](https://packagist.org/) 或者您的私有库中，即可分享给他人使用。


## 包结构

建立新的 git 仓库，并按照以下目录结构放置您的代码：

```bash
app                   # <-- 应用总目录
 - Test               # <-- 测速应用
config                 # <-- 配置目录
.gitignore
README.md             # <-- 仓库介绍
composer.json         # <-- 仓库配置
```

`app/` 目录下是应用的总目录。
`Test/` 目录下是一个示例应用。
`config/` 目录下是应用的配置文件。
`.gitignore` 文件用于配置 git 忽略列表。
`README.md` 文件是该仓库的说明文件。
`composer.json` 文件是该仓库的配置文件。

## 包配置

打开 composer.json 文件

```json 
{
  "name": "vendor/package-name",    // 全网唯一的包名，建议命名格式：组织名/包名
  "type": "dux-app",                // 类型填写 dux-app 表示这是一个 duxlite 应用
  "require": {
    // 应用依赖的第三方库
  },
  "require-dev": {
    // 应用依赖的开发时所需的第三方库
  },
  "autoload": {
    // 应用的 PSR-4 类自动加载规则
  },
  "extra": {
    "dux": [
      {
        "source": "app",             // 源路径，相对于应用仓库根目录
        "target": "app",            // 目标目录，相对于项目根目录
        "ignore": false             // 是否跳过已有目录或文件
      }
    ]
  }
}

```

根据 `dux` 配置项可以定义安装时将仓库目录内的文件或者目录复制到项目中的操作，路径参数如果为文件则复制文件。

`ignore` 参数如果为 `true`时，如果目录或文件存在则不执行迁移。


## 发布应用包
请将您的配置和代码整理好并上传到 git 仓库，在 `packagist` 上发布您的包。具体的发布流程请参考 packagist 的官方文档。

## 安装应用包

DuxLite 的应用包管理由 `composer` 与 `dux` 命令组成：

- `composer` 用于应用包的版本控制、上传和下载。
- `dux` 命令用于应用包的安装和部署。

当您使用 `composer require` 命令安装应用包时，系统会自动执行 `dux:app install <package>` 命令。以下是具体的命令示例：

```bash 
// 安装应用包
composer require duxphp/lite-demo
```

:::tip
执行 dux app:install 命令时，不会执行数据库同步操作，因为您可能需要安装多个应用包。请在安装结束后手动执行 `dux db:sync` 命令以同步数据库。
:::
`dux:app install` 命令只会在 `composer require` 时执行一次。如果您重复执行该命令，系统将会重新部署文件。在更新第三方包时，可以使用该命令对文件进行升级。请谨慎使用该命令，以免覆盖您的二次开发内容。

## 包设计思路

包的使用设计分为两种：

第一种是利用 `extra.dux` 配置将应用文件复制到系统的 `app` 目录中，开发者可以针对该应用进行二次开发而不必去重写发布包，因为该包使用了系统 `app` 目录，前端框架可对该目录的前端文件进行监听与打包，是推荐的一种方式。

第二种是使用 `autoload` 配置自动注册应用内的命名空间，无需将代码复制在系统 `app` 目录内，但发布前端文件需要单独执行 UI 同步命令：

先应用入口注册前端目录与应用名

```php
// $dir 前端目录，相对于当前仓库绝对路径
// $app 前端应用名，相对于 'client/app' 下的目录名 
\Dux\UI\register(string $dir, string $app);
```
执行安装命令后执行以下命令发布所有注册目录到 `Client` 的前端目录。

```bash
dux ui:push
```