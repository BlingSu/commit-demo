// import http from '@/utils/http'
import request from '@/utils/request'

// 示例
export const login = (data) => {
  return request({
    method: 'get',
    url: '/achievement/teams',
    data
  })
}
