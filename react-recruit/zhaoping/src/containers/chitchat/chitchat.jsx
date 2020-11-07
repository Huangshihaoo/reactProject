/**
 * 聊天页面组件
 * 显示聊天消息
 * 发送消息
*/

// react 组件基础
import React, { Component } from 'react'
// redux的通信函数
import {connect} from 'react-redux'
// 引入组件
import {NavBar, Icon, InputItem, Grid} from 'antd-mobile'
// 引入发送消息以及读取消息的异步action
// 必须在最下面state中引入用this.props.xxx使用
import {sendMsg, readMsg} from '../../redux/actions'
// 引入部分样式
import '../../assets/css/style.css'

class  Chitchat extends Component {

    state = {
        content: '', // 用作聊天数据收集
        isShow: false // 表情框的显示
    }

    // 改变表情框的显示状态
    change = () =>{
        let isShow = !this.state.isShow
        // 更新显示状态
        this.setState({isShow})
        // 解决bug
        if(isShow) { // 异步手动 发resize事件, 解决表情列表显示的bug
            setTimeout(() => { 
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    // runder调用前回调
    componentWillMount() {
        const emojis = ['🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐',
         '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔',
         '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔',
         '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔',
         '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
         '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',] 

        // 将表情数组改变成组件需要的数据
        this.emojis = emojis.map(item => ({text :item}))
    }
    // 组件挂载前回调
    componentDidMount() {
        // 消息页面拉到最底部
        window.scrollTo(0, document.body.scrollHeight)
    }

    // 更新组件时回调
    componentDidUpdate() {
        // 消息页面拉到最底部
        window.scrollTo(0, document.body.scrollHeight)
    }
    
    // 组件销毁前回调
    componentWillUnmount() {
        // 收集数据
        const to = this.props.match.params.userid 
        const from = this.props.user.data._id 
        // 发送已读消息
        this.props.readMsg(to, from)
    }

    // 发送按钮的处理
    submit = () => {
        let from = this.props.user.data._id // 收集自己的id
        let to = this.props.match.params.userid // 手机聊天对象id
        let {content} = this.state // 获取聊天内容
        this.props.sendMsg({from, to, content}) // 发送消息
        this.setState({content: '',isShow: false}) // 清空文本框，隐藏表情框
    }

    render() {
        const {user} = this.props // 获取自己的数据
        const {chatMsgs, users} = this.props.chat // 获取聊天对象及聊天数据
        let my = user.data._id // 自己的id
        let to = this.props.match.params.userid // 聊天对象的id

        // 在数据没有之前返回null，避免报错
         if(!users[to]) {
            return null
        }

        let id =  [my, to].sort().join('_') // 拼接的chatid
        let msgs = chatMsgs.filter((item) => item.chatId === id) // 用拼接id查找相关聊天信息
        let toHendar = require(`../../assets/images/${users[to].header}.png`) // 提前获取对方头像
        let myHendar = require(`../../assets/images/${user.data.header}.png`) // 提前获取自己的头像
        
        // 取表情框的显示状态
        let {isShow} = this.state

        return (
            <div>
                <NavBar
                    className="head"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{this.props.history.go(-1)}}
                >{users[to].userName? users[to].userName: null}</NavBar>

                <div className='box' style={{padding: "60px 10px 40px"}}>
                    {
                        msgs.map((item)=> {
                            if(item.from === my) {
                                return (
                                        <div key={item._id} className='right'>
                                            <img style={{width:"40px", height: "40px"}} src={myHendar} alt=""/>
                                            <span className="rightDialogue">{item.content}</span>
                                        </div>
                                        ) 
                            }else {
                                return (
                                        <div key={item._id} className="left">
                                            <img style={{width:"40px", height: "40px"}} src={toHendar} alt=""/>
                                            <span className="leftDialogue">{item.content}</span>
                                        </div>
                                        )
                            }
                        })
                    }
                </div>
                <div className="footer">
                    <InputItem 
                        value= {this.state.content}
                        onChange={(val) => {this.setState({content: val})}}
                        placeholder="请输入"
                        onFocus={()=> this.setState({isShow: false})}
                        extra={ 
                        <span>
                            <span onClick={()=> this.change()} aria-label='😃' role="img">😃</span>
                            <span style={{marginLeft: "10px"}} onClick={this.submit}>发送</span>
                        </span>
                         }
                    ></InputItem>
                    {
                        isShow ? <Grid
                            columnNum={8}
                            hasLine={false}
                            isCarousel={true}
                            carouselMaxRow={4}
                            data={this.emojis}
                            onClick={(item)=> this.setState({
                                content: this.state.content + item.text
                            })}
                            style={{touchAction: "none", fontSize: "25px"}}
                        /> : null
                    }
                </div>
            </div>
        )
    }
 }

export default connect(
                    state =>({
                        user: state.user,
                        chat: state.chat
                    }),{sendMsg, readMsg}
                )(Chitchat)