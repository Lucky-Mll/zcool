var express = require('express');
var router = express.Router();
var axios = require('axios')



/* GET users listing. */

router.post('/', function (req, res, next) {
  axios.get(`https://www.zcool.com.cn/event/ajaxapi/event/eventlist.do?p=${req.body.page}&pagesize=10`).then(result => {
    res.send({mydata:result.data});
  })
  
  
});

module.exports = router;
