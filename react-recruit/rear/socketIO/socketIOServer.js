// 引入聊天数据schema
const {ChatModul} = require('../schema/user_schema')

// 导出一个函数，server是参数
module.exports = function (server) {
    // 得到io对象 
    const io = require('socket.io')(server) 
    // 监听连接
    io.on('connection', function (socket) { 
        // console.log('soketio connected')
        // 监听客户端消息
        socket.on('sendMsg', function ({from, to, content}) {
            // 新生成两项数据
            let chatId = [from, to].sort().join('_')
            let createTime = Date.now()
            // 将数据存起来
            new ChatModul({from, to, content,chatId,  createTime}).save((err,msg)=> {
                // 存起来后在将数据发送回所有连接的客户端 // 客户端再进行处理
                io.emit('receiveMsg',msg) 
            })
        })
    })
}