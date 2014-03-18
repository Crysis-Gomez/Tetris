
var toggleSound = function(){
	if(!SOUND)SOUND = !SOUND;
	else if(SOUND)SOUND = !SOUND;
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
					       jsonObject = JSON.parse(json);
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
	this.startMenu = null;
	this.grid    = [];
	this.totalBlocks = [];
	this.gameOver = false;
	
	// var stats = new Stats();
	// stats.setMode(0);
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.left = '0px';
	// stats.domElement.style.top = '0px';
	// document.body.appendChild(stats.domElement);
	DATA =  networkManager.getInstance().getData();
	// var canvas  = $("#canvas")[0];
	// var ctx     = canvas.getContext("2d");
	this._width  = getWidth();
	this._height = getHeight();
	this.tiles	= [];
	this._shape = null;
    this.lastTime = new Date().getTime();
    this.maxTime = 500;
    this.startDestroying = false;
    this.paused = false;
    this.touchMoving = false;
    this.touchingY = 0;
    this.touchingX = 0;
    this.totalMultipliers = new Array();
	// var emitter = new Emitter(ctx);

	$('body').bind( "touchstart", function(e){
		//touchingY = e.targetTouches[0].pageY;
	 	
		touchingX= e.originalEvent.touches[0].pageX;
		networkManager.getInstance().Log(touchingX);
		touchMoving = false;
		 //networkManager.getInstance().Log('position Y : '+e.targetTouches[0].pageY);
	});

	$('body').bind( "touchmove", function(e){
		e.preventDefault();
		var dist = touchingX-e.originalEvent.touches[0].pageX;
		if( Math.abs(dist) > 10 && !touchMoving){
			if(dist< 0)_shape.moveRight();
			else _shape.moveLeft();
			touchMoving = true; 
		}
	});

	$('body').bind( "touchend", function(e){
		if(!gameOver && !touchMoving)+_shape.rotateSelectedBlock();
	});

	$(document).keydown(bind(this,this.checkKeysDown));

	$(document).keyup(bind(this,this.checkKeysUp));
}



Game.prototype = manager.createScreen();

Game.prototype.checkKeysUp = function(value){

	var key = value.which;
	
	if(key == 40 && !this.gameOver){
		this.maxTime = 500;
	}

	if(key == 38 && !this.gameOver){
		this._shape.rotateSelectedBlock();
	}

	if(key == 37 && !this.gameOver){
		this._shape.moveLeft();
	}

	if(key == 39 && !this.gameOver){
		this._shape.moveRight();
	}
}

Game.prototype.checkKeysDown = function(value){
	var key = value.which;
	if(key == 40){
		this.maxTime = 40;
	}
};

Game.prototype.update  = function() {
    if(this.paused)this.paused = false;
	this.loop();
	// emitter.update();
}
Game.prototype.draw = function(){
	if(this.gameOver){
			return;
	}

	if(this._shape != null){
		this._shape.draw();
		this.ctx.closePath();
	}
	// emitter.draw();
	// Screen.prototype.draw.call(this);
	requestAnimationFrame(this.drawFunction);
}

Game.prototype.init = function(){
	this.drawFunction = bind(this,this.draw);
	Screen.prototype.init.call(this);
	this.creatGrid();
	this.shapeFactory = new ShapeFactory();
	this.gui = new GUI(this.ctx,this);
    var index =  Math.floor(Math.random()*7);
    this._shape = this.shapeFactory.createShape({color:'#FF0000',game:this,index:index,ctx:this.ctx});

    this.ctx.beginPath();
	this.ctx.clearRect(0,0,this._width,this._height);
	this.ctx.fillStyle = '#FFFFFF'
	this.ctx.fillRect(0,0,gridWidth*BLOCK_WIDTH,gridHeight*BLOCK_WIDTH);
	this.gui.draw();
	var updateFunction = bind(this,this.update);
	setInterval(function() {
			// stats.begin();
			 updateFunction();
			// stats.end();
	}, 1000/60);
}

