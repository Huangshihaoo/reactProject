import React,{Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie' // 前端获取cookie的包
import {connect} from 'react-redux'
import {getUserAction} from '../../redux/actions'
import {way} from '../../utils' // 自己写的工具库
import HighInfo from '../HighInfo/HighInfo'
import BossInfo from '../BossInfo/BossInfo'
import Laoban from '../Laoban/Laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import {NavBar} from 'antd-mobile'
import Footer from '../../components/Footer/Footer'
import Chitchat from '../chitchat/chitchat'
import '../../assets/css/style.css'

 class main extends Component {

  // 做自动登录的事
  componentDidMount() {
    let userid = Cookie.get('userid');
    let {user} = this.props
    if(userid && !user.data._id) {
      this.props.getUserAction()
    }
  }

  // 足部导航数据
  navList = [
    {
      title: '大神界面',
      path: '/laoban',
      text: '大神',
      icon:'laoban',
      component: 'Laoban'
    },
    {
      title: '老板界面',
      path: '/dashen',
      text: '老板',
      component: 'Dashen',
      icon: 'dashen'
    },
    {
      title: '消息',
      path: '/message',
      text: '消息',
      icon:'message',
      component: 'Message'
    },
    {
      title: '个人中心',
      path: '/personal',
      text: '个人',
      icon:'personal',
      component:'Personal'
    }
  ]

  render () {
    
    // 读取cookie的userid
    let userid = Cookie.get('userid');
    // 如果\没有，自动重定向到登陆界面
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // 如果有读取redux中的user状态
    let {user} = this.props
    let {userType} = user.data 
    if(!user.data._id) {
     return null
    }else { // 如果有_id,显示对应界面
      let path = this.props.location.pathname
      if(path === '/') {
        path = way(user.data.userType, user.data.header)
        return  <Redirect to={path}/>
      }
    }

    const path = this.props.location.pathname
    
    let {navList} = this


    let nav = navList.find(nav => nav.path === path)

    // 获取有多少未读数量
    let unreadcount = this.props.chat.unreadcount

    return(
        <div>
          { nav? <NavBar className="head">{nav.title}</NavBar>: null}
            <Switch>
              <Route path='/laoban' component={Laoban}></Route>
              <Route path='/dashen' component={Dashen}></Route>
              <Route path='/personal' component={Personal}></Route>
              <Route path='/message' component={Message}></Route>
              <Route path='/laobaninfo' component={BossInfo}></Route>
              <Route path='/dasheninfo' component={HighInfo}></Route>
              <Route path='/chat/:userid' component={Chitchat}></Route>
            </Switch>
          {navList && nav?  <Footer unreadcount={unreadcount} userType={userType} navList={navList}/> : null}
        </div>
          )
   }
}

export default connect( state =>({user: state.user,navList: state.navList, chat: state.chat}),{getUserAction})(main)