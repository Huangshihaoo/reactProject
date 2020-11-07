/**
 * 头像选择组件
 * 普普通通的组件
*/

import React, { Component } from 'react'

import {Grid} from 'antd-mobile'

import PropTypes from 'prop-types'

class HeadSelect extends Component {

    static propTypes = {
        reserve: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.data = []

        // 循环生成组件所需头像数据数组
        for(let i = 0; i < 20; i++) {
            this.data.push({
                text:`头像${i+1}`,
                icon:require(`../../assets/images/头像${i+1}.png`)
            })
        }
        this.log = this.log.bind(this)
    }

    state = {
        icon: null
    }

    log (el) {
        // 改变数据
        this.setState({icon: el.icon})
        // 外部传入的方法
        this.props.reserve('header', el.text)
    }

    render() {
        let icon = this.state.icon
        return (
            <div>
                <div>{icon?(<div>已选择头像<img src={icon} alt=''/></div>):'请选择头像'}</div>
                <Grid 
                data={this.data}
                columnNum={5}
                onClick={(el) => {this.log(el)}}
                />
            </div>
        )
    }
}

export default HeadSelect
