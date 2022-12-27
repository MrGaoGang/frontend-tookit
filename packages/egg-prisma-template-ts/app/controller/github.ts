import axios from 'axios';
import { Controller } from 'egg';

export default class GithubController extends Controller {
  async login() {
    const ctx = this.ctx;
    const { code = '8033cdd88eb6e6768ef5' } = ctx.request.query;
    if (code) {
      if (!process.env.GITHUB_LOGIN_CLIENT_ID) {
        console.error('please config GITHUB_LOGIN_CLIENT_ID in .env file');
        return;
      }
      try {
        const { data } = await axios.post(
          'https://github.com/login/oauth/access_token',
          {
            client_id: process.env.GITHUB_LOGIN_CLIENT_ID,
            code,
            client_secret: process.env.GITHUB_LOGIN_CLIENT_SECRET
          },
          {
            timeout: 60000,
            headers: {
              Accept: 'application/json'
            }
          }
        );
        if (data?.error) {
          ctx.fail(data.error_description);
          return;
        }
        const response = await axios.get('https://api.github.com/user', {
          timeout: 60000,
          headers: {
            Authorization: `token ${data.access_token}`
          }
        });
        ctx.success(response.data);
      } catch (error) {
        ctx.logger.error(error);
        ctx.fail();
      }
    } else {
      ctx.fail('github login failed, not get code');
    }
  }
}
