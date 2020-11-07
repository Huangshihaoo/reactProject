import React, {Component} from 'react';

import axios from 'axios';


class List extends Component { 
   constructor (props) {
    super (props);
    // 设置页面显示状态
    this.state= {
        notSearch:true,
        carry:false,
        items:null,
        error:null
    }
   }

   // props数据更新时触发方法
   UNSAFE_componentWillReceiveProps (nextState) {
        // 更新状态为搜索中
        this.setState({
            notSearch :false,
            carry:true
            })
let {searchTxt} = nextState
        let url = `https://api.github.com/search/users?q=${searchTxt}`
            // 发送ajax请求
        axios.get(url)
            .then((response) => {
                let {items} = response.data;
                // 请求成功更新状态
                if(items.length === 0) {
                    this.setState({
                        notSearch :false,
                        carry:false,
                        items :null,
                        error:true
                    })
                } else {
                     this.setState({
                    notSearch :false,
                    carry:false,
                    items :items
                })
                }
               
            })
            .catch((error) => {
                // 请求失败更新状态
                this.setState({ 
                    notSearch :false,
                    carry:false,
                    items :null,
                    error:true
                })
            })
    }

    render () { 
        // 获取状态 
        let{notSearch, carry, items, error}= this.state
    
        // 根据状态渲染页面
        if(notSearch) {
            return <h2>按按钮搜索吧</h2>
        }else if(carry) {
            return <h2>搜索中，请等待 ···</h2>

        } else if(items) {
            return <div className='table'>
                {
                    items.map((item,index) => {
                        return (
                            <div className='item' key={index}> 
                                <img src={item.avatar_url} alt=""/>
                             <p><a href={item.html_url}>{item.login}</a></p>
                         </div>
                     )
                    })
                }
            </div>
        }
        if(error) {
            return <h2>大人! 我们没能找到您需要的数据┭┮﹏┭┮ 或者您的网络可能出错了!!</h2>
        }
    }
}

export default List