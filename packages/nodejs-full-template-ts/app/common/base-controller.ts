import { Controller } from 'egg';

/**
 * base container
 */
export class BaseController extends Controller {
  protected result(data, msg = 'success', code = 200, isSuccess = true) {
    this.ctx.body = {
      code,
      success: isSuccess,
      msg,
      data,
    };
  }
  /**
   * response to success
   * @param data data
   * @param msg
   */
  success(data, msg = 'success') {
    this.result(data, msg);
  }

  /**
   * response to error
   * @param msg  error message
   */
  fail(msg = 'Internal error!') {
    this.result({}, msg, 500, false);
  }
}
