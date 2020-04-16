
const fileDownLoad = (data, title, _this) => {
  /**
   * data: 异步返回blob文档流
   * title: 下载文档名称及后缀
   */
    const blob = new Blob([data])
    const fileName = title
    const isEdge = navigator.userAgent.indexOf('Edge') > -1
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        // ie
        navigator.msSaveBlob(blob, fileName)
    } else {
        // no ie
        if (isEdge) {
            navigator.msSaveBlob(blob, fileName)
        } else {
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
        }
    }
}

const getTableHeight = (a, b, c, d, e) => {
    let all = document.querySelector('.contentPage').clientHeight
    let a1 = a
    let b1 = (b === null ? 0 : document.querySelector(b).clientHeight)
    let c1 = (c === null ? 0 : document.querySelector(c).clientHeight)
    let d1 = (d === null ? 0 : document.querySelector(d).clientHeight)
    let e1 = (e === null ? 0 : document.querySelector(e).clientHeight)
    console.log(a1, b1, c1)
    return all - a1 - b1 - c1 - d1 - e1
}

// 比较两个数组取出其中不同的值
const getArrDifference = (firstArr, secondArr) => {
  return firstArr.concat(secondArr).filter(function (v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}

// 根据出生日期计算年龄
const toGetAge = strBirthday => {
  let returnAge
  let strBirthdayArr = strBirthday.split('-')
  let birthYear = strBirthdayArr[0]
  let birthMonth = strBirthdayArr[1]
  let birthDay = strBirthdayArr[2]
  let d = new Date()
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()
  if (nowYear === birthYear) {
    returnAge = 0 // 同年则为0岁
  } else {
    let ageDiff = nowYear - birthYear
    // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        let dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else if (monthDiff === 0) {
          let dayDiff = nowDay - birthDay // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = 0 // 返回0 表示出生日期输入错误 晚于今天
    }
  }
    return returnAge // 返回周岁年龄
  }

  const getRandomString = (len) => { // 随机成成字符
    // let len = len || 32
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    let maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }
  /**
   * 参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
  */
  const insertFlg = (str, flg) => { // 动态加入随机字符
    return str.slice(0, 2) + flg + str.slice(2)
  }
  const removeFlg = (str, start, end) => { // str: 需要删除的字符串
    return str.slice(0, start) + str.slice(end)
  }
  const setPaw = (paw) => {
    return insertFlg(paw, getRandomString(20))
  }
  const getPaw = (paw) => {
    return removeFlg(paw, 2, 22)
  }

export default {
  fileDownLoad: fileDownLoad,
  getTableHeight: getTableHeight,
  getArrDifference: getArrDifference,
  toGetAge: toGetAge,
  setPaw: setPaw,
  getPaw: getPaw
}
