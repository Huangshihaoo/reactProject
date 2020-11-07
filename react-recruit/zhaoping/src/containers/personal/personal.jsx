/**
 * 个人中心组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Result, List, WhiteSpace, WingBlank, Button, Modal } from 'antd-mobile';
import Cookie from 'js-cookie'
import store from '../../redux/store'
import {clsAction} from '../../redux/actions'
import '../../assets/css/style.css'

const Item = List.Item
const Brief = Item.Brief
const Alert = Modal.alert
class Personal extends Component {
   
    constructor(props) {
        super(props)
        this.exit = this.exit.bind(this)
    }

    // 先做的弹出框组件
    exit() {
        Alert('退出？', '确定退出？',[
            { text: '取消', onPress: () => console.log('cancel')},
            { 
                text: '确定', 
                onPress: () => {
                    Cookie.remove('userid')
                    store.dispatch(clsAction())
                    setTimeout(() => {this.props.history.replace()}, 1000)
                }
            }
          ])
        
        //   
        
    }

    render () {
        let {company, header, intr, post, salary, userName, userType} = this.props.user.data

        return(
                <div className="box">
                    <Result
                    img= {<img src={require(`../../assets/images/${header}.png`)}  alt="" />}
                    title={userName}
                    message={company}
                    />
                    
                    <List renderHeader={() => '个人介绍'}>
                        {userType === 'laoban' ?
                            <Item multipleLine>
                                <Brief>招聘职位: {post}</Brief>
                                {intr?<Brief>需求: {intr}</Brief> : null}
                                {salary ? <Brief>薪水: {salary}</Brief>: null}
                            </Item> :   
                            <Item multipleLine>
                                {post?<Brief>应聘职位: {post}</Brief>: null}
                                {intr?<Brief>技术栈: {intr}</Brief> : null}
                            </Item>}
                        
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                <WingBlank>
                <Button type='warning' onClick={() => {this.exit()}}>退出</Button>
                </WingBlank>
                </div>
                )
    }
}

export default connect(state => ({user: state.user}))(Personal)