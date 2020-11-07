// 多个action
import io from 'socket.io-client'

import {
    updata,
    reqRegister,
    reqLogin,
    reqUser,
    getAll,
    getChatMsgs,
    sendReadMag
} from '../api'

import {
    REGISTERED_SUCCESSFULLY,
    ERROE_MSG, 
    LAND_SUCCESSFULLY,
    UPDATE_SUCCESSFULLY,
    UPDATA,
    CLS,
    GET_CHAT_LIST,
    GET_MSG,
    MSG_READ
    } from './action-types'

const getMsgAction = (msg, userid) =>( {
    type: GET_MSG,
    data:{msg, userid}
})

// 连接服务器
function ioInit(dispatch, userid) {
    if(!io.socket) {
        io.socket = io('ws://localhost:3000')
        io.socket.on('receiveMsg', function(msg) {
            if(msg.from === userid || msg.to === userid) {
               dispatch(getMsgAction(msg, userid))
            }
        })
    }
}
// 获取聊天消息列表
// 在登录获取用户信息时使用
async function getChatList(dispatch, userid) {
        ioInit(dispatch, userid)
        let ret = await getChatMsgs()
        if(ret.data.code === 0) {
            let res = ret.data
            let {users, chatMsgs} = res.data
            dispatch( getChatListAction( {users, chatMsgs, userid})) 
       }
    
}

// 注册同步action
const regAction = (data) => ( { 
    type: REGISTERED_SUCCESSFULLY,
    data
})

// 注册异步action
export const regApiAction = (user) => {
    return async dispatch => {
        let res = await reqRegister(user)
        let ret = res.data
        if(ret.code === 0) { // 更新成功
            dispatch(regAction(ret))
        }else { // 跟新失败
             dispatch(errAction(ret.msg))
        }
    }
} 

// 更新同步action
const updataAction = (data) => ({
    type: UPDATE_SUCCESSFULLY,
    data
})

// 更新异步action
export const updataApiAction = (user) => {
    return async dispatch => {
        let res = await updata(user)
        let ret = res.data
        if(ret.code === 0) { // 更新成功
            dispatch(updataAction(ret))
        }else{ // 更新失败
            dispatch(errAction(ret))
        }
    }
}

// 登录同步action
const logAction = (data) => ({ 
    type: LAND_SUCCESSFULLY,
    data
})

// 登录异步action
export const logApiAction = (user) => {
    return async dispatch => {
        let res = await reqLogin(user)
        let ret = res.data
        if(ret.code === 0) { // 登录成功
            getChatList(dispatch, ret.data._id)
            dispatch(logAction(ret))
        }else {
            dispatch(errAction(ret.msg))
        }
    }
}

// 获取用户数据异步action
export const getUserAction = () => {
    return async dispatch => {
        let res = await reqUser()
        let ret = res.data
        if(ret.code === 0) { // 登录成功
            getChatList(dispatch, ret.data._id)
            dispatch(logAction(ret))
        }else {
            dispatch(errAction(ret.msg))
        }
    }
}

// 更新用户列表同步action
const updataListAction = (data) => ({ 
    type: UPDATA,
    data
})

// 获取所有老板/大神用户数据列表
export const getAllAction = (type) => {
    return async dispatch => {
        let res = await getAll(type)
        let ret = res.data
        dispatch(updataListAction(ret)) 
    }
}


// 错误处理同步action
export const errAction = (msg) => ( {
    type: ERROE_MSG,
    msg
})

// 清除数据同步action
export const clsAction = () => ({
    type: CLS
})

// 获取消息列表同步action
export const getChatListAction = (data) => ({
    type: GET_CHAT_LIST,
    data
})

// 已读消息同步action
const readMsgAction = (from, to, count) =>( {
   type: MSG_READ,
   data:{from, to, count}
})

// 发消息
export const sendMsg = ({from, to, content}) => {
    return (dispatch) => {
        ioInit(dispatch, from)
        io.socket.emit('sendMsg', {from, to, content})
    } 
}
// 已读消息
export const readMsg = (from, to) => {
    return  async(dispatch) => {
        let res = await sendReadMag(from, to)
        let ret = res.data
        if(ret.code === 0) {
            dispatch(readMsgAction(from,to, ret.data))
        }
    } 
}