import { Controller } from 'egg';
import { StatusCode } from '../const/status';
import { encode } from '../utils/encode';

export default class AuthorController extends Controller {
  public async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    if (username && password) {
      const data = await ctx.service.user.findUser(username, password);
      if (data) {
        // is correct
        const token = app.jwt.sign(
          {
            username,
            password: encode(password),
            uid: data.uid
          },
          app.config.jwt.secret
        );
        // update token
        await ctx.service.user.updateUserToken(data.uid, token);
        ctx.success(
          {
            token
          },
          'login success'
        );
      } else {
        ctx.result(StatusCode.UnAuthorized, 'username/password is not correct');
      }
    } else {
      ctx.fail('username and password should be not null');
    }
  }

  public async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (username && password) {
      const data = await ctx.service.user.registerUser(username, password);
      if (typeof data === 'boolean') {
        ctx.fail('current use has exist, please do login');
        return;
      }
      if (data) {
        ctx.success({}, 'user register success');
      } else {
        ctx.fail('username/password should not be null');
      }
    } else {
      ctx.fail('username and password should be not null');
    }
  }
}
