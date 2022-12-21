import { Context } from '../../typings/app';

export default {
  result(code = 200, msg = 'success', data = {}, isSuccess = true) {
    const ctx = (this as unknown as Context);
    ctx.body = {
      code,
      success: isSuccess,
      msg,
      data,
    };
  },
  /**
       * response to success
       * @param data data
       * @param msg
       */
  success(data, msg = 'success') {
    this.result(200, msg, data);
  },

  /**
       * response to error
       * @param msg  error message
       */
  fail(msg = 'Internal error!') {
    this.result(500, msg, {}, false);
  },
};
