

var Menu = function(){
	this.init = function(){
		this.canvas  = $("#canvas")[0];
		this.ctx   = canvas.getContext("2d");
		this.bindDown = bind(this,this.OnMouseDown);
		this.bindMoving = bind(this,this.OnMouseMoving);
		this.bindTouch = bind(this,this.OnTouchStart);	
		this.buttons = new Array();
		this.texts = new Array();
		this.canvas.addEventListener('mousemove',this.bindMoving,false);
		this.canvas.addEventListener('mousedown',this.bindDown,false);
		this.canvas.addEventListener('touchstart',this.bindTouch,false);
		this.shown = false;

	}

	this.removeMenu = function(){
		this.canvas.removeEventListener('mousemove',this.bindMoving);
		this.canvas.removeEventListener('mousedown',this.bindDown);
		this.canvas.removeEventListener('touchstart',this.bindTouch);
	}

	this.draw = function(){
		for (var i = 0; i < this.texts.length; i++) {
			this.texts[i].draw();
		};

		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		};
	}

	// this.OnTouchStart = function(e){
	// 	if(collides(playButton,e.layerX,e.layerY)){
	// 		this.removeMenu();
	// 		SoundManager.getInstance().playSound("buttonSound");

	//  	};
	//  	e.preventDefault();
	// }

	this.OnMouseMoving = function(e){
		if(this.shown)return;
		for (var i = 0; i < this.buttons.length; i++) {
			var b = this.buttons[i];
			if(b.collides(e.layerX,e.layerY)){
	
			}
		};
		console.log("moving");
		e.preventDefault();
	}

	this.OnMouseDown = function(e){
		
		if(this.shown){
			this.removeHighScore();
			return;
		}

		for (var i = 0; i < this.buttons.length; i++) {
			if(this.buttons[i].collides(e.layerX,e.layerY)){
				this.buttons[i].draw();
				this.buttons[i].func.call();
			}
		};
		e.preventDefault();
	}

	this.createButton = function(string,position,func){
		var b = new button(this.ctx,string,func,position);
		b.draw();
		this.buttons.push(b);
	}

	this.drawText = function(string,font,color,position){
		this.ctx.font = font;
		this.ctx.fillStyle = color;
		var textWidth = this.ctx.measureText(string);
		position.x = getWidth()*0.5-textWidth.width*0.5;
		this.ctx.fillText(string,position.x, position.y);
	}	

	this.createTextfield = function(ctx,string,font,color,position){
		var t = new textField(ctx,string,font,color,position);
		t.draw();
		this.texts.push(t);
	}
}

var StartMenu = function(){
	this.start();
	
}

var GameOverMenu = function(func){
	this.init();
	var p1 = new vector((getWidth() *0.5)-getWidth()/4,getHeight()/2);
	
	var size = getWidth()/8;
	var font = 'bold '+ size+'px' + ' Arial'
	this.draw();
	this.drawText('GAME OVER',font,'#000000',new vector(0,getHeight()/10));
	size = getWidth()/10;
	font = 'bold '+ size+'px' + ' Arial';
	this.drawText('Your score:'+gui.score ,font,'#000000',new vector(0,getHeight()/5));
	this.createButton("Restart",p1,func);
}

GameOverMenu.prototype = new Menu();
StartMenu.prototype = new Menu();

StartMenu.prototype.start = function(){
	this.init();
	var size = getWidth()/5;
	var font = 'bold '+ size+'px' + ' Arial'
	this.createTextfield(this.ctx,'Tetris',font,'#000000',new vector(0,100))
	var p1 = new vector((getWidth() *0.5)-getWidth()/4,getHeight()/2);

	this.createButton("Start",p1,bind(this,this.StartGame));

	var p2 = p1.clone(); 
	p2.y = p2.y + Math.floor(getHeight()/14 +10);
	this.createButton("Highscore",p2,bind(this,this.showHighScore));
}

StartMenu.prototype.StartGame = function(){
	this.removeMenu();
	Game();
}

StartMenu.prototype.showHighScore = function(){

	this.ctx.strokeStyle = 'rgba(169,169,169,0.9)';
	this.ctx.fillStyle   = 'rgba(169,169,169,0.9)';
	this.ctx.lineWidth=5;
	this.ctx.strokeRect(0,0,getWidth(),getHeight());
	this.ctx.fillRect(0,0,getWidth(),getHeight());

	var data = networkManager.getInstance().getData();
	size = getWidth()/10;
	font = 'bold '+ size+'px' + ' Arial';
	var i = 0;
	for(x in data){
		var text = data[x].name +" "+ data[x].score;
		i++;
		this.drawText(text,font,'#000000',new vector(0,getHeight()/5+100*i));
	}
	this.shown = true;
}

StartMenu.prototype.removeHighScore = function(){
	this.ctx.clearRect(0,0,getWidth(),getHeight());
	this.draw();
	this.shown = false;
}

GameOverMenu.prototype.draw = function(){
	this.ctx.strokeStyle = 'rgba(169,169,169,0.5)';
	this.ctx.fillStyle   = 'rgba(169,169,169,0.5)';
	this.ctx.lineWidth=5;
	this.ctx.strokeRect(0,0,getWidth(),getHeight());
	this.ctx.fillRect(0,0,getWidth(),getHeight());
}

var textField = function(ctx,string,font,color,position){
	this.ctx = ctx;
	this.textString = string;
	this.font = font;
	this.color = color;
	this.position = position;

	this.draw =function(){
		this.ctx.font = this.font;
		this.ctx.fillStyle = this.color;
		var textWidth = this.ctx.measureText(this.textString);
		this.position.x = getWidth()*0.5-textWidth.width*0.5;
 		this.ctx.fillText(string,position.x, position.y);
	}
}


var button = function(ctx,string,func,position){
	this.ctx = ctx;
	
	this.textPosition = new vector(0,0);
	this.string = string;
	this.canvasWidth  = getWidth();
	this.canvasHeight = getHeight();
	this.width = this.canvasWidth/2;
	this.height = Math.floor(this.canvasHeight/14);
	this.position = position;
	
	this.isCollision = false;
	this.func = func;
	this.textSize = this.canvasHeight/15;
	this.font = 'bold '+this.textSize+'px'+' Arial';

	this.redraw = function(){
		this.isCollision = true;
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth = 6;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.canvasHeight/15);

		this.ctx.font = this.font;
		this.ctx.fillStyle = '#000000';
   		this.ctx.fillText(string,this.position.x+this.width * 0.5-ctx.measureText(this.string).width*0.5, this.position.y+this.height-this.height*0.1);
	}

	this.draw = function(){
		this.isCollision = false;
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.font = this.font;
		this.ctx.fillStyle = '#000000';
  		this.ctx.fillText(string,this.position.x+this.width * 0.5-ctx.measureText(this.string).width*0.5, this.position.y+this.height-this.height*0.1);
	}

	this.collides = function (x, y) {
	    var left = this.position.x, right = this.position.x+this.width;
	    var top = this.position.y, bottom = this.position.y+this.height;
	    if (right >= x&& left <= x&& bottom >= y && top <= y){
	    	if(!this.isCollision){
	    		this.redraw(); 
	    	} 
	    	this.isCollision = true;
	    } 
	    else if(this.isCollision) {
	    	this.draw();

	    } 
	    return this.isCollision;
	}
}