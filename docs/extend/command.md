---
lang: zh-CN
title: 命令工具
---

DuxLite 使用 [symfony console](https://symfony.com/doc/current/console.html) 封装了部分常用命令工具，您也可以自行扩展命令工具。

请修改以下配置文件并加入自己的命令路径即可。
```
config/cammand.yaml
```

## 使用命令

您可以通过在系统根目录中执行以下命令来列出所有可用命令：

```bash
./dux
```

## 路由列表

以表格方式列出所有注册的路由列表，可以传递分组参数列出对应注册的路由列表

```bash 
./dux route
```

## 权限列表

以表格方式列出所有注册的权限列表，可以传递分组参数列出对应注册的权限列表

```bash 
./dux route
```

## 事件列表

以表格方式列出所有事件名称对应的监听类或回调，如果为回调则不显示具体内容。

```bash 
./dux event
```

## 数据模型列表

列出所有已注册同步的数据模型

```bash 
./dux db:list
```

## 数据模型同步

将数据模型字段同步至数据库中，并完成增加和修改字段。

```bash 
./dux db:sync
```

## 队列运行

启动队列服务执行队列任务，可以传递分组参数来执行不同的队列，默认为default队列

```bash 
./dux queue
```

## 代码生成工具

代码生成工具作为脚手架提供基础的代码生成，生成后的代码需要继续修改使用。

### 生成应用

生成后的应用会自动将入口类注册到配置中。

```bash 
./dux generate:app 应用名
```

### 生成控制器

根据提示输入控制器层名与类名，同时会自动生成到路由配置中。

```bash 
./dux generate:ctr 应用名
```

### 生成管理端控制器

根据提示输入控制器层名与类名，同时会自动生成到路由、权限配置与前端文件，前端文件路由需要手动注册。

```bash 
./dux generate:manage 应用名
```

## 生成模型

根据提示输入模型类名，会自动生成到应用的 `Models` 目录中。

```bash 
./dux generate:model 应用名
```


## 应用管理

### 列出应用列表

```bash 
./dux app:list
```

### 安装应用

应用名为composer包名，如 `duxphp\lite-base`，该命令会将 composer 中的 DuxLite 应用安装到系统的 `app` 目录中。

```bash 
./dux app:install 应用名
```