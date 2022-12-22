import { Service } from 'egg';
import { getUserId } from '../utils/user-info';

export default class FileServices extends Service {
  async create(filename: string, extname: string, path: string) {
    const { prisma } = this.app;
    return await prisma.userFiles.create({
      data: {
        filename,
        extname,
        path,
        uid: getUserId(this.ctx)
      }
    });
  }
}
