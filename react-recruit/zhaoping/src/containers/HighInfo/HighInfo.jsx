/**
 * 大神信息完善组件
*/

import React, {Component} from 'react'

import { NavBar, Button, InputItem, TextareaItem, WhiteSpace, WingBlank} from 'antd-mobile'

import HeadSelect from '../HeadSelect/HeadSelect'

import {connect} from 'react-redux'

import {updataApiAction} from '../../redux/actions'

class HighInfo extends Component {

    constructor(props){
        super(props)
        this.reserve = this.reserve.bind(this)
        
    }

    state = {
            intr: '', // 个人介绍
            post: '', // 职位
            header: '', // 头像
        }
        
    reserve (name, val) {
        this.setState({
            [name]:val
        })
    }

    // 保存信息
    saveInfo = () => {
        this.props.updataApiAction(this.state)
        setTimeout(()=> {
            if(this.props.user.path) {
                this.props.history.replace(this.props.user.path)
            }
    },111)
       
    }

    render() {
        return <div>
                    <NavBar>大神信息完善</NavBar>
                    <WhiteSpace/>
                    <HeadSelect reserve={this.reserve}/>
                        <WhiteSpace/>
                    <InputItem 
                        placeholder='求职岗位'
                        onChange={(val) => {this.reserve('post',val)}}
                    >求职岗位:</InputItem>
                    <WhiteSpace/>
                    <TextareaItem 
                        title='个人介绍:'
                        placeholder='个人介绍'
                        rows={2}
                        onChange={(val) => {this.reserve('intr',val)}}
                    ></TextareaItem>
                    <WhiteSpace/>
                    <WingBlank>
                        <Button 
                            type='primary'
                            onClick={() => {this.saveInfo()}}
                        >保存</Button>
                    </WingBlank>
                </div>
    }
}

export default connect( state =>({user: state.user}),{updataApiAction})(HighInfo)



