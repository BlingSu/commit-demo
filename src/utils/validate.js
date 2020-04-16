
// 工行卡号验证
import moment from 'moment'
// 身份证验证
const validateIdNum = (rule, value, callback) => {
  let iSum = 0
  let aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  let sBirthday = value.substr(6, 4) + '-' + Number(value.substr(10, 2)) + '-' + Number(value.substr(12, 2))
  let d = new Date(sBirthday.replace(/-/g, '/'))
  let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  for (let i = 0; i < 17; i++) iSum += value.substr(i, 1) * arrInt[i]
  let residue = arrCh[iSum % 11]
  if (!value) {
    callback(new Error('请输入身份证'))
  }
  if (!/^\d{17}(\d|x)$/i.test(value)) {
    callback(new Error('身份证长度或格式错误'))
  }
  if (aCity[parseInt(value.substr(0, 2))] === null) {
    callback(new Error('身份证地区非法'))
  }
  if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
    callback(new Error('身份证上出生日期非法'))
  }
  if (residue !== value.substr(17, 1)) {
    callback(new Error('身份证号非法'))
  } else {
    callback()
  }
}

// 固话+手机正则校验 非必传
const validateTelNum = (rule, value, callback) => {
  if (value === '' || value === undefined || value === null) {
    callback()
  }
  if (!value) {
    callback(new Error('请输入正确联系方式'))
  } else {
    if (/^([0-9]{3,4}-)?[0-9]{7,8}$/g.test(value)) {
      callback()
    } else if (/^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/g.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确联系方式'))
    }
  }
}

// 正整数校验
const Integer = (rule, value, callback) => {
  if (/^[0-9]+$/.test(value)) {
    callback()
  } else {
    callback(new Error('只能输入正整数'))
  }
}

// 校验当前日期之前
const currentDate = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择入队日期'))
  } else {
    if (value > moment(new Date()).format('YYYY-MM-DD')) {
      callback(new Error('入队日期不能大于当天时间'))
    }
  }
}

export default {
  validateIdNum: validateIdNum,
  validateTelNum: validateTelNum,
  Integer: Integer,
  currentDate: currentDate
}
