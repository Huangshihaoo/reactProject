/**
 * 大神列表显示
*/

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getAllAction} from '../../redux/actions'
import Userlist from '../Userlist/Userlist'
import '../../assets/css/style.css'

class Dashen extends Component {
    // 组件挂载前调用
    componentDidMount() {
        // 获取用户类型
        let type = this.props.user.data.userType
        // 得到所有相对用户列表
        this.props.getAllAction(type)
    }

    render () {
        return (
           <Userlist lists={this.props.userList.data} />
        )
    }
}

export default connect( state =>({userList: state.userList, user: state.user}), {getAllAction})(Dashen)