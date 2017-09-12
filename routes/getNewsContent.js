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
    res.render('home');
})

router.get('/get_newsContent', function (req, res, next) {
    // console.log(req.query);
    //  limit ${req.query.page},${req.query.sizes}
    con.query(`select * from newslist where newsTag = '${req.query.newsTag}' order by newslist.newsId desc`, function (err, results, f) {
        // console.log(results);
        res.json({
            state: 'ok',
            results: results
        })
    })
})

// // 推荐
// router.get('/recommend', function (req, res, next) {
//     // select * from newslist where newsTag = '推荐' order by newslist.newsId desc
//     con.query("select * from newslist where newsTag = '推荐' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 百家
// router.get('/baijia', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '百家' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 本地
// router.get('/local', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '本地' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 娱乐
// router.get('/ENT', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '娱乐' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 社会
// router.get('/community', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '社会' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 军事
// router.get('/military', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '军事' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 女人
// router.get('/woman', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '女人' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 搞笑
// router.get('/fun', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '搞笑' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 互联网
// router.get('/Internet', function (req, res, next) {
//     con.query("select * from newslist where newsTag = '互联网' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

module.exports = router;