const CryptoJS = require('crypto-js') // 引用AES源码js

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量
// 解密方法
// function Decrypt (word) {
//   let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
//   let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
//   let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
//   let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
//   return decryptedStr.toString()
// }
// // 加密方法
// function Encrypt (word) {
//   let srcs = CryptoJS.enc.Utf8.parse(word)
//   let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
//   return encrypted.ciphertext.toString().toUpperCase()
// }

// 基础加密
function Encrypt (word) {
  return CryptoJS.AES.encrypt(word, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}
// 基础解密
function Decrypt (word) {
  return CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
}

// rsa加密
// function rsaType (str) {
//   let pubKey = `-----BEGIN PUBLIC KEY-----
//  rerwrwewewewewesssaczdscasdafffvzdxdas-----END PUBLIC KEY-----` // ES6 模板字符串 引用 rsa 公钥
//   let encryptStr = new JSEncrypt()
//   encryptStr.setPublicKey(pubKey) // 设置 加密公钥
//   let data = encryptStr.encrypt(str.toString()) // 进行加密
//   return data
// }

export default {
  Decrypt,
  Encrypt
}
