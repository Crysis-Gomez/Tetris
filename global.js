function bind(scope,func){
	return function(){
		func.apply(scope,arguments)
	}
}

var gridWidth = 10;
var gridHeight = 18;
var currentScreenHeight = $(window).height();
var currentScreenWidth  = $(window).width();
var BLOCK_WIDTH = 40;
var manager = new screenManager();

SOUND = false;
var game;
var startMenu;

var calculateCanvasWidth = function(){
    var size = currentScreenWidth;
    if(currentScreenWidth < 680)BLOCK_WIDTH = 35;
    if(currentScreenWidth < 581)BLOCK_WIDTH = 30;
    if(currentScreenWidth < 481)BLOCK_WIDTH = 20;
    var canvas = $("#canvas")[0];
    canvas.height = currentScreenHeight;
    canvas.width = BLOCK_WIDTH *gridWidth + BLOCK_WIDTH *6 +10;
}

var calculateCanvasHeight = function(){
    var size = currentScreenHeight;
    if(currentScreenHeight < 680)BLOCK_WIDTH = 30;
    if(currentScreenHeight < 581)BLOCK_WIDTH = 25;
    if(currentScreenHeight < 481)BLOCK_WIDTH = 20;
    var canvas = $("#canvas")[0];
    canvas.height = currentScreenHeight;
    canvas.width = BLOCK_WIDTH *gridWidth + BLOCK_WIDTH *6 +10;

}

$(document).ready(function(){
   
    if(currentScreenHeight< currentScreenWidth)calculateCanvasHeight();
    else calculateCanvasWidth();
    console.log(BLOCK_WIDTH)
    //canvas.width = currentScreenWidth *0.7;
    //canvas.height = currentScreenHeight;

    manager.init();

    // BLOCK_WIDTH = Math.floor ((canvas.width - canvas.width*0.4) / gridWidth );
    // if(BLOCK_WIDTH > 55) BLOCK_WIDTH = 55;
    // console.log(BLOCK_WIDTH)
    // //if(BLOCK_WIDTH > 40)BLOCK_WIDTH =40;

    
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
   //resizeCanvas();
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
