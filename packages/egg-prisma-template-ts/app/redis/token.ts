import { Application } from "egg";

export async function setTokenToRedis(app: Application, uid: string, token: string){
 return await  app.redis.set(`Token:${uid}`, token);
}

export async function  getTokenFromRedis(app: Application, uid: string) : Promise<string | null>{
  return  await  app.redis.get(`Token:${uid}`);
}