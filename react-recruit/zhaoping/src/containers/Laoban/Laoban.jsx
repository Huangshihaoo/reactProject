/**
 * 老板组件页面
 */
import React, {Component} from 'react'

import { connect } from 'react-redux'

import {getAllAction} from '../../redux/actions'

import Userlist from '../Userlist/Userlist'

class Laoban extends Component {

    componentDidMount() {
        let type = this.props.user.data.userType
        // 获取相对用户信息列表
        this.props.getAllAction(type)
    }
    render () { 
              return (<Userlist lists={this.props.userList.data}/>)
            }
}

export default connect( state =>({
  userList: state.userList,
  user: state.user
}), {getAllAction})(Laoban)

