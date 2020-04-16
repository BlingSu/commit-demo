
import axios from 'axios'
import qs from 'qs'
// import md5 from 'js-md5'
// import util from './util'
axios.defaults.headers['Cache-Control'] = 'no-cache'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
export default function request (options) {
  let { method = 'get', url, data, isForm, isUpload, isText } = options
  let host = ''
  let path = ''
  if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
    host = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
    path = url.slice(host.length)
  } else {
    host = process.env.VUE_APP_URL
    path = url
  }
  url = host + path
  // 加时间戳
  data && (data.tm = new Date().getTime())
  !data && (data = {
    tm: new Date().getTime()
  })
  let parData = isForm ? qs.stringify(data) : data
  if (isForm) {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 表单传值
  } else if (isUpload) {
    axios.defaults.headers['Content-Type'] = 'multipart/form-data' // 上传图片文件类型
  } else if (isText) {
    axios.defaults.headers['Content-Type'] = 'text/plain;charset=UTF-8'
  } else {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  // let authorization
  // if (sessionStorage.getItem('token')) {
  //   authorization = window.atob(util.getPaw(sessionStorage.getItem('token')))
  //   axios.defaults.headers.Authorization = authorization
  // }
  // let tokenCenter
  // if (sessionStorage.getItem('tokenCenter')) {
  //   tokenCenter = window.atob(util.getPaw(sessionStorage.getItem('tokenCenter')))
  //   axios.defaults.headers.token = tokenCenter
  // }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: {
          ...parData
          // sign: md5(qs.stringify(parData ? parData : null) + config.codes)
        }
      })
    case 'delete':
      return axios.delete(url, {
        data: parData
      })
    case 'post':
      return axios.post(url, parData)
    case 'put':
      return axios.put(url, parData)
    case 'patch':
      return axios.patch(url, parData)
    case 'down': // 文件下载
      return axios.get(url, {
        params: parData,
        responseType: 'blob'
      })
      case 'postdown': // 文件下载
      return axios.post(url, parData, {
        responseType: 'blob'
      })
    default:
      return axios(options)
  }
}
