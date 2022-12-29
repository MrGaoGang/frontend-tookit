import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { Options } from 'koa-jwt';
export default (appInfo: EggAppInfo) => {
  // default eggjs config
  const config = {} as PowerPartial<
    EggAppConfig & {
      jwt: Options;
    }
  >;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1671526806105_9320';

  // add your egg config in here
  config.middleware = ['jwt'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // https://github.com/eggjs/egg-security
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  };

  // 在这里配置 跨域
  config.cors = {
    origin: '*',
    allowMethods: ['GET', 'POST']
  };

  // jwt
  config.jwt = {
    // please replace the secret
    secret: process.env.JWT_TOKEN_SECRET || 'mrgaogang'
  };

  // redis use  ioredisv5

  config.redis = {
    Redis: require('ioredis'),
    client: {
      port: process.env.REDIS_PORT || 6379, // Redis port
      host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD || 'auth',
      db: 0,
      // this redis instance won't block app start
      weakDependent: true,
    }
  };

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

  if (process.env.FILE_UPLOAD_TYPE === 'oss') {
    // https://github.com/eggjs/egg-oss
    config.oss = {
      region: process.env.FILE_UPLOAD_OSS_REGION,
      accessKeyId: process.env.FILE_UPLOAD_OSS_ACCESS_KEY,
      accessKeySecret: process.env.FILE_UPLOAD_OSS_ACCESS_SECRET,
      bucket: process.env.FILE_UPLOAD_OSS_BUCKET,
      endpoint: process.env.FILE_UPLOAD_OSS_ENDPOINT,
      timeout: '60s'
    };
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
