var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */

router.get('/', function (req, res, next) {
  axios.get("http://10.2.151.233:8080/activity").then(result => {
    res.send({mydata:result.data});
  })
  
});

router.post('/', function (req, res, next) {
  axios.get(`https://www.zcool.com.cn/activity/wap/0!0!${req.body.nowP}!10/search.do`).then(result => {
    res.send({newdata:result.data});
  })
  
});

module.exports = router;
