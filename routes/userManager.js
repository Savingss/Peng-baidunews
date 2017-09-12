var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var con = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'baidunews'
})

con.connect();

router.get('/', function (req, res, next) {
    res.render('userHome');
})

router.get('/userLogin', function (req, res, next) {
    res.render('userLogin');
})

router.post('/userLogin', function (req, res, next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    var sql = `select * from users where userName = '${username}' and userPwd = '${pwd}'`;
    con.query(sql, function (err, results, f) {
        console.log(results);
        if (results.length > 0) {
            res.cookie('name', {
                username: results[0].userName
            }, {
                maxAge: 60000,
                httpOnly: false
            })
            res.json({
                state: 'ok',
                message: '登陆成功'
            })
        } else {
            res.json({
                state: 'fail',
                message: '登录失败~账号或密码输入有误'
            })
        }
    })
})

router.get('/userRegister', function (req, res, next) {
    res.render('userRegister');
})

router.post('/addUsers', function (req, res, next) {
    var mobilenum = req.body.mobilenum;
    var pwd = req.body.pwd;
    con.query(`INSERT INTO users VALUES (null,'${mobilenum}','${776077}')`, function (err, results, f) {
        res.json({
            state: 'ok',
            message: '注册成功'
        })
    })
})

module.exports = router;