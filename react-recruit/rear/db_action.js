const {UserModul, ChatModul} = require('./schema/user_schema')

const md5 = require('blueimp-md5')

// 注册
exports.save = (user, callback) => {
  // 保存数据，生成usermodul
  let usermodul = new UserModul(user)

  usermodul.save((err, ret) => {
    if(err) {
      return callback(err)
    }else {
      callback(null, ret)
    }
  })
}

// 查询有无相同用户名
exports.find = (name, callback) => {
  UserModul.findOne({userName: name}, (err, ret) => {
    if(err) {
      return callback(err)
    }
    callback(null, ret);
  })
}

// 登录匹配账户密码
exports.loginFind = (user, callback) => {
  // 解构数据
  let {userName, password} = user
  // 查找有无相同数据（账号密码对不对）
  UserModul.findOne({userName, password: md5(md5(password))},  {password:0, __v: 0}, (err, ret) => {
    if(err) {
      return callback(err)
    }
    callback(null, ret)
  })
}

// 匹配对应id
exports.findIdUpdata = (id, user,callback) => {
  UserModul.findOneAndUpdate({_id: id}, user,{new: true}, (err, oldUser) => {
    if(err) {
      return callback(err)
    }
    // 从旧数据中取得所需数据
    let {userName, userType, _id} = oldUser
    // 组合数据
    Object.assign(user, {userName, userType, _id})

    callback(null, user)
  })
}

// 依据id查找对应用户
exports.findUser = (id, callback) => {

  UserModul.findById(id,{password:0, __v: 0}, (err, user) => {
    if(err) {
      return callback(err)
    }
    callback(null, user)
  })
}
  
// 依据用户类型查找相对所有用户
exports.findTypeList = (userType, callback) => {
  // 老板返回大神，大神返回老板
  userType = userType.userType === 'laoban'? 'dashen' : 'laoban'

  UserModul.find({userType},{password:0, __v: 0} ,(err, userList)=> {
    if(err) {
      return callback(err)
    }
    callback(null, userList)
  }) 
}

// 查找相关两人聊天信息
exports.findDouble = (userid, callback) => {
    // 发送者是我/接收者是我
    ChatModul.find({'$or': [{from: userid}, {to: userid}]},(err,dos)=> {
      if(err) {
        return callback(err)
      }
      callback(null, dos)
    })
}

// 已读信息处理
exports.findReadMsg = ({from, to},callback)=> {
  // 更新数据
  ChatModul.updateMany(
    {from, to, read: false}, 
    {read: true}, 
    {multi: true}, function (err, doc) { 
      if(err) {
        callback(err)
      }
      callback(null,doc)
  })
}
