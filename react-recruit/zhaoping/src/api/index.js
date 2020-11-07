// 多个api请求接口

import ajax from './ajax'

// 注册
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 登录
export const reqLogin = (user) => ajax('/login', user, 'POST')

// 更新信息
export const updata = (user) => ajax('/updata', user, 'POST')

// 获取用户信息
export const reqUser = () => ajax('/user')

// 获取所有老板/大神信息
export const getAll = (type) => ajax('/getAll', {userType:type})

// 获取当前用户所有聊天消息
export const getChatMsgs = () => ajax('/msglist')

// 处理已读消息
export const sendReadMag = (from, to) => ajax('/readmsg',{from, to},'POST')