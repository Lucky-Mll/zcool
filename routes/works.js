var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post('/', function (req, res, next) {
    console.log(req.body)
    axios.get(`https://www.zcool.com.cn/activity/wap/${req.body.worksId}/0!0!1!10/getProductCards.do`).then(result => {
      res.send({worksdata:result.data});
    })
  });

  router.post('/getMore', function (req, res, next) {
    console.log(req.body)
    axios.get(`https://www.zcool.com.cn/activity/wap/${req.body.worksId}/0!0!${req.body.getMore}!10/getProductCards.do`).then(result => {
      res.send({worksdata:result.data});
    })
  });

  
module.exports = router;