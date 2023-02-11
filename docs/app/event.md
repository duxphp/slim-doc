---
lang: zh-CN
title: 事件调度
---

事件调度可以实现模块化代码的松耦合。通过将代码按照事件的发生顺序进行分离和组合，不同的代码模块可以专注于自己的业务逻辑，而不需要了解或修改其他模块的实现细节。这样可以使得代码结构更加清晰、易于维护和扩展。另外，事件调度还可以允许多个模块并行执行，从而提高代码执行效率和性能。

Dux事件调度采用 [symfony](https://github.com/symfony/event-dispatcher) 事件调度器，只封装了加载过程，详细使用方法请查看原文档。

## 监听器注册


监听器用于监听事件触发，触发时执行监听器的回调代码。建议在应用入口文件 `App.php` 的 `register` 方法中进行注册，如下所示：

```php
// 监听 test 事件
$app->getEvent()->addListener("test", function (TestEvent $event) {
    echo $event->getName();
    $event->set("hello world!");
});
```

## 事件类

事件类用户调度事件时返回给监听器的类。通过此类，可以共享方法给监听器或者外部进行进一步处理。示例如下：

```php 
<?php

use Symfony\Contracts\EventDispatcher\Event;

class TestEvent extends Event
{
    public function __construct(
        public string $name
    )
    {}
    
    public function set($name): void
    {
        $this->name = $name;
    }
    
    public function get(): string
    {
        return $this->name;
    }
}
```

## 触发事件

在注册后，您可以在任意后续代码中进行事件触发(调度)，示例如下：

```php
// 使用 TestEvent 类触发 test 事件
$event = new TestEvent('init');
\Dux\App::event()->dispatch($event, 'test');
echo $event->get();
```

输出结果如下：
```bash
init
hello world!
```

