---
lang: zh-CN
title: 函数库
---

## base_path

返回基础路径和可选子路径的完整路径字符串。

```php 
base_path(string $path = ""): string
```

## app_path

返回应用程序路径和可选子路径的完整路径字符串。

```php 
app_path(string $path = ""): string
```

## data_path

返回数据路径和可选子路径的完整路径字符串。

```php 
data_path(string $path = ""): string
```

## public_path

返回公共路径和可选子路径的完整路径字符串。

```php 
public_path(string $path = ""): string
```

## config_path

返回配置路径和可选子路径的完整路径字符串。

```php 
config_path(string $path = ""): string
```

## sys_path

使用基础路径和可选子路径返回完整路径字符串。

```php 
sys_path(string $base = "", string $path = ""): string
```

## now

返回一个Carbon对象，表示当前日期和时间。

```php 
now(): Carbon
```

## dux_debug

使用Symfony VarDumper库打印变量。

```php 
dux_debug(...$args): void
```

## get_ip

返回当前访问的IP地址。

```php 
get_ip()
```

## bc_math

使用bc数学扩展库执行指定的数学运算，并返回结果。

```php 
bc_math(int|float|string $left = 0, string $symbol = '+', int|float|string $right = 0, int $default = 2): string
```

## bc_comp

使用bc数学扩展库比较两个数的大小，返回1、0或-1。

```php 
bc_comp(int|float|string $left = 0, int|float|string $right = 0, int $scale = 2): int
```

## encryption

使用openssl库对字符串进行加密，并返回加密后的十六进制字符串。

```php 
encryption(string $str, string $key = '', string $iv = '', $method = 'DES-CBC'): string
```

## decryption

使用openssl库对加密字符串进行解密，并返回解密后的原始字符串。

```php 
decryption(string $str, string $key = '', string $iv = '', $method = 'DES-CBC'): string
```