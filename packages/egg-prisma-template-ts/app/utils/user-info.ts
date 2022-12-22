import { Context } from 'egg';

/**
 * get user id in header or token
 * @param ctx
 */
export function getUserId(ctx: Context): string {
  const id = ctx.request.query.user_id as string;
  if (!id) {
    const token = ctx.request.header.authorization;
    const decode = ctx.app.jwt.verify(token as string, ctx.app.config.jwt.secret) as any;
    return decode.uid;
  }

  return id;
}
