/**
 * Created by Administrator on 2018-03-27.
 */
var connSql = require('./connect.js');
exports.tableShow = function(res){
    var conn = connSql.getConn();
    var sql = 'select * from userTest';
    conn.query(sql,[],function(err,data){
        if(err == null){
            res.send(JSON.stringify(data))
        }
    })
};

exports.tableShow1 = function(res,page,limit){
    var conn = connSql.getConn();
    var sql = 'select * from userTest limit '+((page-1)*limit)+','+limit;
    console.log(exports.count('userTest'))
    conn.query(sql,[],function(err,data){
        if(err == null){
            var newData = {
                "code":0,
                "msg":"",
                "count":52,
                "data":[]
            }
            newData.data = data;
            res.send(newData)
        }
    })
};

exports.count = function(table){
    var conn = connSql.getConn();
    var sql = 'select count(*) from '+ table;
    conn.query(sql,[],function(err,data){
        if(err == null){
            return data
        }
    })
};




