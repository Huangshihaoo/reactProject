import React, {Component} from 'react'
// import {reqRegister} from './api'
// import axios from 'axios'
import {getList} from './redux/actions'
// import {getListAction} from './redux/actions'
// import store from './redux/index'

class App extends Component {
    componentDidMount () {
        // axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res) => {
        //     const data = res.data
        //     const action = getListAction(data)
        //     store.dispatch(action)
        // })
        const action = getList()
        console.log(action);
        // reqRegister()
        // .then((res) => {
        //     const data = res.data
        //     console.log(data);
        // })

    }
    render() {
        return (
            <div>
                <ul>
                    <li>sadasd</li>
                </ul>
            </div>
        )
    }
}
export default App