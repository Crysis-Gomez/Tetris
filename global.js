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
var manager = new screenManager();

if(BLOCK_WIDTH > Math.floor(currentScreenWidth/19)){
	BLOCK_WIDTH =  Math.floor(currentScreenWidth/19);
}

if(BLOCK_WIDTH > 40)BLOCK_WIDTH = 40;
if(BLOCK_WIDTH < 20)BLOCK_WIDTH = 20;

SOUND = false;
var game;
var startMenu;

$(document).ready(function(){
	var canvas = $("#canvas")[0];
	canvas.width = 700;
    canvas.height = 800;
    manager.init();
    // BLOCK_WIDTH = Math.floor((canvas.width / gridWidth) *0.28);
    game = new Game();
	startMenu = new StartMenu();
    manager.activateScreen(startMenu);

	//canvas.width =  Math.floor(gridWidth * BLOCK_WIDTH+BLOCK_WIDTH*6+8);
///	canvas.height = Math.floor(gridHeight * BLOCK_WIDTH);
	// BLOCK_WIDTH = Math.round((canvas.width/2)/gridWidth);
	// console.log(BLOCK_WIDTH);
	// menu = new StartMenu();
});

window.onresize = function(event) {
   resizeCanvas();
};

var resizeCanvas = function(){
	console.log("resize");
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    manager.draw();
    // manager.draw();
    //menu.draw();
    //menu.removeHighScore();
}

var getWidth = function(){
	return $("#canvas").width();
}

var getHeight = function(){
	return $("#canvas").height();
}
