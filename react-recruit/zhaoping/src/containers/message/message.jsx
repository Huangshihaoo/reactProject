/**
 * 用户列表组件
 * 显示用户列表
*/

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {List, Badge} from 'antd-mobile'
import '../../assets/css/style.css'

// List下的衍生组件
const Item = List.Item
// Item下的衍生组件
const Brief = Item.Brief

// 得到每条最后消息对象的方法
function getLastMsgs(chatMsgs, userid) { 
let lastMsgObjs = {} // 对象容器

    chatMsgs.forEach(msg => {
        // 判断每一条发给我的数据是否有未读消息
        if(msg.to === userid && !msg.read) {
            msg.unReadCount = 1 // 有就加1
        }else {
            msg.unReadCount = 0 // 没有
        }

        let chatId = msg.chatId // 当前数据的chatId
        let lastMsg = lastMsgObjs[chatId] // 取到lastMsgObjs中以本条chatId为键的单个对象
        if(!lastMsg) { // 如果没有，就把当前数据存进总对象中
            lastMsgObjs[chatId] = msg
        }else { // 如果有就拿时间进行判断
            // 未读 == 之前统计的 + 最新数量
            const unReadCount = lastMsg.unReadCount + msg.unReadCount// 在覆盖之前保存未读数
            if(lastMsg.createTime < msg.createTime) {
                lastMsgObjs[chatId] = msg
            }
            // 保存在最新的lastMsg上
            lastMsgObjs[chatId].unReadCount = unReadCount 
        }
    })

    let lastMsgs = Object.values(lastMsgObjs) // 对象转数组

    lastMsgs.sort((m1, m2)=>{ // 排序
        return m2.createTime -  m1.createTime // 按时间进行排序
    })

    return lastMsgs // 返归得到的未读消息数组
}

class Message extends Component {

    render () {

        const user = this.props.user // 取用户数据
        const {users, chatMsgs} = this.props.chat // 取消息数据
        let lastMsgs = getLastMsgs(chatMsgs, user.data._id) // 取最后聊天对话数据

        return (
                    <div className="box">
                        <List>
                                {
                                    lastMsgs.map(msg=>{
                                        // 取聊天对象id
                                        let toId = msg.to === user.data._id ? msg.from : msg.to
                                        // 用聊天对象id取聊天对象用户数据
                                        let toUser = users[toId]
                                        return (
                                            <Item 
                                                key={msg._id} 
                                                extra={<Badge text={msg.unReadCount}/>}
                                                align="top" 
                                                thumb={require(`../../assets/images/${toUser.header}.png`)} 
                                                multipleLine
                                                onClick={()=> {this.props.history.push(`/chat/${toId}`)}}
                                                >
                                                {toUser.userName}
                                                <Brief>{msg.content}</Brief>
                                            </Item>
                                        )
                                    })
                                }
                        </List>
                    </div>
                )
    }
}


export default connect(state => ({user: state.user,chat: state.chat }))(Message)