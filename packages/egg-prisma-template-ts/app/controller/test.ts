import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const data = await ctx.service.test.findOrCreate();
    ctx.success(data);
  }
  public async allUsers() {
    const { ctx } = this;
    const data = await ctx.service.test.findAllUsers();
    ctx.success(data);
  }
}
