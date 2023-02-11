---
lang: zh-CN
title: 数据库模型
---

DuxLite 数据库模型继承自 Illuminate\Database\Eloquent\Model，因此可以使用 Eloquent 所有方法，但不支持一些需要 Laravel 的扩展包。以下是一个基础的模型示例：


```php 
<?php

declare(strict_types=1);

namespace App\Example\Models;

use Dux\Database\Attribute\AutoMigrate;

#[AutoMigrate]
class Example extends \Dux\Database\Model
{
    public $table = 'example';

    public function migration(\Illuminate\Database\Schema\Blueprint $table)
    {
        $table->id();
        $table->string('name')->comment('示例名称');
        $table->timestamps();
    }
}
```

在上述示例中，我们创建了一个名为 Example 的模型类，继承自 Dux\Database\Model。我们将数据表命名为 example。通过 $table 属性，我们指定了数据表名称。接下来，我们通过 migration 方法，定义了数据表的结构。

需要注意的是，我们没有使用 Eloquent 原本繁琐的数据库迁移，而是通过 migration 方法实现了自动同步。这种方式使得数据表的增减字段等操作变得简单易行，只需要使用数据库同步命令即可将数据表更新到最新的结构。

## 自动同步

在 `Example` 模型中，我们添加了 `migration` 方法，用作自动同步。我们在模型上加上了注解 `#[AutoMigrate]`，表示该模型需要进行自动同步。在模型中定义 migration 方法，实现了数据表的自动同步。

需要注意的是，模型的注解和自动同步功能，只适用于模型所在应用的数据库。在进行自动同步时，会根据数据库中已有的表结构进行比对，如果发现新的字段，则自动添加到数据表中；如果发现已经被删除的字段，则自动从数据表中删除。

框架会自动扫描 app 目录内的所有模型的注解，对加入了自动迁移注解 `#[AutoMigrate]` 的数据模型进行同步。

## 数据库同步命令

DuxLite 提供了 `db:sync` 命令，用于将数据表更新到最新的结构。

```php
./dux db:sync
```

使用该同步机制，我们可以把应用很方便的进行拆分出去提供给他人使用。
