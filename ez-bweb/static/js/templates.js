function scriptObjct(name){
	this.name = name;
}

var scriptsOptions = "<tr>"+
					 "<td style='width:64%'>${name}</td>" +
					 "<td><button class='delScriptBtn btn btn-danger'>" + 
					 "<i class='icon-minus'></i>" + 
					 "</button>"+
					 "<button class='playScriptBtn btn btn-success'>" + 
					 "<i class='icon-play'></i>" + 
					 "</button></td>"+
					 "</tr>";


//Compiling templates
$.template("scriptsOptions", scriptsOptions);