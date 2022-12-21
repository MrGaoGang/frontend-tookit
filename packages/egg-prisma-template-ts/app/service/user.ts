import { User } from '@prisma/client'
import { Service } from 'egg'
import { encode } from '../utils/encode'
import { getUUID } from '../utils/uid';

/**
 * User Service
 */
export default class UserServices extends Service {


  /**
   * register
   * @param username 
   * @param password 
   * @param original 
   * @return 
   */
  public async registerUser(
    username: string,
    password: string
  ): Promise<User | null | boolean> {
    const { prisma } = this.app;

    const has = await this.findUser(username, password);
    if(has){
      return true
    }
    const user = await prisma.user.create({
      data: {
        username,
        password: encode(password),
        uid:  getUUID()
      }
    })
    return user
  }

  /**
   * find user is
   * @param username
   * @param password
   * @return
   */
  public async findUser(
    username: string,
    password: string,
    original = false
  ): Promise<User | null> {
    const { prisma } = this.app
    const user = await prisma.user.findFirst({
      where: {
        username,
        password: original ? password : encode(password)
      }
    })
    return user
  }

  /**
   * create or update user token
   * @param uid 
   * @param token 
   * @return 
   */
  async updateUserToken(uid: string, token: string) {
    const { prisma } = this.app
    return await prisma.userToken.upsert({
      create: {
        token,
        uid
      },
      update: {
        token
      },
      where: {
        uid
      }
    })
  }

  /**
   * find user token
   * @param uid 
   * @return 
   */
  findUserToken(uid: string){
    return this.app.prisma.userToken.findFirst({
      where: {
        uid
      }
    })
  }


}
