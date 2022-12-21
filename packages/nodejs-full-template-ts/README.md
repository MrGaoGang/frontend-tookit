# 基于 docker 的 prisma + eggjs + typescript 的后端请求模板

## 拥有的能力

- [x] `ORM`: [prisma](https://www.prisma.io/docs/getting-started/quickstart)
- [x] `eggjs`
- [x] `mysql`
- [ ] `redis`
- [x] jwt-token: 基于 `jsonwebtoken` + `koa-jwt`; 为什么不使用 egg-jwt? 因为此项目很久没人维护了
  - [x] 用户登录
  - [x] 基于md5的密码加密
  - [x] 用户注册
  - [x] 登录态校验



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
