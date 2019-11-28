var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post('/', function (req, res, next) {
    console.log(req.body)
    axios.get(`https://www.zcool.com.cn/activities/wap/index-card-db/${req.body.detailsId}.do`).then(result => {
      res.send({activitydata:result.data});
    })
  });

  
  module.exports = router;