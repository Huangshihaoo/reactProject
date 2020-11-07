// 多个api请求接口

import ajax from './ajax'

// 注册
export const reqRegister = (user) => ajax('http://127.0.0.1:8848/register', user, 'POST')

// 登录
export const reqLogin = (user) => ajax('http://127.0.0.1:8848/login', user, 'POST')
