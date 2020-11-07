import React from 'react';

import './App.css';

import Add from '../Add/Add';

import List from '../List/List';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            item:[{
                name:'张三',
                msg:'框架好好玩'
            },
            {
                name:'李四',
                msg:'脚手架很爽'
            }]
        }
       this.add = this.add.bind(this)
      }

    add(comment) {
        let {item} = this.state
        item.unshift(comment)
        this.setState({
            item
        })
    }
    render () {
        let {item} = this.state

        return (
            <div>
                <Add add={this.add} />
                <List item={item}  />
            </div>
        )
    }
}

export default App