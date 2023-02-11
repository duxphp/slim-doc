---
lang: zh-CN
title: 应用介绍
---

Dux 应用是一种将PHP程序划分为多个独立的、可重用的模块的开发方式。它类似于手机操作系统中的各个应用程序，每个应用程序都是由多个独立的组件组成的。

每个应用都具有独立的功能和接口，可以单独开发、测试和维护。这种方式可以提高代码的可维护性和可扩展性，同时也降低了代码的复杂性和耦合性。

每个应用都具有自己的入口和界面。用户可以通过各个模块之间的导航或者入口，访问不同的功能模块。这种方式可以让应用程序更加灵活、易于维护和升级。

总之，Dux 应用是一种有效的组织代码的方式，可以将整个项目划分为多个小模块，每个模块都包含独立的功能和接口。这种方式可以提高代码的可维护性和可扩展性，让应用程序更加灵活、易于维护和升级。


## 应用结构

```bash
└─ app  # 应用程序的根目录，包含所有应用程序的文件和子目录。
   ├─ home                   # <- 应用模块
   |  ├─ Admin               # <- 存放后台接口相关代码
   |  ├─ Api                 # <- 存放前台接口相关代码
   |  ├─ Client              # <- 存放后台前端JSX代码
   |  ├─ Middleware          # <- 存放应用程序中间件相关代码
   |  ├─ Config               # <- 存放应用程序的配置文件
   |  ├─ Models              # <- 存放应用程序的模型相关代码
   |  └─ App.php             # <- 应用程序的入口文件，定义了应用程序的主要加载逻辑和路由
```

通过这种目录结构，可以将应用程序的代码、配置和数据等划分为多个独立的模块，从而提高应用程序的可维护性和可扩展性。每个模块都有自己的目录结构和功能，同时也有清晰的依赖关系。这种结构也使得不同的团队成员可以独立开发、测试和维护不同的模块，从而提高开发效率和代码质量。

### 入口文件

```php
// 基本示例
<?php
declare(strict_types=1);

namespace App\Home;

class App extends AppExtend {

    public string $name = "主页模块";

    public string $description = '主页模块描述';

    public function init(Bootstrap $app): void {
        // 方法用于初始化应用的路由、权限、菜单等配置信息。
    }

    public function register(Bootstrap $app): void {
        // 方法用于在应用注册时注册路由、权限、菜单等信息。
    }

    public function boot(Bootstrap $app): void {
        // 方法用于在系统运行时的一些处理。
    }
}
```

### 控制器

`Admin` 与 `Api` 实质上均属于控制器，为了方便结构化清晰所以进行分开存放，可以根据需要将路由的回调类指向到统一类或者方法中。

### 配置

`Config` 目录中主要存放路由、菜单、权限等应用内的配置信息，可通过入口文件来调用这些数据在初始化时进行加载。

### 中间件

`Middleware` 提供应用或整个系统中的可用中间件，可以在路由配置时进行指定中间件，具体实现代码可查看 [slim](https://www.slimframework.com/docs/v4/concepts/middleware.html) 的中间件。


### 模型

`Models` 提供应用的 ORM 数据表模型，具体使用请参考 [Laravel ORM](https://learnku.com/docs/laravel/9.x/eloquent/12251)。