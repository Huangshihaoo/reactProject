module.exports = function (server) { 
    // 得到IO对象
    const io = require('socket.io')(server) 
    // 监视连接（当有客户端连接时回调）
    io.on('connection', function (socket) { 
        console.log('soketio connected')
        // 绑定sendMsg监听，接受客户端发送的消息
        socket.on('sendMsg', function (data) { // 服务端接收事件名与客户端发送事件名相同
            console.log('服务器接收到浏览器的消息', data)
            // 向客户端发送消息（名称，数据）
            // io.向所有连接的客户端发
            io.emit('receiveMsg',{ name:"tom",date: Date.now() }) // 服务端发送事件名与客户端接收事件名向同
            // socket.向连接用户发
            // socket.emit('receiveMsg',{ name:"tom",date: Date.now() }) // 服务端发送事件名与客户端接收事件名向同
            console.log('服务器向浏览器发送消息', data)
        })
    })
}