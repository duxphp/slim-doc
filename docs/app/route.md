---
lang: zh-CN
title: 应用路由
---

在使用路由前需要先设置路由，在应用入口文件 `App.php` 中的 `init` 方法进行路由注册，如下：

```php
/**
 * @param string $pattern 路由前缀
 * @param string $title 路由标题 - 用于清晰的展示
 * @param object ...$middleware 中间件
 */
$app->getRoute()->set("web", new DuxRoute("", "web端"));
```


## 路由使用

我们推荐在应用入口文件 `App.php` 中的 `register` 方法进行路由使用，如下：

```php
use App\Test\Config\Route;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

// 获取 Web 路由
$route = $app->getRoute()->get('web');

/**
 * 注册 GET 路由
 * @param string $pattern 路由路径
 * @param callable|object|string $callable 路由回调
 * @param string $name 路由名称，该名称与权限配置对应时将自动应用权限配置
 * @param string $title 路由标题，用于清晰地展示
 * @return void
 */
$route->get('/', function (ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface {
    return send($response, 'Hello world!');
}, 'test.home', '测试');

// 将 Web 路由注册到独立配置类中
Route::Api($route);
```

具体的路由路径规则请参考 [slim](https://www.slimframework.com/docs/v4/objects/routing.html)，DuxLite 只是在此之上封装了一层方法，以方便模块化调用。

## 管理层路由

为了简化管理层路由（例如 `Admin` 控制器）的注册方式，我们封装了一个 `manage` 方法，该方法会自动注册 `list` `info` `add` `edit` `del` `store` 等常用的增删查改路由到对应的类方法内。

```php
/**
 * @param string $pattern 路由前缀，该方法会自动在前缀后加入 /list 等路径名，并符合 RESTful 规范
 * @param string $class 控制器类名
 * @param string $name 路由名称前缀，该方法会自动在前缀后加入 .list 等名称
 * @param string $title 路由标题
 * @param array $ways ["list", "info", "add", "edit", "store", "del"] 自定义可用的路由与方法
 * @return Route
 */
$route->manage(
    pattern: "/system/user",
    class: User::class,
    name: "system.user",
    title: "账号",
    ways: ["list", "info", "add", "edit", "store", "del"]
);
```

该方法会返回路由组方法，您可以继续在之后使用 `get` `post` 等自定义路由方法。
