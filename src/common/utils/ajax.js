/**
 * ajax请求函数模块
 * 参数: url  路径
 *      data  地址栏参数
 *      type  请求方式,默认GET
 * 返回值: promise对象的data数据(response.data)
 */

import axios from 'axios'
import {baseURL} from 'common/config'

const ajax = {
  get: (url, data = {}) => {
    return axios({
      method: 'get',
      baseURL: baseURL,
      url: url,
      params: data
      // headers:{}
    })
  },
  post: (url, data = {},headers) => {
    return axios({
      method: 'post',
      baseURL: baseURL,
      url: url,
      params: data,
      headers:headers || null
    })
  }
}

export default ajax
