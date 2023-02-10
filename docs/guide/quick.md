---
lang: zh-CN
title: 快速上手
---

请按照教程步骤进行操作，该教程会帮助您快速搭建该系统。

## 依赖环境

- PHP 8.1+
- Mysql 5.7+
- Composer 2.0+
- Redis
- NodeJS
- Yarn

请自行根据当前使用的操作系统进行环境搭建，Windows 推荐使用 [PhpStudy](https://www.xp.cn/)，MacOS 推荐使用 [valet](https://learnku.com/docs/laravel/9.x/valet/12276)

## 手动安装

1. 创建并进入一个新目录

```bash
mkdir duxlite
cd duxlite
```

2. 初始化项目文件

```bash
composer create-project duxphp/duxlite
```

3. 给于dux命令权限

```bash
chmod 0755 ./dux
```

4. 修改配置

修改 `config/database.yaml` 文件为当前数据库配置，请自行创建数据库。

```yaml
db:
  drivers:
    default:
      driver: mysql
      host: 主机地址
      database: 数据库名
      username: 账号
      password: 密码
      port: 3306  端口号
      prefix: app_
```

4. 安装后端应用到系统
::: tip
该步骤会安装基础后台应用到系统内，提供基础的后台管理功能与配置表、上传工具等。
:::

```bash
// 下载应用包
composer require duxphp/lite-base
// 将包安装到应用内
./dux app:install duxphp/lite-base
// 数据库同步
./dux db:sync
```

5. 安装前端依赖

```bash
yarn
```

5. 启动服务

::: tip
如果后端通过系统内自带的 nginx 等环境访问请修改 `client/config/request.js` 中的域名为后端域名。
:::

```bash

# 启动后端服务
php -S localhost:8000 -t public

# 启动前端服务
yarn dev
```