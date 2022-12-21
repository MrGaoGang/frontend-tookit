import { Controller } from 'egg';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.success({
      test: 'you can use /test to create user',
      findAll: 'you can use /test/users to use token find  all user'
    });
  }
}
