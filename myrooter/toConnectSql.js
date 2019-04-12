/**
 * Created by Administrator on 2018-03-27.
 */
var tableMessage = require("./mysql/tableMessage.js");
//表格查询
exports.search = function(req,res){
    tableMessage.tableShow(res)
};

//layui表格查询
exports.search1 = function(req,res){
    var limit = req.body.limit;
    var page = req.body.page;
    tableMessage.tableShow1(res,page,limit)
};

var menu = require('./mysql/menu.js');
//菜单查询
exports.menu = function(req,res){
    var type= req.body.typeId;
    menu.menuShow(res,type)
};

var login = require('./mysql/login.js');
exports.login = function(req,res){
    //var name= req.query.username;
    //var pwd= req.query.password;
    //连接数据库
    var name= req.body.username;
    var pwd= req.body.password;
	console.log(name)
    login.userLogin(name,pwd,req,res)
};