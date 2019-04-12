/**
 * Created by Administrator on 2018-03-20.
 */
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var httpProxy = require('http-proxy');
var jwt = require('jsonwebtoken');
var app = express();
var server = http.createServer(app);
var cors = require('cors')
var io = require('socket.io').listen(server);
var users = [];
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
server.listen('8080');


app.use(function(req, res, next) {
	next();
// 	if (req.url != '/api/login' && req.url != '/api/register') {
// 		let token = req.headers.token;
// 		let secretOrPrivateKey = "smile520";
// 		jwt.verify(token, secretOrPrivateKey, function(err, decode) {
// 			console.log(err)
// 			if (err) {      
// 				res.send({status: 403, msg: '登录已过期,请重新登录'});
// 			} else {
// 				next();
// 			}
// 		})
// 	} else {
// 		next();
// 	}
});

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});



//sockets 聊天
io.sockets.on('connection', function(socket) {
	//new user login
	socket.on('login', function(nickname) {
		if (users.indexOf(nickname) > -1) {
			socket.emit('nickExisted');
		} else {
			//socket.userIndex = users.length;
			socket.nickname = nickname;
			users.push(nickname);
			socket.emit('loginSuccess');
			io.sockets.emit('system', nickname, users.length, 'login');
			//io.sockets.emit('system', nickname, users.length, 'login');
		};
	});
	//user leaves
	socket.on('disconnect', function() {
		if (socket.nickname != null) {
			//users.splice(socket.userIndex, 1);
			users.splice(users.indexOf(socket.nickname), 1);
			socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
		}
	});
	//new message get
	socket.on('postMsg', function(msg, color) {
		socket.broadcast.emit('newMsg', socket.nickname, msg, color);
	});
	//new image get
	socket.on('img', function(imgData, color) {
		socket.broadcast.emit('newImg', socket.nickname, imgData, color);
	});
});

//表格操作
var toSql = require('./myrooter/toConnectSql.js');
app.post("/tableMessage", toSql.search);

//layer表格操作
app.post("/tableMessage1", toSql.search1);

//菜单列表
app.post("/api/menu", toSql.menu);

//登陆
app.post('/api/login', toSql.login);
