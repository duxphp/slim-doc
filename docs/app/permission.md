---
lang: zh-CN
title: 应用权限
---
应用权限管理用于控制后端路由的访问与前端的模块显示，前端每次登录后会自动获取当前权限来展示内容，同时前台菜单也可与权限做关联。

## 权限初始化

使用权限前需要先初始化权限模块，在应用入口文件 `App.php` 中的 `init` 方法进行初始化，如下：

```php
// 初始化权限类
$app->getPermission()->set("admin", new DuxPermission());
```



## 使用权限类

使用权限需要按照以下步骤进行操作：

1. 获取权限标识权限类

```php
use Dux\Permission\Permission as DuxPermission;

// 获取 admin 标识权限类
$permission = $app->getPermission()->get("admin");
```

2. 创建权限组
```php
/**
 * 创建权限组
 * @param string $name 权限名称，描述组的作用
 * @param string $label 权限组前缀，用于权限的前缀内容
 * @param int $order 权限顺序，用于权限选择展示
 * @return PermissionGroup
 */
$group = $permission->group("测试", "test.home");
```
3. 向权限组中添加权限条目
```php
/**
 * 添加权限条目
 * @param string $label 权限组内标记
 * @param string $name 权限名称，描述权限作用
 */
$group->add("index", "首页");
```

您还可以注册应用权限到权限配置类中
```php
// 注册应用权限到权限类
$adminPermission = $app->getPermission()->get("admin");
Permission::Admin($adminPermission);
```
最终会形成上下级的权限表提供给管理端作为权限表数据使用，同时并自动合并上下级条目与组的数据供权限判断，如下：

```php
$data = [
    'test.home.index',
    ...
];
```

## 使用 manage 方法

我们提供了 manage 方法，以便简化管理层路由的权限注册方式。该方法会自动注册 `list` `info` `add` `edit` `del` `store` 等常用的增删查改权限到对应的类方法内，示例如下：

```php
/**
 * @param string $name 权限组名称
 * @param string $label 标记前缀
 * @param int $order  排序
 * @param array $ways 允许方法名
 * @return PermissionGroup
 */
$permission->manage("用户管理", "system.user");
```

该方法会返回权限组方法，您可以继续在之后增加权限条目。


## 权限中间件

如果你想使用权限功能，你需要为路由注册权限中间件以便自动判断用户权限，示例如下：

```php
$app->getRoute()->set("admin",
    new DuxRoute("/admin", "管理端",
         /**
          * @params string $name 权限类标识
          * @params string $model 用户模型类，该模型需要以 id 作为主键并返回 permission 作为已授权的权限数组，如果为空则不验证。
          */
        new PermissionMiddleware("admin", SystemUser::class), 
    )
);
```