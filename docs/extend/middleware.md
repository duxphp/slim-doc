---
lang: zh-CN
title: 中间件
---

中间件是在路由处理器之前或之后执行的代码，它可以用于验证请求、更改请求/响应等，中间件的开发请参考 [slim](https://www.slimframework.com/docs/v4/concepts/middleware.html)。

## JWT 认证

JWT认证是一种无状态的认证方式，通过对 token 的签名校验，验证用户身份并授权访问资源，秘钥通过配置文件的 `app.secret` 进行加解密。

### 中间件使用

为了简化开发流程，我们提供了一个JWT认证中间件 `\Dux\Auth\AuthMiddleware` ，您可以在需要进行身份认证的路由中使用它：

```php
$app->get('/profile', function ($request, $response, $args) {
    // 验证身份，通过后返回用户信息
})->add(new \Dux\Auth\AuthMiddleware('webapp', 3600));
```

在这个例子中，我们对 `/profile` 这个路由进行了认证，并设置了认证应用名为 `webapp` ，续期时间为 `3600`
秒。如果当前请求没有携带有效的 `token` ，则会返回 `401 Unauthorized`。

如果当前的认证时间超过了续期时间，则会在返回的 header 中加入 Authorization 参数。该参数为续期后的 token，请将该 Token 进行替换。

您可以通过路由内的以下方法获取 Token 的解密参数：

```php 
$request->getAttribute('auth');
```

### token 生成

在需要获取 token 的代码中进行调用以下方法获取token：

```php 
$token = \Dux\Auth\Auth::token('webapp', ['user_id' => 1234], 3600 * 24);
```

在这个例子中，我们生成了一个有效期为 1 天（即 3600 * 24 秒）的 token，同时传入了用户 id 为 1234 的参数。注意，参数列表可以根据您的实际需求进行调整。

### 中间件构造

该类实现了JWT认证中间件的功能。以下是该类的构造方法：

```php
new \Dux\Auth\AuthMiddleware(string $app, int $renewal = 3600);
```

### 获取 token 方法

```PHP
\Dux\Auth\Auth::token(string $app, array $params = [], int $expire = 86400) : string
```

- $app 认证应用名，用来区分不同的端口认证。
- $params JWT 参数，可将用户 id 等参数进行传递，默认为空数组。
- $expire 过期时间，单位秒，默认为 86400。过期时间必须大于续期时间，否则续期将会失效。


### 请求方法

您可以将 `token` 放置在 `hedaer` 头的 `Authorization` 参数中， 或者或者 `cookie` 的`token`键中，进行请求，请根据实际使用场景进行选择。


## Api 签名

### 中间件使用

在进行 API 调用时，为了防止在传输过程中对请求资源进行篡改，需要对 `url` 与 `body` 进行签名。推荐使用 HTTPS 协议进行传输。可以使用中间件实现签名，如下所示：


```php 
new \Dux\Api\ApiMiddleware($callback);
```

需要通过闭包返回资源的秘钥 `SecretKey` 进行签名计算，闭包参数会传递授权 `id` 用来交换。示例如下：

```php
new \Dux\Api\ApiMiddleware(function($id) {
    return '098f6bcd4621d373cade4e832627b4f6';
});
```


### 请求方法

请求需要签名的接口时需要附加以下 `header` 参数：

- Content-Date: 当前时间戳，精确到秒
- AccessKey: 授权 id
- Content-MD5: 签名结果


### 签名字符串计算

签名使用 HMAC-SHA256 算法进行计算，需要使用以下字符串：

- `url路径` 不包含域名与参数。形式如：\api\path
- `url参数` 路径之后的参数。将参数按照参数名的 ASCII 码从小到大排序，每个参数的键值对用 = 连接，不同参数之间用 & 连接，并进行 URL encode。形式如：id=1&type=2
- `body 的 MD5`，计算请求 body 内容的 md5 值。形式如：{"content": ""}
- `时间戳` 当前时间的时间戳与 HTTP Header 中的 Content-Date 头一致。形式如：1676178239

将以上生成的原始字符串按照如下格式进行拼接：

```
urlPath + \n(换行符)
urlQuery + \n(换行符)
bodyMD5 + \n(换行符)
timestamp
```
如果签名参数中某一参数为空值请依旧留出`换行符`。

### 签名计算方法

将签名字符串进行 HMAC-SHA256 算法计算，使用 SecretKey 作为密钥。将结果转换为十六进制字符串，即为签名结果。计算方法如下：

```makefile
sign = hmac_sha1(signingStr, "<SecretKey>")
```

### 签名结果示例

以下是一个示例签名字符串：

```makefile
\api\path
id=1&type=2
{"content": ""}
1676178239
```

使用示例中给定的 SecretKey 计算签名结果如下：

``` 
e6e0ba80f943baf1d1196ec98d6f5cd77be12c48e5fa6f0b30a587a42af559c1
```
