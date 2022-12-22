import COS from 'cos-nodejs-sdk-v5';

// create instance
const cos = new COS({
    SecretId: process.env.FILE_UPLOAD_COS_ACCESS_SECRET,
    SecretKey: process.env.FILE_UPLOAD_COS_ACCESS_KEY,
});

export {
    cos
}