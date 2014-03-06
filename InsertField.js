var insertField = function(position){

	this.init = function(){
		this.canvas  = $("#canvas")[0];
		this.ctx   = canvas.getContext("2d");
		this.bindDown = bind(this,this.OnMouseDown);
		this.bindKeyDown = bind(this,this.OnKeyDown);
		this.bindKeyUp = bind(this,this.OnKeyUp);
		this.canvasWidth  = getWidth();
		this.canvasHeight = getHeight();
		this.width = this.canvasWidth/2;
		this.height = Math.floor(this.canvasHeight/14);
		this.position = position;
		this.currentString = "";
		this.canvas.addEventListener('mousedown',this.bindDown,false);
		this.shift = false;
		this.caps = false;
		

		this.gotCursor = false;
		this.mayDrawCursor =true;
		this.cursorPosition = this.position.clone();
		this.requestAnimationFrame = 
		    requestAnimationFrame ||
		    window.webkitRequestAnimationFrame ||
		    window.mozRequestAnimationFrame ||
		    window.msRequestAnimationFrame ||
		    window.oRequestAnimationFrame;
		 this.drawRect();

	}

	
	this.drawRect = function(){
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.strokeStyle = '#c0c0c0';
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.font = this.font;
		this.ctx.fillStyle = '#000000';
	}

	this.drawCursor = function(){
		this.ctx.clearRect(this.cursorPosition.x+3,this.cursorPosition.y+2,2,this.height-2);
		if(this.mayDrawCursor){
			this.ctx.strokeStyle = '#000000';
			this.ctx.lineWidth = 1;
			
			this.ctx.fillRect(this.cursorPosition.x+3,this.cursorPosition.y+2,2,this.height-2);
		}

		requestAnimationFrame(bind(this,this.drawCursor));
	}

	this.moveCursor = function(stringWidth){
		this.drawRect();
		this.ctx.clearRect(this.cursorPosition.x+3,this.cursorPosition.y+2,2,this.height-2);
		this.cursorPosition.x = this.position.x +stringWidth;
		this.ctx.strokeStyle = '#000000';
		this.ctx.lineWidth = 1;
		this.ctx.fillRect(this.cursorPosition.x+3,this.cursorPosition.y+2,2,this.height-2);
		
	}

	this.changeBoolean = function(){

		if(this.mayDrawCursor) this.mayDrawCursor = !this.mayDrawCursor
		 else this.mayDrawCursor = !this.mayDrawCursor
	}


	this.initCursor = function(){
		this.gotCursor = true;
		this.drawCursor();
		window.addEventListener('keydown',this.bindKeyDown,true);
		window.addEventListener('keyup',this.bindKeyUp,true);
		setInterval(bind(this,this.changeBoolean), 500);
	}

	this.removeCursor = function(){
		this.gotCursor = false;
	}

	this.collides = function (x, y) {
	    var left = this.position.x, right = this.position.x+this.width;
	    var top = this.position.y, bottom = this.position.y+this.height;
	    if (right >= x&& left <= x&& bottom >= y && top <= y)return true
	    return false;
	}

	this.OnMouseDown = function(e){
		if(this.collides(e.layerX,e.layerY)){
			console.log("hitting")
			this.initCursor();
		}else this.removeCursor();


		e.preventDefault();
	}

	this.addText = function(){
		var size = getWidth()/18;
		var font = 'bold '+ size+'px' + ' Arial';

		var posi = this.position.clone();
		posi.y =  posi.y +this.height-10;
		posi.x +=3;
	
		var field = new textField(this.ctx,this.currentString,font,"#000000",posi,false);
		field.draw();
	}

	this.OnKeyUp = function(e){
		if(e.keyCode == 16){
			this.shift = false;
		}
	}

	this.OnKeyDown = function(e){

		var textWidth = this.ctx.measureText(this.currentString).width;

		if(e.keyCode == 16){
			this.shift = true;
		}

		if(e.keyCode == 8){
		 	this.currentString = this.currentString.slice(0,this.currentString.length-1);
		}else if(e.keyCode < 99 && e.keyCode > 60){
			if(textWidth+20 >= this.width)return;

			if(this.shift)this.currentString += String.fromCharCode(e.keyCode);
			else this.currentString += String.fromCharCode(e.keyCode).toLowerCase();
		}

		textWidth = this.ctx.measureText(this.currentString).width;
		this.moveCursor(textWidth);
		this.addText();

	}

}