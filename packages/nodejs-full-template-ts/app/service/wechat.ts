import { Service } from 'egg';
import axios from 'axios';
interface MiniAppLoginResponse {
  openid: string;
  session_key: string;
  unionid: string;
}

export default class WechatService extends Service {
  /**
   * 小程序登录
   * @param jsCode
   * @return
   */
  async miniLogin(jsCode: string): Promise<MiniAppLoginResponse | null> {
    const APP_URL = 'https://api.weixin.qq.com/sns/jscode2session';
    const APP_ID = process.env.WECHAT_MINI_APP_ID; // 小程序的app id ，在公众开发者后台可以看到
    const APP_SECRET = process.env.WECHAT_MINI_APP_SECRET; // 程序的app secrect，在公众开发者后台可以看到

    return await axios
      .get(APP_URL, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          appid: APP_ID,
          secret: APP_SECRET,
          js_code: jsCode,
          grant_type: 'authorization_code'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
        return null;
      });
  }
}
