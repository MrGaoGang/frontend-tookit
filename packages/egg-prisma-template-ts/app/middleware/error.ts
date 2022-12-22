import { Context } from 'egg';

export default () => {
  return async function error(ctx: Context, next) {
    try {
      await next();
    } catch (error) {
      console.error(error);
      ctx.fail();
    }
  };
};
