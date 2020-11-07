// 处理路由模块

// 基本的express
const express = require("express");

// md5加密
const md5 = require("blueimp-md5");

// 整个db_action模块
const mongoose = require("./db_action");

// 将router指向express.Router()函数
const router = express.Router();

// 注册
router.post("/register", function (req, res) {
    // 获取数据
    let { userName, password, userType } = req.body;
    // 处理数据，查找有无相同用户名
    mongoose.find(userName, (err, ret) => {
        if (err) {
            res.send(err);
        } else if (ret) {
            // 查到了数据
            return res.send({ code: 1, msg: "用户已存在！！！" });
        } else {
            // 没有错误，保存数据，注册用户
            mongoose.save({ userName, 
                            userType,
                            password: md5(md5(password))
                        },(err, ret) => {
                            if (err) {
                                return res.send(err);
                            } else {
                                res.send({
                                    code: 0,
                                    data: {
                                        userName: ret.userName,
                                        userType: ret.userType,
                                    },
                                });
                            }
                        }
                    );
            }
    });
});

// 登录
router.post("/login", (req, res) => {
    // 查找数据，账号密码是否相同
    mongoose.loginFind(req.body, (err, user) => {
        if (err) {
            res.send({ code: 2, msg: "服务器出了点问题" });
        } else {
            if (user) {
                // 将user._id包装为cookie
                res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
                return res.send({
                    code: 0,
                    data: user,
                });
            } else {
                // 没有user
                return res.send({ code: 1, msg: "账号或密码有错,请重新输入" });
            }
        }
    });
});

// 更新信息
router.post("/updata", (req, res) => {
    // 获取userid数据，上个登录做了cookie
    const { userid } = req.cookies;
    // 没有就说明没登陆
    if (!userid) {
        res.send({ code: 1, msg: "请先登录" });
    } else {
        // 收集传进来的用户数据
        const user = req.body;
        // 将数据传过去，做保存
        mongoose.findIdUpdata(userid, user, (err, user) => {
            if (err) {
                return res.send({ code: 1, msg: "请先登录" });
            }
            res.send({ code: 0, user });
        });
    }
});

// 获取信息
router.get("/user", (req, res) => {
    // 浏览器存了cookie
    const { userid } = req.cookies;
    // 没有就是清理了或者过期了
    if (!userid) {
        res.send({ code: 1, msg: "请先登录" });
    } else {
        // 查找用户信息并返回
        mongoose.findUser(userid, (err, user) => {
            if (err) {
                return res.send({ code: 1, msg: "请重新登录" });
            }
            res.send({ code: 0, data: user });
        });
    }
});

// 查找相对所有用户
router.get("/getAll", (req, res) => {
    mongoose.findTypeList(req.query, (err, userList) => {
        if (err) {
            return res.send({ code: 1, msg: "网络不太行哦！" });
        }
        // 过滤没有头像的
        let lists = userList.filter((list) => list.header != undefined);
        res.send({ code: 0, data: lists });
    });
});

// 获取聊天对象
router.get("/msglist", (req, res) => {
    const { userid } = req.cookies; // 获取userid
    if (!userid) {
        res.send({ code: 1, msg: "请先登录" });
    } else {
        // 查找相对用户
        mongoose.findUser(userid, (err, user) => {
            if (err) {
                return res.send({ code: 1, msg: "请重新登录" });
            }
            // 依据用户类型查找相对聊天用户集合
            mongoose.findTypeList({userType:user.userType}, (err, userList) => {
                if (err) {
                    return res.send({ code: 1, msg: "网络不太行哦！" });
                }
                // 过滤数据
                let lists = userList.filter((list) => list.header != undefined);
               // 用来保存用户数据
                let users = {};
                // 遍历数据生成所需要的数据对象
                lists.map((item) => {
                    users[item._id] = {
                        header: item.header,
                        userName: item.userName,
                    };
                });
                // 查找聊天记录
                mongoose.findDouble(userid, (err, chatMsgs)=> {
                  if(err) {
                    return res.send({ code: 1, msg: "网络不太行哦！" });
                  }
                  res.send({code: 0, data:{users, chatMsgs}})
                })
            });
        });
    }
});

// 读取消息
router.post('/readmsg',(req,res)=> {
    const {from, to} = req.body
    mongoose.findReadMsg( {from, to}, (err,dos)=> {
        res.send({code: 0, data: dos.nModified})
    })

})

// 导出映射对象router
module.exports = router;
