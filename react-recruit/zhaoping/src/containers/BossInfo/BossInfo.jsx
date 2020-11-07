/**
 * 老板信息完善组件
*/

import React, {Component} from 'react'

import {NavBar, Button, InputItem, TextareaItem, WhiteSpace, WingBlank} from 'antd-mobile'

// 引入头像选择组件
import HeadSelect from '../HeadSelect/HeadSelect'

// 某些样式
import '../../assets/css/style.css'

// 更新数据的异步action
import {updataApiAction} from '../../redux/actions'

// react-redux的连接方法
import {connect} from 'react-redux'

class BossInfo extends Component {

    state = {
        header: '',
        company: '',
        post: '',
        intr: '',
        salary: ''
    }

    // 更新state数据
    reserve = (name, val) => {
        this.setState({
            [name]:val
        })
    }

    // 保存信息
    saveInfo = () => {
        this.props.updataApiAction(this.state)
        setTimeout(()=> {
            // 得到数据后跳转到相对的路径
            if(this.props.user.path) {
                this.props.history.replace(this.props.user.path)
            }
        },111)
    }

    render() {
        return <div className="box">
                    <NavBar>老板信息完善</NavBar>
                    <WhiteSpace/>
                    <HeadSelect reserve={this.reserve}/>
                    <InputItem 
                        placeholder='招聘职位'
                        onChange={(val) => {this.reserve('post',val)}}
                    >招聘职位:</InputItem>
                    <InputItem 
                        placeholder='公司名称'
                        onChange={(val) => {this.reserve('company',val)}}
                    >公司名称:</InputItem>
                    <InputItem 
                        placeholder='职位薪资'
                        onChange={(val) => {this.reserve('salary',val)}}
                    >职位薪资:</InputItem>
                    <TextareaItem 
                        title='职位要求:'
                        placeholder='职位要求'
                        rows={2}
                        onChange={(val) => {this.reserve('intr',val)}}
                    ></TextareaItem> 
                    <WhiteSpace/>
                    <WingBlank >
                        <Button type='primary' onClick={() => {this.saveInfo()}}>保存</Button>
                    </WingBlank>
                    <WhiteSpace/>
                </div>
    }
}

export default connect( 
    state =>({user: state.user}),{updataApiAction})(BossInfo)


