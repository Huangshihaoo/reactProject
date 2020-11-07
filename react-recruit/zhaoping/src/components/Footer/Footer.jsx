/**
 * 底部导航栏组件
 * 显示底部导航
*/

import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
// 引入参数传递限制
import PropTypes from 'prop-types'
// 引入withRouter可将非路由组件包装成路由组件
import {withRouter} from 'react-router-dom'
// 引入某些需要的样式
import '../../assets/css/style.css'

const Item = TabBar.Item

class Footer extends Component {
    // 做参数限制
    static propTypes = {
        navList: PropTypes.array.isRequired,
        userType: PropTypes.string.isRequired,
        unreadcount: PropTypes.number.isRequired
    }

    render () {
        // 取导航数据列表
        let {navList} = this.props
        // 取路径
        const {pathname} = this.props.location
        // 取用户类型
        let type = this.props.userType

        // 判断该隐藏那个界面
        if(type === 'dashen') {
            navList[0].hide = true // 老板界面隐藏
            navList[1].hide = false
        }else if(type === 'laoban') {
            navList[1].hide = true // 大神界面隐藏
            navList[0].hide = false
        }
        // 过滤hide为true的对象不作显示
        navList = navList.filter(nav => !nav.hide)
        
        return(
            <div className="footer">
                 <TabBar>
                {
                    navList.map(nav => (
                        <Item
                        key={nav.path}
                        badge={nav.path === '/message' ? this.props.unreadcount : 0}
                        title={nav.text}
                        icon={{uri: require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{ uri:require(`./images/${nav.icon}-selected.png`)}}
                        selected={pathname === nav.path}
                        onPress={() => this.props.history.replace(nav.path) }
                        >
                        </Item>
                    ))
                }
            </TabBar>
            </div>
           
        )
    }
}

export default withRouter(Footer)