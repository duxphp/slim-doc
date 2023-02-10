---
lang: zh-CN
title: 介绍
---

DuxLite 使用 slimphp 为基础路由框架，同时集成了 Eloquent ORM 作为数据驱动，并集成了各大 Psr 规范化的主流组件，不做过度封装便于随版本升级，使用 DuxGo 版本的相同的应用模块化设计，框架处统注册应用入口，后期可轻松运行在 Swow、Workerman 等异步模式。

## 目的

DuxLite 的出现主要解决一下几点问题：
- laravel 的封装过度隐晦的方法调用
- 自有框架更新不及时维护周期长等问题
- 不规范的开发方式与高耦合的架构
- UI 体验性差且没有一致性

## 集成

DuxLite 主要依赖集成以下第三方模块：

- [slim/slim](https://github.com/slimphp/Slim) slimphp 基于 psr-7 的轻量级路由框架
- [illuminate/database](https://github.com/illuminate/database) Eloquent ORM 强大的数据库操作库
- [monolog/monolog](https://github.com/Seldaek/monolog) 强大的日志类库
- [php-di/php-di](https://github.com/PHP-DI/PHP-DI) 依赖注入容器
- [hassankhan/config](https://github.com/hassankhan/config) 轻量级配置加载器
- [symfony/console](https://packagist.org/packages/symfony/console) 易用美观的命令行工具
- [enqueue/redis](https://github.com/symfony/console) 基于 Redis 的消息队列
- [symfony/event-dispatcher](https://github.com/symfony/event-dispatcher) 可解耦的事件调度器
- [league/flysystem](https://github.com/thephpleague/flysystem) 多元化的文件存储类
- [nette/php-generator](https://github.com/nette/php-generator) 代码生成器
- [vlucas/valitron](https://github.com/vlucas/valitron) 方便的数据验证器
- [latte/latte](https://github.com/nette/latte) 安全简单的php模板引擎
- [nette/utils](https://github.com/nette/utils) 常用工具库