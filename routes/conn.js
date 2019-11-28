var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'zcool'
})
exports.query = function(sql, arr, callback) {
  pool.getConnection(function(conn_err,conn){
    if(conn_err) {
      throw conn_err;
    }else{
      console.log('数据库连接成功')
    }
    conn.query(sql, arr, function(error,results, fields) {
      //将链接返回到连接池中，准备由其他人重复使用
      conn.release();
      if(error) throw error;
      //执行回调函数，将数据返回
      callback && callback(results,fields);
    })
  })
}
