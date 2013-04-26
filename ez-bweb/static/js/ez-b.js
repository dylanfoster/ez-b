 var socket = io.connect(ez_info.host + ":" + ez_info.port);
 var myScripts = [];
 var online = false;

  $(document).ready(function(){

	  //Open the connect Panel
	  $("#Connect").click(function(){
		  $(".ConnectPanel").dialog({width:160, position:'center'});
	  });
	  
	  //Connect to EZ-Builder
	  $("#ConnectEZ").click(function() {
        $(".ConnectEZ").dialog({
			width: 350,
			height: 120
		});
	  });

	  socket.emit('action',{
	  	action: 'checkConnect'
	  });

	  socket.on('unconnected', function(){
	  	//alert("Please connect EZ-WEB to EZ-Builder");
	  });
	  
	  //Allow to connect to an EZ-Builder
	  $("body").on('click', '.btnConnect', function(e) {
      	var ip = $("#ip").val();
		var port = $("#port").val();
		//Check for empty fields
		if( ip == "" || port == ""){
			alert("Please enter all values");
			return false;
		}  
		//adding visual elements
		$("#connecting").text('Connecting....');
		//Transmiting the connect command to server
		socket.emit('action', {
			action:'connectEZ',
			'ip': ip,
			'port': port
		});
	  });
	  //Checking for fail connections
	  socket.on('ez-failed', function(){
		  $("#connecting").html('<span class="label label-important">Connection Failed</span>');
	  });
	  //Checking for success connections
	  socket.on('ez-connected', function(){
		  $("#connecting").html('<span class="label label-success">Connected</span>');
		  $(".btnConnect").removeClass("btnConnect btn-info")
		  				  .addClass("btnDisconnect btn-danger")
						  .text("Disconnect");

			$("#boardStatus").attr('src', 'images/Online.png');
	  });
	  
	  socket.on('ez-isconnected', function(){
		  $("#connecting").html('<span class="label label-success">Connected</span>');
		  $(".btnConnect").removeClass("btnConnect btn-info")
		  				  .addClass("btnDisconnect btn-danger")
						  .text("Disconnect");
			$("#boardStatus").attr('src', 'images/Online.png');
	  });
	  //Disconnect from EZ-Builder
	  $("body").on('click', '.btnDisconnect', function(){
		  socket.emit('action', {
			action:'disconnect',
		});
	  });
	  
	  //Checking for disconnect
	  socket.on('ez-disconnected', function(){
		  $("#connecting").text('');
		  $(".btnDisconnect").removeClass("btnDisconnect btn-danger")
		  				  .addClass("btnConnect btn-info")
						  .text("Connect");
			$("#boardStatus").attr('src', 'images/Offline.png');
	  });
	  
	  //Connect board
	  $("body").on('click', '.btnCtn', function(){
		  var board = $(this).attr('data-ezbd');
		  $(this).removeClass('btnCtn btn-info')
		  		 .addClass('btnDnt btn-danger')
				 .text("Disconnect");
		  socket.emit('action', {
			  action:'connectBoard',
			  boardNum: board
		  });
	  });
	  
  	  //Disconnect board
	  $("body").on('click', '.btnDnt', function(){
		  var board = $(this).attr('data-ezbd');
		  $(this).removeClass('btnDnt btn-danger')
		  		 .addClass('btnCtn btn-info')
				 .text("Connect");
		  socket.emit('action', {
			  action:'disconnectBoard',
			  boardNum: board
		  });
	  });
	  
	  //Vertical Servo Control
	  $("#vServo").click(function(e) {
      	var control = $(".vServo").clone();  
		control.removeClass('vServo');
		control.find('.vSlider').slider({
			orientation: 'vertical',
			slide: function(event, ui){
				control.find('.vChild').text(ui.value);
			},
			stop: function(event, ui){
				var servo = control.find('.pinServo').val();
				if(servo != 'NA'){
					socket.emit('action', {
					  action:'moveServo',
					  position: ui.value,
					  'servo': servo
				  	});
				}
			}
		});
		control.dialog({
			height:250,
			width:120,
			maxWidth:120,
            title:'Vertical Servo',
			beforeClose: function(event, ui){
				$(this).dialog('destroy');
			}
		});
      });
	
	 //Horizontal Servo Control
	  $("#hServo").click(function(e) {
      	var control = $(".hServo").clone();  
		control.removeClass('hServo');
		control.find('.hSlider').slider({
			slide: function(event, ui){
				control.find('.hChild').text(ui.value);
			},
			stop: function(event, ui){
				var servo = control.find('.pinServo').val();
				if(servo != 'NA'){
					socket.emit('action', {
					  action:'moveServo',
					  position: ui.value,
					  'servo': servo
				  	});
				}
			}
		});
		control.dialog({
			height:160,
			width:250,
			maxHeight:160,
            title:'Horizontal Servo',
			beforeClose: function(event, ui){
				$(this).dialog('destroy');
			}
		});
      });
	  
      //Digital Setter
      $("#dSetter").click(function(){
        var control = $(".dSetter").clone();
          control.removeClass('dSetter');
          control.dialog({
              width: 190,
              height:100,
              title:'D8'
          });
      });
	  
	  $("body").on('click', '.digiBtnOn', function(){
		  var control = $(this).parent();
		  var dipin = control.find('.pinServo').val();
		  if(dipin == 'NA'){
			  alert("Select digital pin");
			  return false;
		  }
		  $(this).removeClass('digiBtnOn btn-info')
		  		 .addClass('digiBtnOff btn-danger')
				 .text('Off');

		  socket.emit('action', {
					  action:'setDigit',
					  digitPort: dipin,
					  val: 'on'
				  	});
	  });
	  
	  $("body").on('click', '.digiBtnOff', function(){
		  var control = $(this).parent();
		  var dipin = control.find('.pinServo').val();
		  if(dipin == 'NA'){
			  alert("Select digital pin");
			  return false;
		  }
		  $(this).removeClass('digiBtnOff btn-danger')
		  		 .addClass('digiBtnOn btn-info')
				 .text('On');

		  socket.emit('action', {
					  action:'setDigit',
					  digitPort: dipin,
					  val: 'off'
				  	});
	  });
	  
	  
	  //PWM Control
	  
	  //Vertical Servo Control
	  $("#pwm").click(function(e) {
      	var control = $(".pwm").clone();  
		control.removeClass('vServo');
		control.find('.vSlider').slider({
			orientation: 'vertical',
			slide: function(event, ui){
				control.find('.vChild').text(ui.value);
			},
			stop: function(event, ui){
				var digit = control.find('.pinServo').val();
				if(digit != 'NA'){
					socket.emit('action', {
					  action:'pwm',
					  position: ui.value,
					  'digitPin': digit
				  	});
				}
			}
		});
		control.dialog({
			height:250,
			width:120,
			maxWidth:120,
            title:'PWM',
			beforeClose: function(event, ui){
				$(this).dialog('destroy');
			}
		});
      });


	  //Controls for movement panel
      $("#movePanel").click(function(){
      	$(".movePanel").dialog({
      		width:218,
      		height:276,
      		title:'Move Panel'
      	});
      	activeBtnPanel("StopBtn");
      });

      $("#UpBtn").click(function(){
      	activeBtnPanel("UpBtn");
      	socket.emit('action', {
					  action:'MoveUp'
				  	});
      });

      $("#DownBtn").click(function(){
      	activeBtnPanel("DownBtn");      	
      	socket.emit('action', {
					  action:'MoveDown'
				  	});
      });

      $("#LeftBtn").click(function(){
      	activeBtnPanel("LeftBtn");
      	socket.emit('action', {
					  action:'MoveLeft'
				  	});
      });

      $("#RightBtn").click(function(){
      	activeBtnPanel("RightBtn");
      	socket.emit('action', {
					  action:'MoveRight'
				  	});
      });

      $("#StopBtn").click(function(){
		activeBtnPanel("StopBtn");
      	socket.emit('action', {
					  action:'MoveStop'
				  	});
      });


      //Script Manager Controls
      $("#ScriptManager").click(function(){
      	$(".ScriptManager").dialog({title:'Script Manager'});
      });

      $("#addScript").click(function(){
      	$(".ScriptNamer").dialog({
      		width:325,
      		height:120
      	});
      });

      $(".saveScript").click(function(){
      	var name = $("#scptName").val();
      	if(name == ''){
      		return false;
      	}
      	myScripts.push(new scriptObjct(name));

      	$("#scptName").val('');
      	$(".ScriptNamer").dialog('close');

      	var allScript = $.tmpl("scriptsOptions", myScripts);
      	$(".scriptControls tbody").html(allScript);
      	//console.log(name);
      });

      $("body").on('click', '.delScriptBtn', function(){
      	 var data = $.tmplItem(this).data.name;
      	 deleteIndexArray(data);
      	 
      	 var allScript = $.tmpl("scriptsOptions", myScripts);
      	$(".scriptControls tbody").html(allScript);
      });

      $("body").on('click', '.playScriptBtn', function(){
      	 var data = $.tmplItem(this).data.name;
      	 //console.log(data);
      	 socket.emit('action', {
					  action:'playScript',
					  name: data
				  	});
      });
  });


//Change visual color of the movement panel
 var activeBtnPanel = function(str){
 	var active = $(".movePanel").data().active;
 	if(typeof active == 'undefined'){
 		$(".movePanel").data('active', str);
 		$("#"+ str).removeClass('btn-primary').addClass('btn-danger');
 	}else{
 		$("#"+ active).removeClass('btn-danger').addClass('btn-primary');
 		$("#"+ str).removeClass('btn-primary').addClass('btn-danger');
 		$(".movePanel").data('active', str);
 	}
 }

 var deleteIndexArray = function(name){
 	for( var i = 0; i < myScripts.length; i++){
 		if(myScripts[i].name == name){
 			myScripts.splice(i, 1);
 			break;
 		}
 	}
 }