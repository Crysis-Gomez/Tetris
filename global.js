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
	$("#canvas")[0].width =  Math.floor(gridWidth * BLOCK_WIDTH+BLOCK_WIDTH*6+8);
	$("#canvas")[0].height = Math.floor(gridHeight * BLOCK_WIDTH);
	
});


var getWidth = function(){
	return $("#canvas").width();
}

var getHeight = function(){
	return $("#canvas").height();
}
