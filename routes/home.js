var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.cookies);
    if (req.cookies != null) {
        var user = req.cookies.name;
        // user.title = '百度新闻';
        console.log(user);
        res.render('home', {
            user: user
        });
    }
})

module.exports = router;