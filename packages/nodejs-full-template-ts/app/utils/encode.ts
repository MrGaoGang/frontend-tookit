import CryptoJS from 'crypto-js'

/**
 * encode string use md5
 * @param str
 * @return
 */
export function encode(str: string): string {
  return CryptoJS.MD5(str).toString();
}


console.log(encode('1'));
