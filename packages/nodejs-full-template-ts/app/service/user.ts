import { User } from '@prisma/client';
import { Service } from 'egg';

/**
 * Test Service
 */
export default class UserServices extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async findOrCreate(): Promise<User> {
    const { prisma } = this.app;
    const data = await prisma.user.findFirst({
      where: {
        username: 'mrgaogang',
      },
    });
    if (data) {
      return data;
    }
    const created = await prisma.user.create({
      data: {
        username: 'mrgaogang',
        email: 'gaogangwork@qq.com',
        password: 'mrgaogang',
      },
    });

    return created;
  }
}
