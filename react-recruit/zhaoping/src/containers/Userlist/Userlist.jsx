/**
 * 用户列表组件
 * */ 

import React, {Component} from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../assets/css/style.css'

 class Userlist extends Component {

    static propTypes = {
        lists: PropTypes.array
    }

    manage = (id) => {
          this.props.history.push(`/chat/${id}`)
    }

    render() {
        const {lists} = this.props
        return (
            <div className='box'>
                <WingBlank size='sm'>
                    <WhiteSpace size="lg" />
                        {
                        lists && lists.map((list) => {
                            return (
                                <div key={list._id}>
                                    <Card onClick={()=>this.manage(list._id) }>
                                        <Card.Header
                                            title={list.userName}
                                            thumb={require(`../../assets/images/${list.header}.png`)}
                                            extra={list.company?<span>{list.company}</span>: <span>{list.post}</span>}
                                        />
                                        <Card.Body>
                                            <div>{list.intr}</div>
                                        </Card.Body>
                                    </Card>
                                    <WhiteSpace size="lg" />
                                </div>
                            ) 
                        })
                        }
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}

export default withRouter(Userlist)