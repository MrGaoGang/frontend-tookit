import { User } from '@prisma/client'
import { Service } from 'egg'
import { encode } from '../utils/encode'
import { v4 as uuidv4 } from 'uuid'

/**
 * Test Service
 */
export default class TestServices extends Service {
  async findAllUsers(): Promise<User[]> {
    const { prisma } = this.app    
    return await prisma.user.findMany()
  }
  /**
   * sayHi to you
   * @param name - your name
   */
  public async findOrCreate(): Promise<User> {
    const { prisma } = this.app
    const data = await prisma.user.findFirst({
      where: {
        username: 'mrgaogang'
      }
    })
    if (data) {
      return data
    }
    const created = await prisma.user.create({
      data: {
        username: 'mrgaogang',
        email: 'gaogangwork@qq.com',
        uid: uuidv4(),
        password: encode('mrgaogang')
      }
    })

    return created
  }
}
