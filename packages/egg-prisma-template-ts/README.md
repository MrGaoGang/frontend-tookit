# 基于 docker 的 prisma + eggjs + typescript 的后端请求模板

>  如果有用记得点击一下  ⭐️ 哦

## 一、拥有的能力

- ✅ [prisma](https://www.prisma.io/docs/getting-started/quickstart): `ORM` 框架
- ✅ [`eggjs`](https://www.eggjs.org/zh-CN/tutorials/typescript): 基于 Koa2 的企业级 node 框架
- ✅ `mysql`: 默认使用 `mysql`, 也可一键切换成 `PostgreSQL` 、 `SQL Server`
- ✅ jwt-token: 基于 `jsonwebtoken` + `koa-jwt`; 为什么不使用 egg-jwt? 因为此项目很久没人维护了
  - ✅ 用户登录
  - ✅ 基于 md5 的密码加密
  - ✅ 用户注册
  - ✅ 登录态校验
- ✅ `docker`: 利用 docker 应用部署
- ✅ `redis`: 基于 [ioredis@v5](https://github.com/luin/ioredis) 的 redis 方案
- ✅ 多文件上传
  - ✅ 上传文件到本地
  - ✅ 上传文件到腾讯云 `cos`
  - ✅ 上传文件到阿里云 `oss`
- ✅ `github` 登录鉴权
- [ ] 微信
  - ✅ [微信小程序 登录](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/others/WeChat_login.html)
  - [ ] 微信公众号 登录
- [ ] `swagger api doc`: 基于 `router` 注解的方式自动生成 api 请求文档;

eggjs 内置的插件:

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

git clone https://github.com/MrGaoGang/frontend-tookit.git

```

### 安装依赖

```bash
# 切换到  egg-prisma-template-ts 目录
cd egg-prisma-template-ts

# 安装依赖
npm i
# 启动项目
npm run dev
```

### 模板目录说明

```bash
├─.dockerignore
├─.env -------------------- // 环境变量配置
├─Dockerfile -------------- // docker 构建
├─README.md
├─app
│ ├─common ---------------- // 公共库
│ ├─const ----------------- // 常量
│ │ └─status.ts
│ ├─controller
│ │ ├─auth.ts ------------- // 登录/权限校验【建议保留】
│ │ ├─file.ts ------------- // 文件上传/cos/oss【建议保留】
│ │ ├─home.ts ------------- // 测试
│ │ ├─test.ts ------------- // 测试使用
│ │ └─wechat.ts ----------- // 微信登录【建议保留】
│ ├─extend ---------------- // egg 扩展
│ │ ├─application.ts ------ // 主要扩展了 prisma/cos/jwt
│ │ └─context.ts
│ ├─middleware ------------ // 中间件
│ │ ├─error.ts
│ │ └─jwt.ts -------------- // token校验
│ ├─public
│ │ └─file-upload.html ---- // 文件上传测试
│ ├─redis ----------------- // redis 处理
│ │ └─token.ts
│ ├─router.ts ------------- // 路由配置
│ ├─service
│ │ ├─file.ts ------------- // 文件操作
│ │ ├─test.ts
│ │ ├─user.ts ------------- // 用户注册/登录
│ │ └─wechat.ts ----------- // 微信登录
│ └─utils ----------------- // 一些工具函数
│   ├─cos.ts
│   ├─encode.ts
│   ├─file.ts
│   ├─uid.ts
│   └─user-info.ts
├─app.ts
├─config
│ ├─config.default.ts ----- // 【重要】各种能力配置
│ ├─config.local.ts
│ ├─config.prod.ts
│ └─plugin.ts
├─package.json
├─prisma
│ └─schema.prisma --------- // 【重要】ORM Model维护
└─tsconfig.json

```

## 三、项目配置

### 1. 配置数据库 及 使用

```bash
# .env

# 记得更换成自己的用户名+密码+数据库
DATABASE_URL="mysql://root:my-secret-pw@localhost:3307/node_template"

```

若要配置[多个数据库链接，可以点击这里看看](https://github.com/prisma/prisma/issues/2443#issuecomment-630679118) 

同步数据库+基础表

```bash
npm run db:c
```

**操作 DB**

> 整个操作 db 时 基于 Prisma ORM 框架做的； 具体可参加: [prisma crud](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

样例如下:

```ts
// ./app/services/user.ts
export default class UserServices extends Service {
  public async registerUser(username: string, password: string): Promise<User | null | boolean> {
    const { prisma } = this.app;

    const has = await this.findUser(username, password);
    if (has) {
      return true;
    }
    const user = await prisma.user.create({
      data: {
        username,
        password: encode(password),
        uid: getUUID()
      }
    });
    return user;
  }

  public async findUser(
    username: string,
    password: string,
    original = false
  ): Promise<User | null> {
    const { prisma } = this.app;
    const user = await prisma.user.findFirst({
      where: {
        username,
        password: original ? password : encode(password)
      }
    });
    return user;
  }
}
```

### 2. jwt 配置 及 `token` 秘钥

```bash
#  .env
# jwt token 秘钥
JWT_TOKEN_SECRET = "mrgaogang" # 记得换成自己的秘钥哦

```

**jwt 及 登录态校验 已默认集成，有兴趣可参考文件 app/extend/application.ts 和 app/middleware/jwt.ts**

### 3. redis 的配置和使用

如果您只有单个 只需要在 `.env` 文件中配置即可

```bash
# redis 配置
# redis 端口
REDIS_PORT = 6379
# redis host
REDIS_HOST= "127.0.0.1"
# redis 密码
REDIS_PASSWORD = "auth"

```

若想进一步对 redis 进行配置可以在如下文件中配置

```js
// ./config/config.default.ts
config.redis = {
  Redis: require('ioredis'),
  client: {
    port: process.env.REDIS_PORT || 6379, // Redis port
    host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
    password: process.env.REDIS_PASSWORD || 'auth',
    db: 0
    // this redis instance won't block app start
    // weakDependent: true,
  }
};
```

**redis 的使用**

```ts
// 设置
this.app.redis.set(key, value);
// 获取
this.app.redis.get(key);
```

### 4. 文件上传

体验测试:

> 启动后访问 `http://localhost:7001/public/file-upload.html` 页面 修改一下 里面的 `user_id` 为自己的 用户 id

**文件大小/后缀配置**

```ts
// ./config/config.default.ts

// https://eggjs.github.io/zh/guide/upload.html#%E6%96%87%E4%BB%B6%E5%A4%A7%E5%B0%8F
// upload file comnfig
config.multipart = {
  // new extension
  fileExtensions: ['.mov', '.mp4'],
  // form field name size
  fieldNameSize: 100,
  // form field  size
  fieldSize: '1gb',
  // form max field number
  fields: 10,
  // single file size
  fileSize: '300mb',
  // max upload file number
  files: 10
};
```

#### 上传到本地

**文件存储配置**

```bash
# 文件上传 环境变量

# 文件上传类型 是本地存储，还是腾讯云cos / 阿里oss
FILE_UPLOAD_TYPE = "local" # 可选值 local/cos/oss

# 本地存储文件夹
FILE_UPLOAD_PATH = "/uploads/"

```

**自定义文件上传**

```ts
// packages/egg-prisma-template-ts/app/utils/file.ts

export async function fileStorageToLocal(ctx: Context, part: any): Promise<UserFiles | null> {
  // ....
}
```

#### 上传到阿里云存储 oss

**文件存储配置**

```bash
# .env

# 文件上传类型 是本地存储，还是腾讯云cos / 阿里oss
FILE_UPLOAD_TYPE = "oss" # 可选值 local/cos/oss

# 本地存储文件夹
FILE_UPLOAD_PATH = "/uploads/"

# 文件上传 环境变量
# access key
FILE_UPLOAD_OSS_ACCESS_KEY = "your access key"
# access 秘钥
FILE_UPLOAD_OSS_ACCESS_SECRET = "your access secret"
# 存储桶名称
FILE_UPLOAD_OSS_BUCKET = "your bucket name"
# 存储地区
FILE_UPLOAD_OSS_REGION = "your region"

FILE_UPLOAD_OSS_ENDPOINT = "{https or http}://{your endpoint name}.aliyun.com"


```

**自定义文件上传**

```ts
// packages/egg-prisma-template-ts/app/utils/file.ts

export async function fileStorageToOSS(ctx: Context, part: any): Promise<UserFiles | null> {
  // ....
}
```

#### 上传到腾讯云存储 coss

**文件存储配置**

```bash
# .env

# 文件上传类型 是本地存储，还是腾讯云cos / 阿里oss
FILE_UPLOAD_TYPE = "cos" # 可选值 local/cos/oss

# 本地存储文件夹
FILE_UPLOAD_PATH = "/uploads/"

# 如果 FILE_UPLOAD_TYPE 为 腾讯云的 cos ；则需要配置如下环境变量

# access key
FILE_UPLOAD_COS_ACCESS_KEY = "your access key"
# access 秘钥
FILE_UPLOAD_COS_ACCESS_SECRET = "your access secret"
# 存储桶名称
FILE_UPLOAD_COS_BUCKET = "your bucket"
# 存储地区
FILE_UPLOAD_COS_REGION = "your region"


```

**自定义文件上传**

```ts
// packages/egg-prisma-template-ts/app/utils/file.ts

export async function fileStorageToCos(ctx: Context, part: any): Promise<UserFiles | null> {
  // ....
}
```

### 5. 微信小程序登录配置及使用

在`.env`文件中配置自己的小程序 appid 和 appsecret:

```bash
# .env

# 你的微信 小程序id 在公众开发者后台可以看到
WECHAT_MINI_APP_ID= "your wechat appid"
# 你的微信小程序 secret ，在公众开发者后台可以看到
WECHAT_MINI_APP_SECRET= "your wechat secret"
```

**使用手册**

在小程序中请求如下接口:

```bash
# 请求地址  xxx 为你部署的域名
xxx/wechat/mini/login?js_code=fghjklkhgfghjk

```

### 6. github 登录

要使用登录的前置准备

- 打开 Setting > Developer setting > OAuth applications
- 点击 Register a new application
- 填入基本的 app 信息
  ![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/70f307e9872a4a45dc4b749ae13730cb.png)
- 生成 client_id 和 client_secret

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/5f6361777e20abbea28e324d92b84295.png)

1. 在 `.env`文件中配置上面的 id 和 secret

```bash

GITHUB_LOGIN_CLIENT_ID = "你自己的" # 记得换成自己的github 注册app 时生成的clientid
GITHUB_LOGIN_CLIENT_SECRET = "你自己的secret id"


```

2. **前端访问如下地址即可获取用户信息**

```bash
https://github.com/login/oauth/authorize?client_id=申请的Client ID&scope=user:email
```

**返回的用户信息**

```json
{
  "code": 200,
  "success": true,
  "msg": "success",
  "data": {
    "login": "MrGaoGang",
    "avatar_url": "https://avatars.githubusercontent.com/u/26522968?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/MrGaoGang",
    "html_url": "https://github.com/MrGaoGang",
    "followers_url": "https://api.github.com/users/MrGaoGang/followers",
    "following_url": "https://api.github.com/users/MrGaoGang/following{/other_user}",
    "gists_url": "https://api.github.com/users/MrGaoGang/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/MrGaoGang/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/MrGaoGang/subscriptions",
    "organizations_url": "https://api.github.com/users/MrGaoGang/orgs",
    "repos_url": "https://api.github.com/users/MrGaoGang/repos",
    "events_url": "https://api.github.com/users/MrGaoGang/events{/privacy}",
    "received_events_url": "https://api.github.com/users/MrGaoGang/received_events",
    "type": "User",
    "site_admin": false,
    "name": "高先生",
    "company": null,
    "blog": "https://mrgaogang.github.io",
    "location": "Shenzhen",
    "email": "gaogangwork@qq.com",
    "hireable": null,
    "bio": "Front-end developer【Mendix,\r\nAndroid、RN、Vue、React、iOS、Cocos2d、微信小程序】",
    "twitter_username": null,
    "public_repos": 67,
    "public_gists": 0,
    "followers": 74,
    "following": 5,
    "created_at": "2017-03-19T13:47:28Z",
    "updated_at": "2022-12-18T12:33:28Z"
  }
}
```

访问用户信息失败？检查一下你的网络是否可以访问 github

## 四、项目测试

```bash
npm run dev
```

### 用户注册

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/7f16f2a02684c7308c0ecdbd4f612cf0.png)

### 用户登录

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/32e86ebdb246f799f4d2ea455210f498.png)

### 接口测试/鉴权测试

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/a42a634911ee5ccc6478308cbdfbdb00.png)

## 五、打包部署

```bash

# 构建镜像
docker build -t prisma-egg-node .

# 启动
docker run -p 7001:7001 -d --name prisma-egg-node-instance prisma-egg-node

```
