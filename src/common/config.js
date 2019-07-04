/* eslint-disable */

/**1.配置token的失效时间
 * 2.配置开发环境和生产环境的contextPath,并通通过webpack的NODE_ENV变量自动判断
 */
const token_expires = 30 * 60
const baseURL = process.env.NODE_ENV === 'production' ? '真实环境url' : 'http://192.168.0.107:8081'

export {token_expires, baseURL}
