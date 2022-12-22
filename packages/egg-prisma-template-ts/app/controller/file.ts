import { Controller } from 'egg';
import { fileStorageToCos, fileStorageToLocal, fileStorageToOSS } from '../utils/file';

export default class FileUploadController extends Controller {
  /**
   * upload muti file
   */
  async multiple() {
    const { ctx } = this;
    const parts = ctx.multipart();
    const files: any = [];
    let part; // parts() return a promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 filed
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          ctx.fail('file name is null, it seems that you did not select the file');
          return;
        }
        // part 是上传的文件流
        // console.log('field: ' + part.fieldname)
        // console.log('filename: ' + part.filename)
        // console.log('extname: ' + part.extname)
        // console.log('encoding: ' + part.encoding)
        // console.log('mime: ' + part.mime)
        let res: any = null;
        switch (process.env.FILE_UPLOAD_TYPE) {
          case 'oss':
            res = await fileStorageToOSS(ctx, part);
            break;
          case 'cos':
            res = await fileStorageToCos(ctx, part);
            break;
          default:
            res = await fileStorageToLocal(ctx, part);
        }

        files.push({
          filename: part.filename,
          success: !!res,
          info: res ? { path: res?.path, createAt: res.createAt } : {}
        });
      }
    }

    ctx.success(files);
  }
}
