import { Context } from '../../typings/app';

export default {
  result(data, msg = 'success', code = 200, isSuccess = true) {
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
    this.result(data, msg);
  },

  /**
       * response to error
       * @param msg  error message
       */
  fail(msg = 'Internal error!') {
    this.result({}, msg, 500, false);
  },
};
