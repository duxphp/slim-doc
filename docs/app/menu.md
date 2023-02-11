---
lang: zh-CN
title: 应用菜单
---

使用该类库可以将应用内的前端菜单注册到管理端中，通过后端返回菜单可很方便的控制菜单权限。

## 菜单初始化

使用菜单前需要先初始化菜单模块，在应用入口文件 `App.php` 中的 `init` 方法进行初始化，如下：

```php
use Dux\Menu\Menu as DuxMenu;

// 初始化菜单类
$app->getMenu()->set("admin", new DuxMenu());
```


## 菜单使用

我们推荐在应用入口文件 `App.php` 中的 `register` 方法进行菜单使用，如下：


```php
// 获取 admin 标识菜单类
$menu = $app->getMenu()->get("admin");

// 添加主菜单
$app = $menu->add("system", [
    "name" => "系统",
    "icon" => "i-heroicons:cog-6-tooth",
    "order" => 100,
]);

// 注册菜单组
$group = $app->group("用户");

/**
 * 注册菜单条目
 * @param string $name  菜单名称
 * @param string $url  菜单Url，对应前端的路由
 * @param int $order  菜单顺序，从大->小排序
 */
$group->item("账号管理", "system/user/list", 0);

// 使用权限标识控制菜单显示
$group->item("账号管理", "system/user/list", 0)->auth("system.user.list");
```

## 菜单图标

菜单图标采用 unocss 作为图标加载器，同时预加载了 [heroicons](https://heroicons.com/) 图标库，可通过 `i-heroicons:图标名` 使用任意图标作为菜单图标。例如：

```php 
$app = $menu->add("example", [
    "name" => "示例",
    "icon" => "i-heroicons:sparkles",
    "order" => 100,
]);

```

更多关于 unocss 和 heroicons 的使用可以查看官方文档：https://unocss.com/docs/icons 和 https://heroicons.com/。

## 附加菜单

如果需要在已有主菜单内添加菜单，则可使用以下方法获取主菜单进行添加：

```php 
$app = $menu->push("system");
$group = $app->group("示例组", 10);
```

这里的 push 方法可以获取现有菜单。

## 应用菜单

如果需要将菜单放置在扩展应用列表内，则需要增加主菜单参数，示例如下：


```php 
$app = $menu->add("banner", [
    "extend" => true,    // 扩展状态
    'label' => 'show',   // 扩展分类标识
    "name" => "轮播图",   // 应用名称
    "desc" => "前端轮播广告图管理", // 应用描述
    "icon" => "i-heroicons:gift", // 应用图标
    "color" => "primary", // 图标背景主色
    "order" => 100,
]);
```