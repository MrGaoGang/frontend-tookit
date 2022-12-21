import { Application, Router } from "egg";
import { API_LOGIN_ROUTER } from "./const";

export  function injectApiRoute(app: Application, router: Router){
    // login 
    router.post(API_LOGIN_ROUTER.LOGIN, app.controller.auth.login);
    router.post(API_LOGIN_ROUTER.REGISTER, app.controller.auth.register);

}