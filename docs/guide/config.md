---
lang: zh-CN
title: 配置
---

系统采用 Yaml 作为后端配置，配置在使用时系统会根据需要按需加载。

## 应用配置

<Badge text="app.yaml" />

### app

| 名称 | 类型  | 描述  |
|--|-----|-----|
| name | string  | 系统名称 |
| debug | boolean  | 调试模式，关闭后会屏蔽返回的异常详情，不影响日志记录 |
| cache | boolean  | 系统缓存，上线后建议开启，会缓存注册过程中的数据 |
| secret | string  | 系统密钥，请勿分享，建议定期更换保证安全性 |
| domain | string  | 域名，url链接通过此域名进行生成如本地上传后的文件地址 |

### registers

该参数值类型为 `array`，数组元素为应用注册类的命名空间字符串，如：`\App\System\App` 对应的文件为 `/app/System/App.php`

## 缓存配置

<Badge text="cache.yaml" />
