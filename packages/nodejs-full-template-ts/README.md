# 基于 docker 的 prisma + eggjs + typescript 的后端请求模板

## 一、拥有的能力

- [x] `ORM`: [prisma](https://www.prisma.io/docs/getting-started/quickstart)
- [x] `eggjs`
- [x] `mysql`: 默认使用 `mysql`, 也可一键切换成 `PostgreSQL` 、 `SQL Server`
- [x] jwt-token: 基于 `jsonwebtoken` + `koa-jwt`; 为什么不使用 egg-jwt? 因为此项目很久没人维护了
  - [x] 用户登录
  - [x] 基于 md5 的密码加密
  - [x] 用户注册
  - [x] 登录态校验
- [ ] `redis`
- [ ] `docker`
- [ ] 微信登录鉴权
- [ ] `github` 登录鉴权

内置的插件:

- [onerror](https://github.com/eggjs/egg-onerror) 统一异常处理
- [Session](https://github.com/eggjs/egg-session) Session 实现
- [i18n](https://github.com/eggjs/egg-i18n) 多语言
- [watcher](https://github.com/eggjs/egg-watcher) 文件和文件夹监控
- [multipart](https://github.com/eggjs/egg-multipart) 文件流式上传
- [security](https://github.com/eggjs/egg-security) 安全
- [development](https://github.com/eggjs/egg-development) 开发环境配置
- [logrotator](https://github.com/eggjs/egg-logrotator) 日志切分
- [schedule](https://github.com/eggjs/egg-schedule) 定时任务
- [static](https://github.com/eggjs/egg-static) 静态服务器
- [jsonp](https://github.com/eggjs/egg-jsonp) jsonp 支持
- [view](https://github.com/eggjs/egg-view) 模板引擎

## 二、如何使用

### 安装模板

```bash


```

### 安装依赖

```bash
npm i
```

### 项目配置

1. 配置数据库

```bash
# .env

# 记得更换成自己的用户名+密码+数据库
DATABASE_URL="mysql://root:my-secret-pw@localhost:3307/node_template"

```

同步数据库+基础表

```bash
npm run db:c
```

2. 配置 `token` 秘钥

```js
// ./config/config.default.ts
// jwt
config.jwt = {
  // please replace the secret
  secret: '123456'
}
```


## 三、项目测试

```bash
npm run dev
```

### 用户注册

![](./docs//imgs/register.png)


### 用户登录

![](./docs//imgs/login.png)

### 接口测试/鉴权测试

![](./docs//imgs/test.png)