import { Application } from 'egg'
import { API_LOGIN_ROUTER } from './router/const'
export default (app: Application) => {
  const { controller, router } = app
  router.get('/', controller.home.index)

  // only use test
  router.get('/test', controller.test.index)
  router.get('/test/users', controller.test.allUsers)

  // common includ login
  // login 
  router.post(API_LOGIN_ROUTER.LOGIN, app.controller.auth.login);
  router.post(API_LOGIN_ROUTER.REGISTER, app.controller.auth.register);
}
