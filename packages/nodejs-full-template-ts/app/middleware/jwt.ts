import { Context } from 'egg'
import { StatusCode } from '../const/status'
import { API_LOGIN_ROUTER, API_WECHAT_LOGIN_ROUTER } from '../router/const'

const whitePathList = [
  API_LOGIN_ROUTER.LOGIN,
  API_LOGIN_ROUTER.REGISTER,
  API_WECHAT_LOGIN_ROUTER.MINI_LOGIN
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_options: any) => {
  return async function jwt(ctx: Context, next) {
    const token = ctx.request.header.authorization
    // white path list
    if (whitePathList.includes(ctx.path)) {
      await next()
      return
    }
    let decode
    if (token) {
      try {
        // decode token
        decode = ctx.app.jwt.verify(token as string, ctx.app.config.jwt.secret)

        // firt find token in redis
        // todo
        // if redis has not found , find in db
        const userToken = await ctx.service.user.findUserToken(decode.uid)

        if (!userToken) {
          ctx.result(StatusCode.UnAuthorized, 'current user token is incorrect')
          return
        }

        if (token === userToken.token) {
          await next()
        } else {
          ctx.result(StatusCode.UnAuthorized, 'the account has login in other device')
          return
        }
      } catch (error) {
        ctx.result(StatusCode.UnAuthorized, 'token has expired or not incorrect')
        return
      }
    } else {
      ctx.result(StatusCode.UnAuthorized, 'token has not found')
      return
    }
  }
}
