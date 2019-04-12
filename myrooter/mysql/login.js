/**
 * Created by Administrator on 2018-04-04.
 */
var connSql = require("./connect.js");
var jwt = require('jsonwebtoken');
//登录
exports.userLogin=function(name,pwd,req,res){
    var conn=connSql.getConn();
    var sql="select * from user where username=? and password=?";
    conn.query(sql,[name,pwd],function(err,data){
        if(data.length!= 0){
            // req.session.user = data[0];
			let content = {name:name}; // 要生成token的主题信息
			let secretOrPrivateKey = 'smile520'; // 这是加密的key（密钥） 
			let token = jwt.sign(content,secretOrPrivateKey,{
				 expiresIn: 60*2  // 过期时间
			});
			console.log('登陆成功')
            res.send({'status':200,'msg':'登陆成功','token':token,'user_name':name})
        } else{
            console.log("密码错误");
			res.send({'status':0,'msg':'登陆失败'})
        }
    })
};