import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const data = await ctx.service.user.findOrCreate();
    ctx.success(data);
  }
}
