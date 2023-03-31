---
lang: zh-CN
title: 配置
---

系统采用 Yaml 作为后端配置，所有配置均存在 config 下，配置在使用时系统会根据需要按需加载，配置名为 `xxx.yaml` 为了防止同步时本地配置覆盖线上配置可使用 `xxx.dev.yaml` 来定义本地开发配置，系统将优先读取该配置文件，提交线上时请勿提交本地配置。

## 应用配置

<Badge text="app.yaml" />


### registers

该参数值类型为 `array`，数组元素为应用注册类的命名空间字符串，如：`\App\System\App` 对应的文件为 `/app/System/App.php`

## 用户配置

<Badge text="use.yaml" />

### app

| 名称 | 类型 | 描述 |
|--|-----|-----|
| name | string | 系统名称 |
| debug | boolean | 调试模式，关闭后会屏蔽返回的异常详情，不影响日志记录 |
| cache | boolean | 系统缓存，上线后建议开启，会缓存注册过程中的数据 |
| secret | string | 系统密钥，请勿分享，建议定期更换保证安全性 |
| domain | string | 域名，url链接通过此域名进行生成如本地上传后的文件地址 |
| port | int | 服务端口号，使用异步服务时可指定该端口号 |
| process | int | 进程数量，使用异步服务时可指定进程数量 |

## 缓存配置

<Badge text="cache.yaml" />


| 键名 | 类型 | 描述 |
| -- | --- | --- |
| type | string | 文件类型 |
| drivers.files | string | 文件驱动 |
| drivers.redis.host | string | Redis主机地址 |
| drivers.redis.port | number | Redis端口号 |

## 命令配置

<Badge text="command.yaml" />

`registers` 参数值类型为 `array`，数组元素为 `console` 类的命名空间字符串，如：`\Console\TestCommand`
对应的文件为 `/console/TestCommand.php`

## 数据库配置

<Badge text="database.yaml" />

| 键名                            | 类型     | 描述          |
|-------------------------------|--------|-------------|
| db.drivers.default.driver     | string | 默认数据库驱动     |
| db.drivers.default.host       | string | 数据库主机地址     |
| db.drivers.default.database   | string | 数据库名称       |
| db.drivers.default.username   | string | 数据库用户名      |
| db.drivers.default.password   | string | 数据库密码       |
| db.drivers.default.port       | number | 数据库端口号      |
| db.drivers.default.prefix     | string | 数据表前缀       |
| redis.drivers.default.host    | string | Redis主机地址   |
| redis.drivers.default.port    | number | Redis端口号    |
| redis.drivers.default.timeout | number | Redis连接超时时间 |
| redis.drivers.default.auth    | string | Redis密码     |

## 队列配置

<Badge text="queue.yaml" />

| 键名 | 类型 | 描述     |
| --- | --- |--------|
| type | string | 队列驱动   |
| retry | number | 重试次数   |
| drivers.default.type | string | 驱动类型   |
| drivers.default.host | string | 驱动主机地址 |
| drivers.default.port | number | 驱动端口号  |
| drivers.default.scheme_extensions | array | 驱动方案扩展 |

## 存储配置

<Badge text="storage.yaml" />

| 键名 | 类型 | 描述 |
| --- | --- | -- |
| type | string | 存储驱动 |
| ext | array | 允许后缀格式 |
| drivers.default.type | string | 默认驱动类型 |
| drivers.default.public_url | string | 公共URL |
| drivers.default.path | string | 存储路径 |