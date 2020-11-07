import React, {Component} from 'react';

import Search from '../Search/Search';

import List from '../List/List';

class App extends Component {

    constructor (props) {
        super (props);
        // 定义搜索文本，再点击按钮后得到
        this.state = {
          searchTxt: ''
        }
    }
    // 获取搜索数据后立即更新状态机数据
    ajax = (searchTxt) => {
        this.setState({searchTxt})
    }

    render () {
        // 获取状态机中的搜索数据传到list组件
        let {searchTxt} = this.state 
        return (
            <div>
                <header className="header">
                    <h2>搜索github用户</h2>
                    <Search  ajax={this.ajax} />
                </header>
                <div className="body">
                    <List searchTxt={searchTxt} />
                </div>
            </div>
        )
    }
}

export default App 