Game.prototype.checkHighscore = function(){
	var data = {"score":gui.score,"total":totalMultipliers};
}

Game.prototype.reset = function(){
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

Game.prototype.creatGrid = function(){
	this.grid = new Array();
	this.tiles = new Array();
	for (var i = 0; i < gridWidth; i++) {
		 this.grid[i] = [];
		 for (var l = 0; l < gridHeight; l++){
		 	  var _tile = new tile(BLOCK_WIDTH*i,BLOCK_WIDTH*l);
		 	  this.grid[i][l] = _tile;
		 	  this.tiles.push(_tile);
		 };
	};
}


Game.prototype.pullBlocksDown = function(index){
	for (var i = 0; i < this.totalBlocks.length; i++) {
		 var _y = this.totalBlocks[i].position.y / this.totalBlocks[i].height;
		 if(_y < index){
		 	this.totalBlocks[i].removeObject();
		 }
	};
	for (var l = 0; l < this.totalBlocks.length; l++) {
		 var _y = this.totalBlocks[l].position.y / this.totalBlocks[l].height;
		 if(_y < index){
		 	this.totalBlocks[l].position.y += BLOCK_WIDTH;
		 	this.totalBlocks[l].rePosition();
		 }
	};
	this.startDestroying = false;
}

Game.prototype.loop = function(){
	if(this.gameOver)return;
	var currentTime = new Date().getTime();
	var deltaTime = currentTime - this.lastTime;
	if(deltaTime > this.maxTime){
		
		this.lastTime = currentTime;
		if(!this._shape.mayMove){
			this.check();

			return;
		}
		this._shape.update();
	}		
}

Game.prototype.check = function(){
  if(this._shape != null)this._shape.checkLastIndexes();
	  if(this.gameOver){
	  	//this.gameOverMenu = new GameOverMenu(reset);
	  	return;
	  }
  if(!this.startDestroying){
	  if(!this.checkPatterns()){
	  	 this.spawnShape();
	  }
	}
}

Game.prototype.spawnShape = function(){
  this._shape = this.shapeFactory.createShape({color:'#FF0000',game:this,index:this.gui.index,ctx:this.ctx});
  this.gui.newBlock();
};

Game.prototype.removeBlocks = function(list,index,bool){
	this.destroyBlocks(0,list,index,bool);
}

Game.prototype.destroyBlocks = function(count,list,index,bool) {

	if(count == list.length){
		this.removing(index);
		return;
	}
	if(bool)SoundManager.getInstance().playSound("explode");

	list[count].destroyed = true;
	var _postion = new vector(list[count].position.x+20,list[count].position.y+20)
	//emitter.emit(_postion,'#EDE275',10,10,15);
	list[count].removeObject();
	var self = this;

	var timer = setInterval(function(){
		self.destroyBlocks(count+1,list,index,bool)
		clearInterval(timer);
	},50)
}

Game.prototype.removing = function(index){

	for (var l = this.totalBlocks.length-1; l > -1; l--) {
		if(this.totalBlocks[l].destroyed){
		   this.totalBlocks[l].removeObject();
		   this.totalBlocks[l] = null;
		   this.totalBlocks.splice(l,1);	   
		}
	};
	this.pullBlocksDown(index);
}

Game.prototype.checkPatterns = function(){
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
		 	  var tile = this.grid[l][i];
		 	  list.push(tile.obj)
		 	  removedIndex = i;
		 	  if(tile.obj == null){
		 	  	found = false;
		 	  	break;
		 	  }
		 };
		 if(found){
		 	this.removeBlocks(list,removedIndex,play);
		 	play = false;
		 	bool = true;
		 	this.startDestroying = true;
		 	multiplier +=1;
		 }
	};

	if(bool){
		this.gui.score += 1000*multiplier*multiplier;
		this.gui.drawText();
		this.totalMultipliers.push(multiplier);
	}
	return bool;
};


