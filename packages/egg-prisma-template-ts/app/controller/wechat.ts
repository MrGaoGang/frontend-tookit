import { Controller } from 'egg';

export default class WechatController extends Controller {
  /**
   * mini app login
   */
  public async miniLogin() {
    const { js_code = '' } = this.ctx.request.query;
    if (js_code) {
      const result = await this.ctx.service.wechat.miniLogin(js_code);
      this.ctx.success(result);
    } else {
      this.ctx.fail('需要传递js_code 参数: wx.login 获取的 code');
    }
  }
}
