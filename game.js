var log = function(str)
{
	return console.log(str);
}

var BLOCK_WIDTH = 50;
var BLOCK_HEIGHT = 50;

var debugMode = function(){
	if(!DEBUG_MODE)DEBUG_MODE = !DEBUG_MODE;
	else if(DEBUG_MODE)DEBUG_MODE = !DEBUG_MODE;
	document.getElementById('debug').innerText = "debug mode : "+ DEBUG_MODE;
}
$.fn.extend({
    disableSelection: function() {
        this.each(function() {
            this.onselectstart = function() {
                return false;
            };
            this.unselectable = "on";
            $(this).css('-moz-user-select', 'none');
            $(this).css('-webkit-user-select', 'none');
        });
    }
});

$('.no-select').disableSelection();

var game = function(){
	var canvas  = $("#canvas")[0];
	var ctx     = canvas.getContext("2d");
	var _width  = $("#canvas").width();
	var _height = $("#canvas").height();
	grid    = [];
	var tiles	= [];
	var gridWidth = 10;
	var gridHeight = 18;
	var _shape = null;
	totalBlocks = [];
	gameOver = false;
	var requestAnimationFrame = 
    requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
    var lastTime = null;
    var maxTime = 500;
    var startDestroying = false;



    shapeFactory = new ShapeFactory();
    var gui = new GUI(ctx,this);

	    var emitter = new Emitter(ctx);

	    if (window.DeviceOrientationEvent) {
	  	window.addEventListener('deviceorientation', function(e){

	  	var tiltLR = e.gamma;
	  	document.getElementById('debug').innerText = tiltLR;

	  	if(tiltLR < -20)_shape.moveLeft();
	  	else if(tiltLR > 20)_shape.moveRight();

	    // beta is the front-to-back tilt in degrees, where front is positive
	    var tiltFB = e.beta;

	    // alpha is the compass direction the device is facing in degrees
	    var dir = e.alpha;

	  	}, false);
	}


    function loop() {
		update();
		emitter.update();
	}

	function draw() {
		ctx.clearRect(0,0,_width,_height);
		ctx.strokeStyle = 'black';
		ctx.lineWidth=2;
		ctx.strokeRect(0,0,gridWidth*BLOCK_WIDTH,gridHeight*BLOCK_WIDTH);
		
		gui.draw();

		for (var l = 0; l < totalBlocks.length; l++) {
			 totalBlocks[l].draw(ctx)
		};

		for (var l = 0; l < totalBlocks .length; l++) {
			 totalBlocks[l].draw(ctx)
		};

		emitter.draw();
  		requestAnimationFrame(draw);
	}


	function drawGUI(){
		ctx.strokeStyle = 'black';
		ctx.lineWidth=2;
		ctx.strokeRect(400,0,200,720);

		for (var i = 0; i < nextShape.blocks.length; i++) {
		 	nextShape.blocks[i].draw(ctx);
		};
	}

	function init(){
		creatGrid();
		setInterval(function() {
			loop();
		}, 1000/30);

		requestAnimationFrame(draw);
		lastTime = new Date().getTime();

	    var index =  Math.floor(Math.random()*7);
	    _shape = shapeFactory.createShape({color:'#FF0000',game:this,index:index,isDisplay:false});


	  //   canvas.addEventListener('mousedown',function(e){

			// //var mousPosition = new vector(e.layerX,e.layerY);
			// //emitter.emit(mousPosition,'#FF0000',10,10,15);
	  //   },false);
	}

	function creatGrid(){
		for (var i = 0; i < gridWidth; i++) {
			 grid[i] = [];
			 for (var l = 0; l < gridHeight; l++){
			 	  var _tile = new tile(BLOCK_WIDTH*i,BLOCK_WIDTH*l);
			 	  grid[i][l] = _tile;
			 	  tiles.push(_tile);
			 };
		};

		for (var i = 0; i < tiles.length; i++) {
			tiles[i].checkNeighbours(grid);
		};
	}

	function pullBlocksDown(index){
		for (var i = 0; i < totalBlocks.length; i++) {
			 var _y = totalBlocks[i].position.y / totalBlocks[i].height;
			 if(_y < index){
			 	totalBlocks[i].removeObject();
			 }
		};
		for (var l = 0; l < totalBlocks.length; l++) {
			 var _y = totalBlocks[l].position.y / totalBlocks[l].height;
			 if(_y < index){
			 	totalBlocks[l].position.y += BLOCK_WIDTH;
			 	totalBlocks[l].rePosition();
			 }
		};

		startDestroying = false;
	}

	function update(){
		if(gameOver)return;
		
		var currentTime = new Date().getTime();
		var deltaTime = currentTime - lastTime;

		if(deltaTime > maxTime){
			lastTime = currentTime;
			if(!_shape.mayMove){
				check();
				return;
			}
			_shape.update();

		}		
	}

	function check(){
	  if(_shape != null)_shape.checkLastIndexes();
	  if(gameOver)return;
	  if(!startDestroying){
		  if(!checkPatterns()){
		  	 spawnShape();
		  }
		}

	}

	function spawnShape(){
	 
	  var index =  Math.floor(Math.random()*7);
	  _shape = shapeFactory.createShape({color:'#FF0000',game:this,index:gui.nextShape.index,isDisplay:false,offset:new vector(0,0)});
	  gui.newBlock();
	};


	function removeBlocks(list,index){
		destroyBlocks(0,list,index)
	}

	function destroyBlocks(count,list,index) {
	
		if(count == list.length){
			removing(index);
			return;
		}

		list[count].destroyed = true;
		var _postion = new vector(list[count].position.x+20,list[count].position.y+20)
		emitter.emit(_postion,'#EDE275',10,10,15);

		var timer = setInterval(function(){
			destroyBlocks(count+1,list,index)
			clearInterval(timer);
		},50)
	
	}

	function removing(index){

		for (var l = totalBlocks.length-1; l > -1; l--) {
			if(totalBlocks[l].destroyed){
			   totalBlocks[l].removeObject();
			   totalBlocks[l] = null;
			   totalBlocks.splice(l,1);
			}
		};
		pullBlocksDown(index);
	}

	function checkPatterns(){
		var count = 0;
		var list = [];
		var removedIndex = 0;
		var bool = false;

		for (var i = 0; i < gridHeight; i++) {
			 count = 0;
			 list = [];
			 for (var l = 0; l < gridWidth; l++){
			 	  var tile = grid[l][i];
			 	  list.push(tile.obj)
			 	  removedIndex = i;
			 	  if(tile.obj != null)count+=1;
			 	  else break;
			 };
			 if(count == 10){
			 	removeBlocks(list,removedIndex);
			 	bool = true;
			 	startDestroying = true;
			 }
		};

		return bool;
	};
	init();

	$(document).keydown(function(e){
		var key = e.which;

		if(key == 40){
			maxTime = 40;
		}
	});

	$(document).keyup(function(e){
		var key = e.which;

		if(key == 40 && !gameOver){
			maxTime = 500;
		}

		if(key == 38 && !gameOver){
			_shape.rotateSelectedBlock();
		}

		if(key == 37 && !gameOver){
			_shape.moveLeft();
		}

		if(key == 39 && !gameOver){
			_shape.moveRight();
		}
	});

}


$(document).ready(function(){
	var startMenu = StartMenu();
});