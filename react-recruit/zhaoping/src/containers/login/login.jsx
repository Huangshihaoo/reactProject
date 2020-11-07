/**
 * 登录组件
*/

import React,{Component} from 'react'

import Logo from '../../components/logo/logo'

import { NavBar, WingBlank, Button, WhiteSpace, InputItem } from 'antd-mobile'

import Hint from '../../components/hint/Hint'

// 要用dispatch就要引入这个
import store from '../../redux/store'

import {errAction, logApiAction} from '../../redux/actions'

import { connect } from 'react-redux'

class login extends Component {

  state = {
    userName: '', // 用户名
    password: '' // 密码
  };

  handle = (name, val) => { // 获取数据，更新数据
    this.setState ({
      [name]: val
    })
  }

  login = () => { // 登录按钮点击事件
      let {userName, password, } = this.state
      // 判断有没有输入账号密码
      if(!userName || !password) {
          return store.dispatch(errAction('请输入用户名或密码'))
      }
      // 提交登录数据
      this.props.logApiAction({userName, password})
      // 延迟跳转页面
      setTimeout(() => {
              this.props.history.replace(`/${this.props.user.path}`)
          },200)
  }

  toRegister = () => { // 跳转注册按钮
    this.props.history.replace('/register')
   
  }

  render () {
    const {msg} = this.props.user
    return (
      <div>
        <NavBar>招&nbsp;&nbsp;&nbsp;聘</NavBar>
        <WhiteSpace/>
        <Logo/>
        <WhiteSpace/>
        {msg?<Hint>{msg}</Hint>:null}
        <WingBlank>
        <InputItem ref='zhanghu' onChange={val => {this.handle('userName',val)}} >用&nbsp;&nbsp;户&nbsp;名:</InputItem>
          <InputItem ref='mima' onChange={val => {this.handle('password',val)}} type='password'>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
          <WhiteSpace />
          <Button type='primary' onClick={() => {this.login()}}>登录</Button>
          <WhiteSpace />
          <Button onClick={() => {this.toRegister()}}>注册账号</Button>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state =>({user: state.user}),{logApiAction}
)(login)