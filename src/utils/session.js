import ase from './ase'
const setSession = (key, value) => {
  let val = JSON.parse(process.env.VUE_APP_ENCRYPT) ? ase.Encrypt(value) : value
  sessionStorage.setItem(key, JSON.stringify(val))
}
const getSession = (key) => {
  let value
  if (sessionStorage.getItem(key)) {
    let val = JSON.parse(process.env.VUE_APP_ENCRYPT)
    ? ase.Decrypt(JSON.parse(sessionStorage.getItem(key)))
    : JSON.parse(sessionStorage.getItem(key))
    value = val
  } else {
    return
  }
  return value
}
// 单个字段清除
const clearOneSession = (key) => {
  sessionStorage.removeItem(key)
}
// 全部删除
const clearAllSession = () => {
  sessionStorage.clear()
}
export default {
  set: setSession,
  get: getSession,
  clear: clearOneSession,
  clearAll: clearAllSession
}
