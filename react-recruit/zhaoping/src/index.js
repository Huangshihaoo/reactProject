// 第三方包引入区
import React from 'react'
// react-DOM
import ReactDOM from 'react-dom'
// redux
import {Provider} from 'react-redux'
// 引入路由组件
import {HashRouter, Route, Switch} from 'react-router-dom'
// 自定组件引入区
import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
// import './test/socketIO_test'

ReactDOM.render((
 <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
    </Provider>
),document.querySelector('#root'))
