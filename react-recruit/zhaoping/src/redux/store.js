import { createStore , applyMiddleware ,compose } from 'redux'  //  引入createStore方法
import reducers from './reducers'    
import thunk from 'redux-thunk'

const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore( reducers, enhancer) // 创建数据存储仓库
export default store   //暴露出去
