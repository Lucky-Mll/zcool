var express = require('express');
var router = express.Router();
const conn = require('./conn');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register', { title: '注册' });
});

router.post('/', function (req, res, next) {
     console.log(`${req.body}`)
    conn.query(`SELECT Tel FROM users
                WHERE users.Tel = ${req.body.tel}`, [], function(results,fields){
        if(results.length > 0) {
            res.send({data:'手机号已存在!'})
        }else{
            // res.send({data:1})
            var sql = `INSERT INTO users VALUES(NULL,'${req.body.username}','${req.body.password}','${req.body.tel}')`
            conn.query(sql,[], function (results,fields) {
                    res.send({data:'注册成功!'})
            })
        }
        })
});

module.exports = router;