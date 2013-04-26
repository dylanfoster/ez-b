var defaultPort=8080;
var ez_b=require("ez-b"),
	sc_io=require("socket.io"),
	connect=require("connect"),
	http=require("http");

	var app=connect().use(connect.static("static"));
	var server=http.createServer(app).listen(defaultPort);

	var io = sc_io.listen(server, {log:false});

	console.log("Web-Server running on localhost:" + defaultPort);

	//Set EZ-Builder Interface through socket.io
io.sockets.on('connection', function(socket){
	
	//Listening for action	
	socket.on('action', function(data){
			
			if(data.action.toString() == "connectEZ"){
				var ez_ip = data.ip.toString();
				var ez_port = data.port.toString();
				ez_b.connect({host:ez_ip, port: ez_port});
			}

			if(data.action.toString() == "disconnect"){
				ez_b.Exit();
				socket.emit('ez-disconnected');
			}

			if(data.action.toString() == "connectBoard"){
				ez_b.ConnectBoard(data.boardNum.toString());
			}

			if(data.action.toString() == "disconnectBoard"){
				ez_b.DisconnectBoard(data.boardNum.toString());
			}

			if(data.action.toString() == "runScript"){
				ez_b.RunScript(data.name.toString()); 
			}

			if(data.action.toString() == "moveServo"){
				ez_b.Servo(data.servo.toString(), data.position.toString());
			}	

			if(data.action.toString() == "setDigit"){
				var ez_val = data.val.toString();
				var ez_pin = data.digitPort.toString();
				ez_b.Set(ez_pin, ez_val);
			}

			if(data.action.toString() == "pwm"){
				ez_b.PWM(data.digitPin.toString(), data.position.toString());
			}

			if(data.action.toString() == "MoveUp"){
				ez_b.Forward(100, 9000);
			}

			if(data.action.toString() == "MoveDown"){
				ez_b.Reverse(100, 5000);
			}

			if(data.action.toString() == "MoveLeft"){
				ez_b.Left(100, 2000);
			}

			if(data.action.toString() == "MoveRight"){
				ez_b.Right(100, 2000);
			}

			if(data.action.toString() == "MoveStop"){
				ez_b.Stop();
			}

			if(data.action.toString() == "playScript"){
				ez_b.RunScript(data.name.toString());
			}

			if(data.action.toString() == "checkConnect"){
				if(ez_b.client == null){
					socket.emit('ez-disconnected');			
				}else{
					socket.emit('ez-isconnected');
				}
			}
	});

	ez_b.on('connect', function(){
		socket.emit('ez-connected');
	});

	ez_b.on('connected', function(){
		socket.emit('ez-isconnected');
	});

	ez_b.on('disconnect', function(){
		socket.emit('ez-disconnected');
	});

	ez_b.on('connectError', function(){
		console.log("Bad Robot");
		socket.emit('ez-failed');
	});
}); 