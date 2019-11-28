var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')
const conn = require('./conn')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.sesssion.aaa) {
    conn.query(`select * from users`,[],function(results,fields){
      console.log(results.data)
      res.send({list:results,user:req.sesssion.aaa})
      // res.render('index', { title: 'Express' });
    })
  }
});

router.get('/tokenval', function (req, res) {
  //验证token
  // console.log(req.headers["authorization"])
  var token = req.headers['authorization'];
  console.log(token);
  
  if(token === 'null' ){ // 是个字符串
    res.send({
      validata: 0,
      err: "no token"
    })
    return ;
  }
  var secret = 'lyl';
  var obj = jwt.decode(token,secret);
  console.log(jwt.decode(token,secret))
  //console.log(obj.exp)
  if (obj.exp > Date.now()) {
    //没有过期
    res.send({
      validate: 1,
      userDetail:obj
    })
  } else {
    res.send({
      validate: 0,
      err: "过期了"
    })
  }

})
module.exports = router;
