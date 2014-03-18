var screenManager = function(){
	this.totalScreen = new Array();
	this.currentScreen = null;

	this.init = function(){
	}

	this.createScreen = function(){
		var _screen = new Screen();
		return _screen;
	}

	this.draw = function(){
		if(this.currentScreen!= null)if(this.currentScreen.active)this.currentScreen.draw();		
	}
	
	this.activateScreen = function(Screen){
		if(this.currentScreen != null)this.currentScreen.deactivate();
		this.currentScreen = Screen;
		this.currentScreen.activate();
		this.currentScreen.draw();
	}

	this.deactivateScreen = function(scr){
		scr.active = false;
		scr.deactivate();
	}

	this.update = function(){
		this.currentScreen.update();
	}
}


var Screen = function(){
	var requestAnimationFrame = 
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
    this.drawFunction = bind(this,Screen.prototype.draw);
};
	
Screen.prototype.init = function(){
	this.canvas  = $("#canvas")[0];
	this.ctx   = canvas.getContext("2d");
	this.bindDown = bind(this,this.OnMouseDown);
	this.bindMoving = bind(this,this.OnMouseMoving);
	this.bindTouch = bind(this,this.OnTouchStart);
	this.active = false;
}

Screen.prototype.activate = function(){
	this.init();
	this.active = true;
	this.canvas.addEventListener('mousemove',this.bindMoving,false);
	this.canvas.addEventListener('mousedown',this.bindDown,false);
	this.canvas.addEventListener('touchstart',this.bindTouch,false);
};


Screen.prototype.deactivate = function(){
	this.canvas.removeEventListener('mousemove',this.bindMoving);
	this.canvas.removeEventListener('mousedown',this.bindDown);
	this.canvas.removeEventListener('touchstart',this.bindTouch);
	this.active = false;
	this.clearCanvas();
}
Screen.prototype.clearCanvas = function(){
	this.ctx.clearRect(0,0,getWidth(),getHeight());
}

Screen.prototype.draw = function(){
	requestAnimationFrame(this.drawFunction);
}

Screen.prototype.update = function(){

}

Screen.prototype.OnMouseMoving = function(e){

}

Screen.prototype.OnTouchStart = function(e){

}

Screen.prototype.OnMouseDown = function(e){

}
