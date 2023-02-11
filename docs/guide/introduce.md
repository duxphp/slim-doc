---
lang: zh-CN
title: 介绍
---
DuxLite 是一个基于 SlimPHP 的 Web 应用程序开发框架，同时整合了 Eloquent ORM 作为主要的数据驱动。DuxLite 还集成了各大 Psr 规范化的主流组件，例如 PSR-7、PSR-11、PSR-15 等，以确保框架具有高度的可扩展性和互操作性。DuxLite 不做过度封装，便于开发者灵活选择和随版本升级，同时采用 DuxGo 版本的应用模块化设计。框架的统一入口管理方便了应用程序的整体架构和管理，后期还可以轻松运行在 Swow、Workerman 等异步模式下。

## 特点
- 基于 SlimPHP 路由框架，轻量、灵活、易于学习和使用。
- 整合 Eloquent ORM 作为主要的数据驱动，提供良好的数据库操作支持。
- 集成了各大 Psr 规范化的主流组件，如 PSR-7、PSR-11、PSR-15 等，提供高度的可扩展性和互操作性。
- 不做过度封装，便于开发者灵活选择和随版本升级。
- 采用 DuxGo 版本的应用模块化设计，提高应用程序的可维护性和可扩展性。
- 统一注册应用入口，方便应用程序的整体架构和管理。
- 可以轻松运行在 Swow、Workerman 等异步模式下，提供更好的性能和响应能力。

## 目的

DuxLite 的出现主要解决一下几点问题：
- Laravel 框架中存在封装过度、隐晦的方法调用，使得框架使用变得困难。
- 自有框架的更新不及时、维护周期长等问题，使得开发者的工作受到了很大的限制。
- 不规范的开发方式和高耦合的架构导致代码难以维护和扩展。
- UI 体验性差且没有一致性，导致用户使用不便。

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