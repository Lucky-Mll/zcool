var express = require('express');
var router = express.Router();
const conn = require('./conn');
var jwt = require('jwt-simple');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', { title: '登录页面' });
});

router.post('/', function (req, res, next) {
    var sql = `SELECT * FROM users
               WHERE users.userName = '${req.body.username}' AND users.passWord = '${req.body.password}'`
    conn.query(sql, [], function (results,fields){
        if(results.length === 1){
            console.log(results)
            var payload = {
                username:results[0].userName,
                userid:results[0].userId,
                usertel:results[0].Tel,
                exp:Date.now()+1000*3600  //当前时间+过期时间 时间戳
            }
            var secret = 'lyl';
            var token = jwt.encode(payload,secret);
            res.send({
                login:1,
                token:token
            })
        }else{
            res.send({login:0})
        }
    })
});

module.exports = router;