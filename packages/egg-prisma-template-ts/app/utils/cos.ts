import COS from 'cos-nodejs-sdk-v5';

// create instance
const cos = process.env.FILE_UPLOAD_TYPE === 'cos' ?  new COS({
    SecretId: process.env.FILE_UPLOAD_COS_ACCESS_SECRET,
    SecretKey: process.env.FILE_UPLOAD_COS_ACCESS_KEY,
}): {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    putObject(){}
};

export {
    cos
}