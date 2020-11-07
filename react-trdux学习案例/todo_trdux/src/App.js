import React, { Component } from 'react'

import store from './redux'

import AppUI from './AppUI'

import {addAction, clickDeleteAction, inputChangeAction} from './redux/actionCreators'

class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = store.getState()
        this.inputChange = this.inputChange.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.add = this.add.bind(this)
        this.clickDelete = this.clickDelete.bind(this)
        store.subscribe(this.storeChange) // 订阅
    }

    render() {
        return <AppUI
        inputChange = {this.inputChange}
        storeChange = {this.storeChange}
        add = {this.add}
        clickDelete = {this.clickDelete}
        state = {this.state}
                />
    }

    // 更新input值
    inputChange(e) {
        let val = e.target.value
        const action = inputChangeAction(val)
        store.dispatch(action)
    }
    // 实时获取state值
    storeChange() {
        this.setState(store.getState())
    }

    // 增加
    add() {
        // console.log(addAction);
        const action = addAction()
        store.dispatch(action)
        
    }
    // 删除
    clickDelete(index) {
        const action = clickDeleteAction(index)
        store.dispatch(action)
    }

}

export default App