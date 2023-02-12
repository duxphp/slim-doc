---
lang: zh-CN
title: 创建应用
---

请根据以下步骤来创建一个应用以便更好的理解应用开发，应用创建均使用 `dux` 命令行工具。

## 创建应用

使用 dux 命令行工具创建应用：

```bash
./dux generate:app 应用名
```

应用将会被创建在 app 目录下，其中应用名是自定义的。

:::tip
该命令还会将应用注册到系统内 config/app.yaml 配置中，该配置可加载应用入口。
:::

## 创建数据模型

创建数据模型，可以使用以下命令生成模型文件：

```bash
# 执行后请根据提示输入模型名
./dux generate:model 应用名
```

生成的模型文件位于应用的 `Models` 目录下，示例：


```php
<?php

declare(strict_types=1);

namespace App\Test\Models;

use Dux\Database\Attribute\AutoMigrate;

#[AutoMigrate]
class Test extends \Dux\Database\Model
{
    // 表名
	public $table = 'test';

    // 数据表同步结构
	public function migration(\Illuminate\Database\Schema\Blueprint $table)
	{
		$table->id();
		
		// 自定义数据表字段
		$table->string('name')->comment('名称');
		
		$table->timestamps();
	}
}

```

在 `migration` 方法中定义需要的字段，使用 PHP 8 的属性特性作为数据库字段同步的依据。调用字段时可以参考文档 [数据库迁移字段](https://learnku.com/docs/laravel/9.x/migrations/12248#9caecd)

定义完字段后，可以使用以下命令将字段同步至数据库，无需手动操作数据库：

```bash
./dux db:sync
```

## 创建后台管理控制器与后台的前端文件

可以使用以下命令生成后台管理控制器与前端文件：

```bash
./dux generate:manage 应用名
```

根据提示，输入层名称和控制器名称，即可在 `app/应用名/Client/admin` 目录下生成对应的控制器和前端文件。

在生成的控制器文件中，需要手动将 `$model` 公共变量修改为模型的命名空间类名。


## 注册前端路由与菜单


在应用目录下的 `Client/admin` 目录创建 `index.js` 文件，用于将前端文件注册到前端路由中。示例代码如下：

```js
import { lazy } from 'react'

const route = {
  test: {
    list: lazy(() => import('./test/list')),
    page: lazy(() => import('./test/form'))
  },
}

export const duxwebData = {
  route
}
```


在应用目录的 `Config` 目录中，会自动生成 Route.php 路由配置、Permission.php 权限配置和 Menu.php 后台前端的菜单数据。在 Menu.php 文件中配置前端菜单，示例：

```php
<?php
declare(strict_types=1);

namespace App\Test\Config;

use Dux\Menu\Menu as DuxMenu;

class Menu
{
    public static function Admin(\Dux\Menu\Menu $menu): void {
        $app = $menu->add("banner", [
            "extend" => true,
            'label' => 'show',
            "name" => "测试",
            "desc" => "这是一个测试应用",
            "icon" => "i-heroicons:gift",
            "color" => "primary",
            "order" => 100,
        ]);
        $group = $app->group("测试组");
        // 注册前端路由菜单
        $group->item("测试功能", "test/test/list", 0);
    }
}

```

## 注册应用路由、菜单与权限

打开应用目录中的 `App.php`，将路由、菜单与权限注册到已初始化的类中。

```php
<?php

declare(strict_types=1);

namespace App\Test;

use App\Test\Config\Menu;
use App\Test\Config\Permission;
use App\Test\Config\Route;
use Dux\Bootstrap;

/**
 * Application Registration
 */
class App extends \Dux\App\AppExtend
{
    public string $name = '测试';
    public string $description = '这是一个测试应用';

    public function register(Bootstrap $app): void
    {
        // 注册菜单
        Menu::Admin($app->getMenu()->get("admin"));
        // 注册授权路由
        Route::AuthAdmin($app->getRoute()->get("adminAuth"));
        // 注册权限
        Permission::Admin($app->getPermission()->get("admin"));
    }

}

```

## 预览调试应用

使用以下命令启动前端调试模式：

```bash
 yarn dev
```

该命令将会监听应用目录下的所有前端文件，并将它们同步到系统目录 `client` 中。在开发过程中，请修改应用目录下的 `Client` 中的文件，框架会自动复制和合并它们。请勿修改系统目录 `client` 中的文件，以免被还原。

## 结束

现在，您已经掌握了一个应用的基础开发方式。要深入了解更多内容，请参考类库文档和第三方包文档。