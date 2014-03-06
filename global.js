function bind(scope,func){
	return function(){
		func.apply(scope,arguments)
	}
}

var gridWidth = 10;
var gridHeight = 18;

var currentScreenHeight = $(window).height();
var currentScreenWidth  = $(window).width();

var BLOCK_WIDTH = Math.floor(currentScreenHeight/19);
if(BLOCK_WIDTH > Math.floor(currentScreenWidth/19)){
	BLOCK_WIDTH =  Math.floor(currentScreenWidth/19);
}

if(BLOCK_WIDTH > 40)BLOCK_WIDTH = 40;
if(BLOCK_WIDTH < 20)BLOCK_WIDTH = 20;

SOUND = false;

$(document).ready(function(){
	var canvas = $("#canvas")[0]
	canvas.width =  Math.floor(gridWidth * BLOCK_WIDTH+BLOCK_WIDTH*6+8);
	canvas.height = Math.floor(gridHeight * BLOCK_WIDTH);


	var canvas2 = $("#canvas2")[0];
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;

	$("#contain")[0].width = canvas.width;
	$("#contain")[0].height = canvas.height;
});


var getWidth = function(){
	return $("#canvas").width();
}

var getHeight = function(){
	return $("#canvas").height();
}
