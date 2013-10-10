var StartMenu = function(){
	var canvas  = $("#canvas")[0];
	var ctx     = canvas.getContext("2d");
	var playButton = new button(ctx,'Play');
	var canvasWidth  = $("#canvas").width();
	var canvasHeight = $("#canvas").height();

	playButton.draw();
	drawText('Tetris');
	
	// canvas.onselectstart = function () { return false; }

	// document.getElementById('canvas').setAttribute('class', 'unselectable');
	// document.getElementById('canvas').removeAttribute('class');

	// // the opera way
	// document.getElementById('canvas').setAttribute('unselectable', 'on');
	// document.getElementById('canvas').removeAttribute('unselectable');


	canvas.addEventListener('mousemove',OnMouseMoving,false);
	canvas.addEventListener('mousedown',OnMouseDown,false);

	canvas.addEventListener('touchstart', function(event) {
		if(playButton != null){
			if(collides(playButton,event.layerX,event.layerY)){
				game();
				playButton = null;
			}
		}
    	event.preventDefault();
	}, false);


	function OnMouseMoving(e){
		collides(playButton,e.layerX,e.layerY);
		e.preventDefault()
	}

	function OnMouseDown(e){
		if(collides(playButton,e.layerX,e.layerY)){
			game();

			canvas.removeEventListener('mousemove',OnMouseMoving);
			canvas.removeEventListener('mousedown',OnMouseDown);
		}
		e.preventDefault()
	}

	function drawText(string){
		ctx.font = "bold 100px Arial";
		ctx.fillStyle = '#000000';
		var textWidth = ctx.measureText("Tetris");
		var _x = canvasWidth*0.5-textWidth.width*0.5;
		ctx.fillText(string,_x, 100);
	}

	function collides(button, x, y) {
	    var isCollision = false;
	    var left = button.position.x, right = button.position.x+button.width;
	    var top = button.position.y, bottom = button.position.y+button.height;
	    if (right >= x&& left <= x&& bottom >= y && top <= y){button.redraw(); isCollision = true;} 
	    else button.draw();

	    return isCollision;
	}
}

var button = function(ctx,string){
	this.ctx = ctx;
	this.position = new vector(0,400);
	this.textPosition = new vector(0,0);
	this.string = string;
	this.width = 300;
	this.height = 50;
	this.canvasWidth  = $("#canvas").width();
	this.canvasHeight = $("#canvas").height();
	this.position.x = (this.canvasWidth *0.5) -this.width *0.5;
	
	this.redraw = function(){
		this.ctx.clearRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.font = "bold 40px Arial";
		this.ctx.fillStyle = '#000000';
  		this.ctx.fillText("Start",this.position.x+this.width * 0.5-ctx.measureText("Start").width*0.5, this.position.y+this.height*0.5+10);
	}

	this.draw = function(){
		this.ctx.clearRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth=5;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);
		this.ctx.font = "bold 40px Arial";
		this.ctx.fillStyle = '#000000';
  		this.ctx.fillText("Start",this.position.x+this.width * 0.5-ctx.measureText("Start").width*0.5, this.position.y+this.height*0.5+10);
	} 
}