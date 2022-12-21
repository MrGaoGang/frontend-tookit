import { PrismaClient } from '@prisma/client'

import koajwt from 'koa-jwt'
import jwt, {
  Secret,
  SignOptions,
  SignCallback,
  GetPublicKeyOrSecret,
  VerifyOptions,
  VerifyCallback,
  Jwt
} from 'jsonwebtoken'
import { EggAppConfig } from 'egg'
const JWT = Symbol('Application#jwt')
const prisma = new PrismaClient()

type JWTToken = {
  /**
   * call jsonwebtoken's sign() method
   * @param payload datas. datas to be signed
   * @param secretOrPrivateKey secret key. string or { key, passphrase }
   * @param options jwt options。see more details in https://github.com/auth0/node-jsonwebtoken
   * @param callback callback
   */
  sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string,
    options?: SignOptions,
    callback?: SignCallback
  ): string
  /**
   * call jsonwebtoken's verify() method
   * @param token jwt token.
   * @param secretOrPrivateKey secret key。string or { key, passphrase }
   * @param options jwt options。see more details in https://github.com/auth0/node-jsonwebtoken
   * @param callback callback
   */
  verify(
    token: string,
    secretOrPrivateKey: string,
    options?: VerifyOptions,
    callback?: VerifyCallback
  ): string

  /**
   * call jsonwebtoken's decode() method
   * @param token jwt token
   */
  decode(token: string): string
}

export default {
  prisma,
  get jwt(): JWTToken {
    if (!this[JWT]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const config = (this.config as EggAppConfig).jwt
      this[JWT] = koajwt(config)

      this[JWT].sign = (
        payload: string | Buffer | object,
        secret: Secret,
        options: SignOptions,
        callback: SignCallback
      ) => {
        if (typeof options === 'function') {
          callback = options
          options = {}
        }

        return jwt.sign(payload, secret, Object.assign({}, config.sign || {}, options), callback)
      }

      this[JWT].verify = (
        token: string,
        secret: Secret | GetPublicKeyOrSecret,
        options: VerifyOptions & { complete?: true },
        callback: VerifyCallback<Jwt>
      ) => {
        if (typeof options === 'function') {
          callback = options
          options = {}
        }

        return jwt.verify(token, secret, Object.assign({}, config.verify || {}, options), callback)
      }

      this[JWT].decode = jwt.decode
      //   this[JWT].UnauthorizedError = UnauthorizedError;
    }
    return this[JWT]
  }
}
