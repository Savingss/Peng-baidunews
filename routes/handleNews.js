var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//创建连接，配置连接
var con = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'baidunews'
});
// 连接Mysql服务器
con.connect();

//查询全部
router.post('/getAllNews', function (req, res, next) {
    con.query('select * from newslist', function (err, results, f) {
        // console.log(result[0].newsId);
        res.json({
            allNews: results
        });
    });
});

// 添加新闻记录
router.post('/addNews', function (req, res, next) {
    console.log(req.body);
    var detailtime = ' 00:00:00';
    var newsTitle = req.body.newsTitle;
    var newsContent = req.body.newsContent;
    var newsImg = req.body.newsImg;
    var newsTime = req.body.newsTime.concat(detailtime);
    console.log(typeof newsTime);
    var newsTag = req.body.newsTag;
    var sql = 'insert into newslist values(?,?,?,?,?,?)';
    var sqlArr = [null, `${newsTitle}`, `${newsContent}`, `${newsImg}`, `${newsTag}`, `${newsTime}`];
    con.query(sql, sqlArr, function (err, results, f) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.json({
                state: 'ok'
            });
        }
    })
});

//清空全部新闻
router.get('/deleteAllNews', function (req, res, next) {
    con.query('truncate table newslist', function (err, results, f) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                state: 'ok'
            });
        }
    })
});

//删除一条新闻
router.get('/deleteNews', function (req, res, next) {
    con.query('delete from newslist where newsid = ?', [req.query.newsid], function (err, results, f) {
        res.json({
            state: 'ok'
        });
    });
});

//删除选中项
router.get('/delCurNews', function (req, res, next) {
    var newsIdArr = req.query.newsIdArr;
    // console.log(newsIdArr)
    for (var i = 0; i < newsIdArr.length; i++) {
        con.query(`delete from newslist where newsid = ${newsIdArr[i]}`, function (err, results, f) {
            res.json({
                state: 'ok'
            })
        })
    }
})

// 获取修改新闻的id
router.get('/getUpdateId', function (req, res, next) {
    // console.log(req.query)
    var newsid = req.query.newsid;
    con.query(`select * from newslist where newsid = ${newsid}`, function (err, results, f) {
        console.log(results);
        res.json({
            state: 'ok',
            results: results
        })
    })
})

//更新新闻
router.get('/updateNews', function (req, res, next) {
    console.log(req.query.newsId);
    var sql = 'update newslist set newsTitle=?,newsContent=?,newsImg=?,newsTag=?,newsTime=? where newsId=?';
    var detailtime = ' 00:00:00';
    var newTime = req.query.newsTime.concat(detailtime);
    con.query(sql, [req.query.newsTitle, req.query.newsContent, req.query.newsImg, req.query.newsTag, newTime, req.query.newsId], function (err, results, f) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                state: 'ok'
            })
        }
    })
})


// 模糊搜索
router.get('/searchNews', function (req, res, next) {
    console.log(req.query.searchCont)
    var sql = `select * from newslist where concat(newsId,newsTitle,newsContent) like '%${req.query.searchCont}%' `;
    con.query(sql, function (err, results, f) {
        res.json({
            state: 'ok',
            results: results
        })
    })
})

module.exports = router;