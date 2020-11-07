// 主体依赖包
const express = require('express')

// 处理post数据的包
const bodyParser = require('body-parser')

// 引入http核心包
const http = require('http')

// cookie处理包
const cookieParser = require('cookie-parser')

// 引入集所有路由处理的router
const router = require('./router')

// 生成app
const app = express()

// 生成server,以便传入socketIO
const server = http.createServer(app)

// 将server传入socketIO模块
require('./socketIO/socketIOServer')(server)

// 配置cookie
app.use(cookieParser())

// 配置post处理包
app.use(bodyParser.urlencoded({extended:true}))
// 配置post处理包
app.use(bodyParser.json())

// 挂载路由
app.use(router)

// 监听8808端口
server.listen(8848,() => {
  console.log('running...')
})