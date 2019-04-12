/**
 * Created by Administrator on 2017-06-22.
 */

var mysql = require("mysql");
exports.getConn=function(){
    var conn=mysql.createConnection({
        host:"127.0.0.1",
        port:3306,
        database:"test",
        user:"root",
        password:"root"
    });
    return conn;
};
exports.closeConn=function(conn){
    conn.end();
};

