/**
 * Created by Administrator on 2018-03-27.
 */
var tableMessage = require("./mysql/tableMessage.js");
//����ѯ
exports.search = function(req,res){
    tableMessage.tableShow(res)
};

//layui����ѯ
exports.search1 = function(req,res){
    var limit = req.body.limit;
    var page = req.body.page;
    tableMessage.tableShow1(res,page,limit)
};

var menu = require('./mysql/menu.js');
//�˵���ѯ
exports.menu = function(req,res){
    var type= req.body.typeId;
    menu.menuShow(res,type)
};

var login = require('./mysql/login.js');
exports.login = function(req,res){
    //var name= req.query.username;
    //var pwd= req.query.password;
    //�������ݿ�
    var name= req.body.username;
    var pwd= req.body.password;
	console.log(name)
    login.userLogin(name,pwd,req,res)
};