/**
 * Created by Administrator on 2018-03-30.
 */
var connSql = require('./connect.js');
var tree = require('./tree.js')
exports.menuShow = function(res,type){
    console.log(type)
    var conn = connSql.getConn();
    var sql = 'select * from menu_copy where type='+type;
    conn.query(sql,[],function(err,data){
        if(err == null){
            var menuData = tree.getTree(data,0);
            if(menuData[0]){
                menuData[0].open = false;
            }
            res.send(menuData)
        }
    })
}





