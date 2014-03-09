
var toggleSound = function(){
	if(!SOUND)SOUND = !SOUND;
	else if(SOUND)SOUND = !SOUND;

	document.getElementById('debug').innerText = "Sound  = "+ SOUND;

	if(SOUND){
		SoundManager.getInstance().loadSound("buttonSound",'http://jerrygomez.nl/Games/tetrisGame/assets/Blip_Select3.wav',1);
		SoundManager.getInstance().loadSound("pickup",'http://jerrygomez.nl/Games/tetrisGame/assets/Pickup_Coin4.wav',4);
		SoundManager.getInstance().loadSound("explode",'http://jerrygomez.nl/Games/tetrisGame/assets/Explosion4.wav',10);
		SoundManager.getInstance().loadSound("gameOver",'http://jerrygomez.nl/Games/tetrisGame/assets/gameOver.wav',1);
	}
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


var networkManager = (function () {

    var instance;
    var playersData;

    function createInstance() {
        return{


        		getPlayersData:function(){
        			return playersdata;
        		},

                getData:function(){
                	var url = 'getData.php';
                	var jsonObject = null;
					$.ajax({
					   type: 'GET',
					    url: url,
					    async: false,
					    contentType: "application/json",
					    success: function(json) {
					       // jsonObject = JSON.parse(json);
					       // playersdata = {"first":jsonObject.first.score,"second":jsonObject.second.score,"third":jsonObject.third.score};
					    },
					    error: function(e) {
					       console.log(e.message);
					    }
					});
					return jsonObject;
                },

                sendData:function(data){
                	var _data = "first";
					if(_data != 'none'){
						$.post("highscore.php", {data:_data,score:1000}, function(results){
						  // the output of the response is now handled via a variable call 'results'
					
						});
					}
                },

                Log:function(data){
			 
                	data = String(data);
                	console.log(data);
                	$.post("log.php", {data:data}, function(results){});
                }
        }
    }

    return {

        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

var Game = function(){
	startMenu = null;
	grid    = [];
	totalBlocks = [];
	gameOver = false;
	
	var stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
	DATA =  networkManager.getInstance().getData();

	var canvas  = $("#canvas")[0];
	
	var ctx     = canvas.getContext("2d");
	var _width  = getWidth();
	var _height = getHeight();
	var tiles	= [];
	var _shape = null;
	var requestAnimationFrame = 
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
    var lastTime = null;
    var maxTime = 500;
    var startDestroying = false;
    paused = false;

    var touchMoving = false;
    var touchingY = 0;

    totalMultipliers = new Array();

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

	function checkHighscore(){
		var data = {"score":gui.score,"total":totalMultipliers};
	}

    function loop() {
    	if(paused)paused = false;
		update();
		emitter.update();
	}

	function reset(){
		for (var i = 0; i < totalBlocks.length; i++) {
			totalBlocks[i].removeObject();
		};
		totalBlocks = new Array();
		gui.score = 0;
		gui.newBlock();
		var index =  Math.floor(Math.random()*7);
	    _shape = shapeFactory.createShape({color:'#FF0000',game:this,index:index,ctx:ctx});
		gameOverMenu = null;
		gameOver = false;
		maxTime = 500;
		ctx.beginPath();
		ctx.clearRect(0,0,_width,_height);
		ctx.fillStyle = '#FFFFFF'
		ctx.fillRect(0,0,gridWidth*BLOCK_WIDTH,gridHeight*BLOCK_WIDTH);
		gui.draw();

		requestAnimationFrame(draw);
		totalMultipliers = new Array();
	}

	function draw() {
		if(gameOver){
			return;
		}

		_shape.draw();
		
		emitter.draw();

		ctx.closePath();
  		requestAnimationFrame(draw);
	}

	this.init = function(){
		creatGrid();
		setInterval(function() {
			stats.begin();
			loop();
			stats.end();
		}, 1000/60);

		requestAnimationFrame(draw);
		lastTime = new Date().getTime();
		shapeFactory = new ShapeFactory();
    	gui = new GUI(ctx,this);
	    var index =  Math.floor(Math.random()*7);
	    _shape = shapeFactory.createShape({color:'#FF0000',game:this,index:index,ctx:ctx});

	    ctx.beginPath();
		ctx.clearRect(0,0,_width,_height);
		ctx.fillStyle = '#FFFFFF'
		ctx.fillRect(0,0,gridWidth*BLOCK_WIDTH,gridHeight*BLOCK_WIDTH);
		gui.draw();

	}

	function creatGrid(){
		grid = new Array();
		tiles = new Array();
		for (var i = 0; i < gridWidth; i++) {
			 grid[i] = [];
			 for (var l = 0; l < gridHeight; l++){
			 	  var _tile = new tile(BLOCK_WIDTH*i,BLOCK_WIDTH*l);
			 	  grid[i][l] = _tile;
			 	  tiles.push(_tile);
			 };
		};

		// for (var i = 0; i < tiles.length; i++) {
		// 	tiles[i].checkNeighbours(grid);
		// };
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
	  if(gameOver){
	  	gameOverMenu = new GameOverMenu(reset);
	  	return;
	  }
	  if(!startDestroying){
		  if(!checkPatterns()){
		  	 spawnShape();
		  }
		}
	}

	function spawnShape(){
	  _shape = shapeFactory.createShape({color:'#FF0000',game:this,index:gui.index,ctx:ctx});
	  gui.newBlock();
	};

	function removeBlocks(list,index,bool){
		destroyBlocks(0,list,index,bool);
	}

	function destroyBlocks(count,list,index,bool) {
	
		if(count == list.length){
			removing(index);
			return;
		}
		if(bool)SoundManager.getInstance().playSound("explode");

		list[count].destroyed = true;
		var _postion = new vector(list[count].position.x+20,list[count].position.y+20)
		//emitter.emit(_postion,'#EDE275',10,10,15);
		list[count].removeObject();


		

		var timer = setInterval(function(){
			destroyBlocks(count+1,list,index,bool)
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
		var multiplier = 1;
		var play = true;

		for (var i = 0; i < gridHeight; i++) {
			 list = [];
			 var found = true;
			 for (var l = 0; l < gridWidth; l++){
			 	  var tile = grid[l][i];
			 	  list.push(tile.obj)
			 	  removedIndex = i;
			 	  if(tile.obj == null){
			 	  	found = false;
			 	  	break;
			 	  }
			 };
			 if(found){
			 	removeBlocks(list,removedIndex,play);
			 	play = false;
			 	bool = true;
			 	startDestroying = true;
			 	multiplier +=1;
			 }
		};

		
		if(bool){
			gui.score += 1000*multiplier*multiplier;
			gui.drawText();
			totalMultipliers.push(multiplier);
		}

		return bool;
	};
	init();

	$('body').bind( "touchstart", function(e){
	
	});

	$('body').bind( "touchmove", function(e){
		touchMoving = true;
		networkManager.getInstance().Log(e);
		e.preventDefault();

	});

	$('body').bind( "touchend", function(e){
		 networkManager.getInstance().Log("Touching");
	        if(!gameOver && !touchMoving)+_shape.rotateSelectedBlock();
	        touchMoving = false;
	});


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
	startMenu = new StartMenu();
});



