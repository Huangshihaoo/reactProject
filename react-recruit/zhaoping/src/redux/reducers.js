import {combineReducers} from 'redux'

import {way} from '../utils'

import {
  REGISTERED_SUCCESSFULLY,
  ERROE_MSG, LAND_SUCCESSFULLY,
  UPDATE_SUCCESSFULLY,
  UPDATA,
  CLS,
  GET_CHAT_LIST,
  GET_MSG,
  MSG_READ
} from './action-types'

// 初始化用户数据
const userInit = {
  msg: '',
  type: '',
  path: '',
  data:{
    userName: '',
    userType: '',
    intr: '', // 个人介绍
    post: '', // 职位
    header: '', // 头像
    company: '', // 公司
    salary: '' // 工资
  }
}

// 初始化userList
const userListInit = []

// 初始化聊天数据
const chatInit = {
    users: {},
    chatMsgs: [],
    unreadcount:0
}



function user(state = userInit, action) {

  // 注册成功
  if(action.type === REGISTERED_SUCCESSFULLY) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.type = action.type
    newState.msg = '注册成功即将跳转登录'
    newState.data = action.data
    newState.path = '/login'
    return newState
  }

  // 错误action
  if(action.type === ERROE_MSG) {
    let newState = JSON.parse(JSON.stringify(state))
    newState = userInit
    newState.msg = action.msg
    newState.type = action.type
    return newState
  }

  // 登录成功
  if(action.type === LAND_SUCCESSFULLY) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.data = action.data.data
    newState.msg = '登录成功'
    let {userType, header} = newState.data
    
    newState.path = way(userType, header)
    return newState
  }

  // 更新数据
  if(action.type === UPDATE_SUCCESSFULLY) {
    let newState = JSON.parse(JSON.stringify(state))    
    newState.data = action.data.user
    newState.msg = '已更新'
    newState.type = action.type
    let {userType, header} = newState.data
    newState.path = way(userType, header)
    return newState
  }

  // 清理数据
  if(action.type === CLS) {
    return userInit
  }
  return state
}

// 相对所有用户数据reducers
const userList = (state = userListInit, action) => {
    if( action.type === UPDATA) {
      let newState = JSON.parse(JSON.stringify(state))
      newState = action.data
      return newState
    }
    return state
  }

// 聊天数据
const chat = (state = chatInit, action)=> {
  switch(action.type) {
    case GET_CHAT_LIST:
      let {users, chatMsgs, userid} = action.data
    return {
              users,
              chatMsgs,
              unreadcount: chatMsgs.reduce((preTotal, msg)=> preTotal + (!msg.read && msg.to === userid? 1: 0), 0)
          }
          case GET_MSG:
            let msg = action.data.msg
            let uid = action.data.userid
            return {
              users: state.users,
              chatMsgs:[...state.chatMsgs, action.data.msg],
              unreadcount: state.unreadcount + (!msg.read && msg.to === uid ? 1 : 0 )
          }
          case MSG_READ:
            const {from, to, count}= action.data
           
            return {
              users: state.users,
              chatMsgs: state.chatMsgs.map((msg) => {
                // 找到属于自己的未读消息计算数量
                if(msg.from === from && msg.to === to && !msg.read) { 
                  return {...msg, read: true}
                }else {
                  return msg
                }
                
              }),
              unreadcount: (state.unreadcount - count)
          }
      default:
       return state
  }

}

export default combineReducers({
  user,
  userList,
  chat
})
