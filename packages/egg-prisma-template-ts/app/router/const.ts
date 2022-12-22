const PREFIX = `/api`;

export const API_LOGIN_ROUTER = {
  LOGIN: PREFIX + '/auth/login',
  REGISTER: PREFIX + '/auth/register'
};

export const API_WECHAT_LOGIN_ROUTER = {
  MINI_LOGIN: PREFIX + '/wechat/mini/login'
};

export const API_FILE_UPLOAD_ROUTE = {
  UPLOAD_ONE: PREFIX + '/upload/one',
  UPLOAD_MANG: PREFIX + '/file/upload'
};
