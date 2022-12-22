import awaitStreamReady from 'await-stream-ready';
import fs from 'fs';
import path from 'path';
import { Context } from 'egg';
import { getUUID } from './uid';
import sendToWormhole from 'stream-wormhole';
import { UserFiles } from '@prisma/client';

const awaitWriteStream = awaitStreamReady.write;

/**
 * 文件存储到本地
 * @param ctx
 * @param part
 * @return
 */
export async function fileStorageToLocal(ctx: Context, part: any): Promise<UserFiles | null> {
  const filename = part.filename.toLowerCase(); // 文件名称
  const extname = path.extname(part.filename).toLowerCase(); // 文件扩展名称
  const fileUid = getUUID();

  // 此处可以修改自定义 文件路径
  const folerPath = path.join(process.cwd(), process.env.FILE_UPLOAD_PATH || './uploads');
  if (!fs.existsSync(folerPath)) {
    fs.mkdirSync(folerPath);
  }
  const target = path.join(folerPath, `${fileUid}${extname}`);
  const writeStream = fs.createWriteStream(target);
  try {
    await awaitWriteStream(part.pipe(writeStream));
    // 创建文件
    const file = ctx.service.file.create(filename, extname, target);
    return file;
  } catch (err) {
    // 如果发生错误，则需要回退删除
    if (fs.existsSync(target)) {
      fs.unlinkSync(target);
    }
    // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    await sendToWormhole(part);
    return null;
  }
}

/**
 * 文件存储到阿里云
 * @param ctx
 * @param part
 */
export async function fileStorageToOSS(ctx: Context, part: any): Promise<UserFiles | null> {
  try {
    const filename = part.filename.toLowerCase(); // 文件名称
    const extname = path.extname(part.filename).toLowerCase(); // 文件扩展名称
    // https://github.com/node-modules/oss-client#putname-file-options
    const res = await ctx.oss.put(process.env.FILE_UPLOAD_PATH + `${getUUID()}${extname}`, part);
    const file = ctx.service.file.create(filename, extname, res.url);

    return file;
  } catch (error) {
    await sendToWormhole(part);
    return null;
  }
}

/**
 * 文件存储到腾讯云
 * @param ctx
 * @param part
 * @return
 */
export async function fileStorageToCos(ctx: Context, part: any): Promise<UserFiles | null> {
  try {
    const filename = part.filename.toLowerCase(); // 文件名称
    const extname = path.extname(part.filename).toLowerCase(); // 文件扩展名称
    // 暂时仅支持上传简单文件https://cloud.tencent.com/document/product/436/7749
    const res: any = await new Promise((resolve, reject) => {
      ctx.app.cos.putObject(
        {
          Bucket: process.env.FILE_UPLOAD_COS_BUCKET || '' /* 填入您自己的存储桶，必须字段 */,
          Region:
            process.env.FILE_UPLOAD_COS_REGION || '' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: process.env.FILE_UPLOAD_PATH + `${getUUID()}${extname}`,
          StorageClass: 'STANDARD',
          Body: part
        },
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });

    const file = ctx.service.file.create(filename, extname, `https://${res.Location}`);
    return file;
  } catch (error) {
    await sendToWormhole(part);
    return null;
  }
}
