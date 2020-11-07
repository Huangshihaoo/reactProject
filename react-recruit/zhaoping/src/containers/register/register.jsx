// 注册组件
import React,{Component} from 'react'
// 引入aunt组件
import {
  NavBar,
  WingBlank,
  Button,
  WhiteSpace,
  List,
  InputItem,
  Radio,
} from 'antd-mobile'

import Hint from '../../components/hint/Hint'

import {connect} from 'react-redux'

import store from '../../redux/store' // 引入redux核心

import {
  errAction,
  regApiAction
  } from '../../redux/actions' // 错误信息action


import Logo from '../../components/logo/logo' // 引入logo组件

const ListItem = List.Item // 一个组件

class  Register extends Component {

state = { // 初始化用户数据
      userName: '',
      password: '',
      password1: '',
      userType: 'dashen',
    };

  /**
   * 利用组件的onChange事件触发此回调函数
   * name为状态数据中的名字 
   * val是onChange中的参数，也就是文本框的值
  */
   handle = (name, val) => {
      this.setState ({
        [name]: val
      }) 
    }
    
    register = () => {
      // 解构数据
      const {userName, password, password1, userType} = this.state
      if(!userName || !password) { // 判断是否有内容
        return store.dispatch(errAction('请输入用户名或密码'))
      }else if(password !== password1) {// 两次密码是否一至
        return store.dispatch(errAction('两次密码不匹配'))
      }
      // 注册
      this.props.regApiAction({userName, password, userType})
      setTimeout(() => {
        if(this.props.user.path) {
          this.props.history.replace(this.props.user.path)
        }
      },2000)
    }

    toLogin = () => {
      this.props.history.replace('/login')
    }

    render () {
    const {userType} = this.state
    const {msg} = this.props.user
    return (
      <div>
        <NavBar>招&nbsp;&nbsp;&nbsp;聘</NavBar>
        <WhiteSpace/>
        <Logo/>
        <WhiteSpace />
        {msg?<Hint>{msg}</Hint>:null}
        <WingBlank size='lg'>
          <List>
            <InputItem ref='input1' onChange={val => {this.handle('userName',val)}}>用&nbsp;&nbsp;户&nbsp;名:</InputItem>
            <InputItem ref='input2' onChange={val => {this.handle('password',val)}} type='password'>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
            <InputItem ref='input3' onChange={val => {this.handle('password1',val)}} type='password'>确认密码:</InputItem>
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={userType === 'dashen'} onChange={() => {this.handle('userType','dashen')}}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={userType === 'laoban'} onChange={() => {this.handle('userType','laoban')}}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
          </List>
          <WhiteSpace />
          <Button onClick={() => {this.register()}} type='primary'>注册</Button>
          <WhiteSpace />
          <Button onClick={() => {this.toLogin()}}>已有账号</Button>
        </WingBlank>
      </div>
    )
  }
} 

export default connect(
  state =>({user: state.user}),{regApiAction}
)(Register)
