---
lang: zh-CN
title: 类库
---


DuxLite 封装了常用类库的加载，使用时无需去实例化类，并且返回原类对象，拥有完整的代码提示与类库文档。

## 注册应用

您可以在入口文件中 `run()` 方法执行前调用该方法进行加载应用入口类

```php 
\Dux\App::registerApp(array $class)
```

## 配置类

使用配置类可以方便地读取和修改配置文件。它封装了 [noodlehaus/config](https://packagist.org/packages/noodlehaus/config) 类库中的加载。

- `$name` 为 config 目录下的 yaml 配置文件名，返回 `noodlehaus/config` 类库中的方法 
- `app.name` 为多级结构，可通过 `.` 来获取任意级别配置项


```php 
// 配置实例
$config = \Dux\App::config(string $name);
// 读取配置项
$config->get('app.name');
// 设置配置项
$config->set('app.name', 'test');
```

针对一些特殊的使用可以在值内使用 `%base_path%` 代表当前项目路径。

## 缓存类

使用该类可设置和获取缓存数据，该类使用 [phpfastcache](https://github.com/PHPSocialNetwork/phpfastcache) 作为类库，返回 Psr-16 标准的方法。

```php 
// 缓存实例
$cache = \Dux\App::cache();
// 读取缓存
$config->get('test-key');
// 设置缓存
$config->set('test-key', 'lorem ipsum', 300); // 300秒
```

## 依赖注入

该类使用 [PHP-DI](https://php-di.org/doc/container.html) 作为容器类，同时建议在应用入口中的 `init` 方法内进行注册依赖。


```php 
// DI 实例
$di = \Dux\App::di();
// 设置对象到容器
$di->set(Test::class, new Test());
// 从容器获取对象
$di->get(Test::class);
```

## 数据验证

该类使用 [vlucas/valitron](https://github.com/vlucas/valitron) 作为验证器，并封装了一个验证方法，使得传递数组即可轻松验证任意数据。

```php
/**
 * 对传入的数据进行验证，如果有任何验证错误则会抛出验证失败的异常 ExceptionValidator
 *
 * @param array $data 需要验证的数据
 * @param array $rules 验证规则
 * @return void
 * @throws ExceptionValidator 验证失败时抛出的异常
 */
\Dux\App::validator(array $data, array $rules): Data
```

参数说明：

- `$data` 需要验证的数据，应该是一个键值对数组。
- `$rules` 验证规则，应该是一个键值对数组，其中键为需要验证的字段名，值为验证规则数组。规则中最后一个元素代表失败消息，之前为验证规则。

返回值：

- 返回一个 `Data` 对象，可以通过对象方法取出传递进去的验证数据。

异常说明：

- 如果数据验证失败，则会抛出异常 ExceptionValidator，其中包含了验证失败的消息与字段，无需拦截该异常直接返回前端处理。

以下是一个使用示例：

```php 
$source = [
    "score" => 6,
    "content" => "评价内容"
];

$rule = [
    "score#1" => ["min", 1, "评分太低"],
    "score#2" => ["min", 5, "评分太高"],
    "content" => ['required', '请输入评价内容']
];

\Dux\App::validator($source, $rule);
```


## ORM对象

调用该方法返回实例化后的 `Eloquent` 对象，更多使用文档请查看 [数据库查询](https://learnku.com/docs/laravel/9.x/database/12245)

```php
获取 DB 对象
$db = \Dux\App::db();

// 开启事务
\Dux\App::db()->getConnection()->beginTransaction();

// 提交事务
\Dux\App::db()->getConnection()->commit();

// 回滚事务
\Dux\App::db()->getConnection()->rollBack();
```

该方法返回 Eloquent 对象，可以进行数据库查询操作，也可以使用 `getConnection` 方法获取连接对象，从而实现事务操作。

## 日志类

日志使用 [Seldaek/monolog](https://github.com/Seldaek/monolog) 作为日志系统：

```php
/**
 * 获取日志实例
 *
 * @param string $app 日志文件存放的文件名称
 * @return \Monolog\Logger 日志类实例
 */
$log = \Dux\App::log(string $app = "default");
```
返回的 `$log` 为 `Monolog\Logger` 类的实例化对象，具体使用方式可以参考 Seldaek/monolog 的文档。

此外，可通过调用 `Monolog\Logger` 对象中的方法，写入不同级别的日志：

```php
// 写入 Debug 日志
$db->debug('Debug message');

// 写入 Info 日志
$db->info('Info message');

// 写入 Error 日志
$db->error('Error message');
```

## 队列类

框架提供了一个队列类来实现队列管理，该类基于 [Enqueue/Redis](https://php-enqueue.github.io/transport/redis/) 实现，并对其进行了二次封装。

使用队列类需要先调用以下方法来创建队列实例：

```php
// $type 为队列类型，目前暂时只支持 Redis，并且默认为redis
$queue = \Dux\App::queue(string $type = "");
```

可以通过以上方法创建一个队列实例。接着，可以使用以下方法将任务添加到队列中：

```php
$group = 'default';

$queue
->add(string $group)
->callback(string $class, string $method = "", array $params = [])
->delay(int $millisecond)
->send();

```

通过以上方法，可以将任务添加到队列中。其中，$group 是队列分组，通过队列执行命令可以运行不同的分组。$class 是回调类名，$method 是回调方法，$params 是回调参数，$millisecond 是延迟时间（以微秒为单位）。

接着，可以使用以下命令运行队列：

```bash
#运行默认队列
./dux queue

#运行自定义组队列
./dux queue custom
```

可以使用守护进程执行多个队列命令来实现并发效果，并且多个队列之间不会重复执行同一任务。


## 视图类

该框架使用 [nette/latte](https://latte.nette.org/) 作为 PHP 视图。您可以使用视图类，将PHP渲染为模板，并输出给用户。对于CMS网站来说，这非常有用。

```php 
// $name 为缓存名，代表该模板组的缓存目录
$view = \Dux\App::view(string $name = "");

// 返回渲染后字符串，可通过路由回调进行输出
$html = $view->renderToString(dirname(__DIR__) . "/home.html", [
    "title" => "标题",
]);

```

以下为模板文件
```html
<h1>{$title}</h1>
```

最终会渲染为

```html
<h1>标题</h1>
```

有关模板标签的详细信息，请查看 nette/latte 文档。

## 文件存储类

框架使用 [league/flysystem](https://github.com/thephpleague/flysystem) 作为文件存储类，利用不同的驱动可将文件上传至本地服务器或者七牛云等云存储。


```php 
$storage = \Dux\App::storage(string $type = "");
```

如果不指定 `$type`，则将使用配置文件中默认的驱动程序。此方法返回 `Filesystem` 类的一个实例，用于处理文件。以下是该类中一些常用的方法：

```php 
// 将文件写入文件系统中。其中 $path 表示文件路径，$contents 表示文件内容。
$storage->write($path, $contents);

// 将指定的文件流写入文件系统中。其中 $path 表示文件路径，$resource 表示文件流。
$storage->writeStream($path, $resource);

// 读取文件系统中指定的文件。其中 $path 表示文件路径。
$storage->read($path);

// 将指定的文件读取到文件流中。其中 $path 表示文件路径。
$storage->readStream($path);

// 删除文件系统中指定的文件。其中 $path 表示文件路径。
$storage->delete($path);

// 获取文件在文件系统中的 URL。其中 $path 表示文件路径。
$storage->getUrl($path);
```

有关更多方法和使用说明，请参阅[api文档](https://flysystem.thephpleague.com/docs/usage/filesystem-api/)

## Redis类

Redis类为php扩展，框架仅做实例化配置的封装与连接，具体使用方法参考 [php-redis](https://github.com/phpredis/phpredis)

该方法返回一个 `Redis` 的实例
```php 
$storage = \Dux\App::redis(int $database = 0, string $name = "default");
```
其中 `$database` 为数据库编号，`$name` 为在配置文件中指定的 `Redis` 配置名称。

以下为常用的 Redis 方法示例：

```php 
// 设置 Redis 的 key 值
$redis->set('key', 'value');

// 获取 Redis 的 key 值
$value = $redis->get('key');

// 删除 Redis 的 key 值
$redis->del('key');

// 判断 Redis 的 key 值是否存在
$exists = $redis->exists('key');

```