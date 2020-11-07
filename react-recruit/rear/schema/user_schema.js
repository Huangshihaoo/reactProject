// 引入包
const mongoose = require('mongoose')
// 解决 Mongoose 的 useFindAndModify 警告
mongoose.set('useFindAndModify', false)
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/user', { useUnifiedTopology: true, useNewUrlParser: true })

// 定义schema
const Schema = mongoose.Schema
const userSchema = new Schema({
  userName: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  userType: {type: String, required: true}, // 用户类型
  intr: {type: String}, // 个人介绍
  post: {type: String}, // 职位
  header: {type: String}, // 头像
  company: {type: String}, // 公司
  salary: {type: String} // 工资
})

const chatSchema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  chatId: {type: String, required: true},
  content: {type: String, required: true},
  content: {type: String, required: true},
  read: {type: Boolean, default: false},
  createTime:{type: Number}
})

// account(账户)
let UserModul = mongoose.model('account',userSchema)
// chat(消息)
let ChatModul = mongoose.model('Chat',chatSchema)

exports.UserModul = UserModul
exports.ChatModul = ChatModul

