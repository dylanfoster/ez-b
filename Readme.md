# EZ-B

EZ-B Allow to set values into a EZ-Builder through socket communication. In order for this module to work you must enable Server communication in the EZ-Builder

## How to Install

```bash
npm install ez-b
```

## How to use

First, require `ez-b`:

```js
var ez_b = require('ez-b');
```

Next, enable the server in EZ-Builder in order to allow TCP connections.

#### Connect to your EZ-Builder server

```js
	ez_b.connect({host:'localhost', port:6666});
```

That is it!!! Now you are ready to start sending command to your EZ-B from Nodejs

#### Example 1

Connect to EZ-Builder and connect to board 0

```js
var ez_b = require('ez-b');
  
	ez_b.connect({host:'localhost', port: 6666});
	ez_b.connectBoard(0);
```

#### Control Servo using jQueryUI and BootStrap

First, install ez-b and socket.io

```bash
npm install ez-b
npm install socket.io
```

Setup your application to listen to incomming messages from a webpage

```js
var ez_b = require("ez-b");
var io = require('socket.io').listen(8888);

ez_b.connect({host:'localhost', port:6666});

io.sockets.on('connection', function(socket){
	socket.on('action', function(data){
		if(data.action.toString() == "moveServo"){
			ez_b.Servo(data.servo.toString(), data.position.toString());
		}	
	});
}); 
```


Create a web page with jQueryUI and BootStrap

```html
<!DOCTYPE html>
<html>
<head>
	<title>EZ-Robot</title>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
	<link href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" rel="stylesheet">
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
	<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
	<script src="https://raw.github.com/cdnjs/ajax2.cdnjs.com/master/ajax/libs/socket.io/0.8.4/socket.io.min.js"></script>
	
</head>
<body>
	<style type="text/css">
	body{
		padding: 10px;
	}
	</style>
	<h1>Robot Control</h1>
	
	<div class="alert alert-info">
		<h3>Servo Control: <span id="servoValue">20</span></h3>
		<div class="servoSlide"></div>
	</div>

	<script type="text/javascript">
		var socket = io.connect('http://localhost:8888');

		$(document).ready(function(){
			$(".servoSlide").slider({min:1, max:100});

			$(".servoSlide").on("slide", function(event, ui){
				$("#servoValue").text(ui.value);
			});

			$(".servoSlide").on("slidestop", function(event, ui){
				socket.emit('action', {
					action:'moveServo',
					position: ui.value,
					servo: 'D14'
				});
			});
		});
	</script>
</body>
</html>
```


##Commands Avalible 

```js

Say(str);
Servo(port, position);
PWM(digitalPort, speed);
PWMRandom(digitalPort, lowspeed, highspeed);
Set(digitalPort, state);
ServoSpeed(digitalPort, speed);
ServoSpeedRandom(digitalPort, lowspeed, highspeed);
ServoUp(digitalPort, count);
ServoDown(digitalPort, count);
ServoSpeedRandom(digitalPort, lowPosition, highPosition);
Release(servoPort);
Move(servoPort, where);
SetRandom(digitalPort);
ToggleDigital(digitalPort);
Forward();
Reverse();
Left();
Right();
Up(milliSeconds);
Down(milliSeconds);
RollRight(milliSeconds);
RollLeft(milliSeconds);
Stop();
Land();
TakeOff();
DroneEmergency();
SpeakStop();
SpeakRSS (url, [index]);
SpeakTwitter(username, [index]);
SendSerial(digitalPort, baudRate, data);
MP3TriggerPlayTrack(digitalPort, baudRate, trackNumber, [pauseTime]);
MP3TriggerPlayRandomTrack(digitalPort, baudRate, lowestTrackNum, highestTrackNum);
MP3TriggerNext(digitalPort, baudRate);
MP3TriggerStop(digitalPort, baudRate);
MP3TriggerPrev(digitalPort, baudRate);
ControlCommand(windowName, ControlCommandParameter, [values]);
Tweet(message);
Roomba(cmd);
Halt();
Exec(exe, [parameters]);
Browser(url);
PlayAudio(url);
StopAudio();
Pause();
LoadProject(url);

//Only available through ez-b nodejs

ConnectBoard(boardNumber);
DisconnectBoard(boardNumber);
ConnectAllBoard(boardNumber);
DisconnectAllBoard(boardNumber);
RunScript(scriptName); 

Exit();

```

For more information about Ez-Builder commands please visit http://www.ez-robot.com



## License 

(The BSD License)

Copyright (c) 2013 Carlos Martin &lt;carlos@martinapps.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
