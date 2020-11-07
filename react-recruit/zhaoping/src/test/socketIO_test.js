// 引入客户端io
import io from 'socket.io-client'

// 连接服务器，得到代表连接的socket对象
const socket = io('ws://localhost:3000')

// 绑定receiveMsg监听，接收服务器发送的消息
// 客户端接收事件名与服务端发送事件名相同
socket.on('receiveMsg', function(data) {
    console.log('浏览器收到消息', data);
})
// 向服务器发送的消息
// 客户端发送事件名与服务端接收事件名相同
socket.emit('sendMsg', {name: 'tom', data: Date.now()})
