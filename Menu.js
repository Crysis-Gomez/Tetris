function bind(scope,func){
	return function(){
		func.apply(scope,arguments)
	}
}
var Menu = function(){
	this.init = function(){
		this.canvas  = $("#canvas")[0];
		this.ctx   = canvas.getContext("2d");
		this.bindDown = bind(this,this.OnMouseDown);
		this.bindMoving = bind(this,this.OnMouseMoving);
		this.bindTouch = bind(this,this.OnTouchStart);	
		this.buttons = new Array();
		this.canvas.addEventListener('mousemove',this.bindMoving,false);
		this.canvas.addEventListener('mousedown',this.bindDown,false);
		this.canvas.addEventListener('touchstart',this.bindTouch,false);
	}

	this.removeMenu = function(){
		this.canvas.removeEventListener('mousemove',this.bindMoving);
		this.canvas.removeEventListener('mousedown',this.bindDown);
		this.canvas.removeEventListener('touchstart',this.bindTouch);
	}

	this.OnTouchStart = function(e){
		if(collides(playButton,e.layerX,e.layerY)){
			this.removeMenu();
	 		
	 	};
	 	e.preventDefault();
	}

	this.OnMouseMoving = function(e){
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].collides(e.layerX,e.layerY);
		};
		e.preventDefault();
	}

	this.OnMouseDown = function(e){
		for (var i = 0; i < this.buttons.length; i++) {
			if(this.buttons[i].collides(e.layerX,e.layerY)){
				this.removeMenu();
				this.buttons[i].func.call();
			}
		};
		e.preventDefault();
	}

	this.drawText = function(string,font,color,position){
		this.ctx.font = font;
		this.ctx.fillStyle = color;
		var textWidth = this.ctx.measureText(string);
		position.x = getWidth()*0.5-textWidth.width*0.5;
		this.ctx.fillText(string,position.x, position.y);
	}	
}

var StartMenu = function(){
	this.init();
	this.drawText('Tetris','bold 100px Arial','#000000',new vector(0,100));
	this.playButton = new button(this.ctx,"Start",Game);
	this.playButton.draw();
	this.buttons.push(this.playButton);
}

var GameOverMenu = function(func){
	this.init();
	this.playButton = new button(this.ctx,"Restart",func);
	this.buttons.push(this.playButton);
	this.draw();
	this.drawText('GAME OVER','bold 100px Arial','#000000',new vector(0,100));
	this.drawText('Your score:'+gui.score ,'bold 80px Arial','#000000',new vector(0,200));
	this.playButton.draw();
}

GameOverMenu.prototype = new Menu();
StartMenu.prototype = new Menu();

GameOverMenu.prototype.draw = function(){
	this.ctx.strokeStyle = 'rgba(169,169,169,0.5)';
	this.ctx.fillStyle   = 'rgba(169,169,169,0.5)';
	this.ctx.lineWidth=5;
	this.ctx.strokeRect(0,0,getWidth(),getHeight());
	this.ctx.fillRect(0,0,getWidth(),getHeight());

}

var button = function(ctx,string,func){
	this.ctx = ctx;
	this.position = new vector(0,400);
	this.textPosition = new vector(0,0);
	this.string = string;
	this.width = 300;
	this.height = 50;
	this.canvasWidth  = getWidth();
	this.canvasHeight = getHeight();
	this.position.x = (this.canvasWidth *0.5) -this.width *0.5;
	this.isCollision = false;
	this.func = func;

	this.redraw = function(){
		this.isCollision = true;
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth = 6;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.font = "bold 40px Arial";
		this.ctx.fillStyle = '#000000';
   		this.ctx.fillText(string,this.position.x+this.width * 0.5-ctx.measureText(this.string).width*0.5, this.position.y+this.height*0.5+10);
	}

	this.draw = function(){
		this.isCollision = false;
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.font = "bold 40px Arial";
		this.ctx.fillStyle = '#000000';
  		this.ctx.fillText(string,this.position.x+this.width * 0.5-ctx.measureText(this.string).width*0.5, this.position.y+this.height*0.5+10);
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