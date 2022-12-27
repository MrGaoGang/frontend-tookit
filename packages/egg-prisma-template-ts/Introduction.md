## 一、前言

很多时候除开工作，偶尔也喜欢自己在家写一些小东西(小程序、"小网站" 等); 每次都需要 拿 koa/eggjs/nest 去搭建一个 全新的项目，需要多次的处理登录、鉴权、文件上传 等问题；耗时且耗力。

于是本人基于之前开发的一些 node 服务；抽离成了一个简单的 [基于 docker 的 prisma + eggjs + typescript 的后端请求模板](https://github.com/MrGaoGang/frontend-tookit/tree/main/packages/egg-prisma-template-ts)；这样后续就不用每次都单独搭建；如有需要的同学可以尝试尝试。

**聊聊选型吧**

- **先聊一聊 node 框架选型: `eggjs` vs `nestjs`**
  
  之所以没有把`koa`+ `express` + `nextjs` 纳入进来；一方面是希望基于一定的开发规范/约束去做；其次后续准备做一个基于`umi + ant-pro`的前端业务模板；所以暂不考虑 `ssr`。
  - **`nestjs`**
    - 对 ts 天然支持良好
    - 基于 类 `SpringBoot` 的 MVC 思路
    - 通过模块容器-依赖注入维护组件树的模式解决了到处写 import/require 的问题, 不再需要手动维护模块之间的依赖关系;
    - 将现有开发中的一些功能 归纳为 统一的概念: filter、pipe、guard、interceptor
    - 天然支持微服务
    - 自带 swagger 接口文档生成功能
    - 统一约束和规范, 对开发人员强约束
  - **`eggjs`**
    - 通过载入代码-自动挂载代码到对象的方式解决了到处写 import/require 的问题, 不再需要手动维护模块之间的依赖关系;
    - 通过 框架核心 + 插件机制 解耦；大部分的能力通过插件去完成
    - 插件较为丰富，很多功能都有（虽说有些已经停止维护）
    - 学习成本较低，没有太大的心智负担
    - eggjs 实现了 cluser, 自带进程管理和进程间通信功能, 无需额外的 pm2

> 虽说两个框架都使用过，但是对应要**快速的、没有太多学习成本**的去构造一个 `node` 应用；我这边选择了 `eggjs` 作为基础目标; 对于 `typscript` `eggjs` 不支持的问题，社区已有解决方案; 对于 eggjs 很多插件不维护的情况，我这边把 使用到的插件重新内置到项目内，并更新了对应的依赖。其次 有一个不太满意的是，现有的基于装饰器去声明路由，没有一个太好的解决方案，大多还是 要么声明路由，要么单独处理 swagger 文档。这块后续我希望能做成类似于 nestjs 的方式

- **再聊一聊 ORM 选型吧 prisma vs sequlize vs typeorm**

> 如下借用 [prisma vs sequlize](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-sequelize) 和 [prisma vs typeorm](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm)

- `Sequelize` 是一种传统的 ORM，它将表映射到模型类。模型类的实例然后在运行时为应用程序提供 CRUD 查询的接口。
- `TypeORM` 是一种传统的 ORM，它将表映射到模型类。这些模型类可用于生成 SQL 迁移。模型类的实例然后在运行时为应用程序提供 CRUD 查询的接口
- `Prisma` 是一种新型的 ORM，它减轻了传统 ORM 的许多问题，例如臃肿的模型实例、混合业务与存储逻辑、缺乏类型安全性或由延迟加载引起的不可预测的查询

> 说一下个人使用真实感受:
>
> 1. **prisma 的文档写的真的很详细；官方网站的 UI 设计/配图 真的很用心**;
> 2. prisma 默认支持 ts，相比 sequlize 要好很多
> 3. 基于 `schema.prisma` 去描述 model，自动同步数据库；提供了 cli 及 可视化 UI 迁移数据 及 查看数据之间的关联关系



## 二、模板有哪些功能

模板地址:  [egg-prisma-template-ts](https://github.com/MrGaoGang/frontend-tookit/tree/main/packages/egg-prisma-template-ts)

**支持能力(持续完善中)**

- ✅ [prisma](https://www.prisma.io/docs/getting-started/quickstart): `ORM` 框架
- ✅ [`eggjs`](https://www.eggjs.org/zh-CN/tutorials/typescript): 基于 Koa2 的企业级 node 框架
- ✅ `mysql`: 默认使用 `mysql`, 也可一键切换成 `PostgreSQL` 、 `SQL Server`
- ✅ jwt-token: 基于 `jsonwebtoken` + `koa-jwt`; （为什么不使用 egg-jwt? 因为此项目很久没人维护了）
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
- ✅  `github` 登录鉴权
- [ ] 微信
  - ✅ [微信小程序 登录](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/others/WeChat_login.html)
  - [ ] 微信公众号 登录
- [ ] `swagger api doc`: 基于 `router` 注解的方式自动生成 api 请求文档;


## 三、如何使用

### 安装模板

```bash

git clone https://github.com/MrGaoGang/frontend-tookit.git

# 复制 egg-prisma-template-ts 即可

```

### 安装依赖

```bash
# 安装依赖
npm i
# 启动项目
npm run dev
```

## 四、项目配置

### 1. 配置数据库 及 使用

```bash
# .env

# 记得更换成自己的用户名+密码+数据库
DATABASE_URL="mysql://root:my-secret-pw@localhost:3307/node_template"

```

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

> 启动后访问 `http://localhost:7001/public/file-upload.html` 页面 修改一下 里面的 `user_id` 为自己的 用户id


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

GITHUB_LOGIN_CLIENT_ID = "你自己的Id" # 记得换成自己的github 注册app 时生成的clientid
GITHUB_LOGIN_CLIENT_SECRET = "你自己的secretid"


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


## 五、项目测试

```bash
npm run dev
```

### 用户注册

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/7f16f2a02684c7308c0ecdbd4f612cf0.png)

### 用户登录

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/32e86ebdb246f799f4d2ea455210f498.png)

### 接口测试/鉴权测试

![](https://cdn-1252273386.cos.ap-guangzhou.myqcloud.com/images/a42a634911ee5ccc6478308cbdfbdb00.png)

## 六、打包部署

```bash

# 构建镜像
docker build -t prisma-egg-node .

# 启动
docker run -p 7001:7001 -d --name prisma-egg-node-instance prisma-egg-node

```
