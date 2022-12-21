import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { Options } from 'koa-jwt'
export default (appInfo: EggAppInfo) => {
  // default eggjs config
  const config = {} as PowerPartial<
    EggAppConfig & {
      jwt: Options
    }
  >

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1671526806105_9320'

  // add your egg config in here
  config.middleware = ['jwt']

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  }

  // https://github.com/eggjs/egg-security
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  }

  // 在这里配置 跨域
  config.cors = {
    origin: '*',
    allowMethods: ['GET', 'POST']
  }

  // jwt
  config.jwt = {
    // please replace the secret
    secret: '123456'
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
