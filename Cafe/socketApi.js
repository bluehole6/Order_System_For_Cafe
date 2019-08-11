var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var clients = [];
socketApi.io = io;

io.on('connection', function(socket){
	console.log("user connection");
	console.log(clients);
    socket.on('login', function(data) {
    	socket.join(socket.id);
    	console.log('Client logged-in:\n uid: ' + data.uid + '\n sid: ' + socket.id);
    	console.log('connection :', socket.request.connection._peername);
	    // socket에 클라이언트 정보를 저장한다
	    var clientInfo = new Object();
        clientInfo.uid = data.uid;
        clientInfo.id = socket.id;
        clients.push(clientInfo);

	    // 접속된 모든 클라이언트에게 메시지를 전송한다
	    //io.emit('login', data.name );
	});

	socket.on('message', function(data) {
		console.log("message");
    	// 클라이언트 소켓 아이디를 통해서 그 소켓을 가진 클라이언트에만 메세지를 전송
    	for (var i=0; i < clients.length; i++) {
        	var client = clients[i];
        	console.log('client.uid = '+ client.uid);
        	console.log('data.uid = '+ data.uid);
        	if (client.uid == data.uid) {
        		console.log("alert!!!!!");
        		//let clientSocket = io.sockets.socket(client)
                //clientSocket.emit("alert", data.msg);
                //io.to(socket.id).emit("alert", data.msg);
                io.sockets.emit("alert", data.uid); // 전체 접속자에게 다 보냄
                break;
            }
        }
    });

    

});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;