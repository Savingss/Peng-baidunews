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

router.get('/get_slider', function (req, res, next) {
    // console.log(req.query.sliderTag);
    con.query(`select * from news_slider where sliderTag = '${req.query.sliderTag}'`, function (err, results, f) {
        // console.log(results)
        res.json({
            state: 'ok',
            results: results
        });
    })
})

// // 推荐
// router.get('/recommend', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '推荐' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 百家
// // router.get('/baijia', function (req, res, next) {
// //     con.query("select * from news_slider where sliderTag = '百家' ", function (err, results, f) {
// // console.log(results);
// //         res.json({
// //             state: 'ok',
// //             results: results
// //         })
// //     })
// // })

// // 本地
// router.get('/local', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '本地' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 娱乐
// router.get('/ENT', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '娱乐' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 社会
// router.get('/community', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '社会' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 军事
// router.get('/military', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '军事' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 女人
// router.get('/woman', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '女人' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

// // 搞笑
// // router.get('/baijia', function (req, res, next) {
// //     con.query("select * from news_slider where sliderTag = '搞笑' ", function (err, results, f) {
// // console.log(results);
// //         res.json({
// //             state: 'ok',
// //             results: results
// //         })
// //     })
// // })

// // 互联网
// router.get('/Internet', function (req, res, next) {
//     con.query("select * from news_slider where sliderTag = '互联网' ", function (err, results, f) {
//         // console.log(results);
//         res.json({
//             state: 'ok',
//             results: results
//         })
//     })
// })

module.exports = router;