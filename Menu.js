var Menu = function(){
	this.buttons = new Array();
	this.texts = new Array();
	this.shown = false;
};

Menu.prototype = manager.createScreen();

Menu.prototype.init = function(){
	Screen.prototype.init.call(this);
};


Menu.prototype.drawBackground = function(){};


Menu.prototype.draw = function(){
	this.drawBackground();
	for (var i = 0; i < this.texts.length; i++) {
		this.texts[i].draw();
	};

	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].draw();
	};
};


Menu.prototype.OnTouchStart = function(e){
 	e.preventDefault();
}

Menu.prototype.OnMouseMoving = function(e){
	if(this.shown)return;
	for (var i = 0; i < this.buttons.length; i++) {
		var b = this.buttons[i];
		if(b.collides(e.layerX,e.layerY)){
		}
	};
	e.preventDefault();
};

Menu.prototype.OnMouseDown = function(e){
	if(this.shown){
		this.removeHighScore();
		return;
	};

	for (var i = 0; i < this.buttons.length; i++) {
		if(this.buttons[i].collides(e.layerX,e.layerY)){
			this.buttons[i].draw();
			this.buttons[i].func.call();			
		}
	};
	e.preventDefault();
};

Menu.prototype.createButton = function(string,func,offset){
	var b = new button(this.ctx,string,func,offset);
	b.draw();
	this.buttons.push(b);
};

Menu.prototype.drawText = function(string,font,color,position){
	this.ctx.font = font;
	this.ctx.fillStyle = color;
	var textWidth = this.ctx.measureText(string);
	position.x = getWidth()*0.5-textWidth.width*0.5;
	this.ctx.fillText(string,position.x, position.y);
};

Menu.prototype.createTextfield = function(ctx,string,font,color,position,center){
	var t = new textField(ctx,string,font,color,position,center);
	t.draw();
	this.texts.push(t);
	console.log("created Text");
	console.log(this.texts)
};


// Menu.prototype = new Screen();


var StartMenu = function(){
 	this.start();
};

// var GameOverMenu = function(func){
// 	this.init();
// 	var p1 = new vector((getWidth() *0.5)-getWidth()/4,getHeight()/2);
// 	this.func = func;
// 	var size = getWidth()/8;
// 	var font = 'bold '+ size+'px' + ' Arial';
// 	this.draw();
// 	this.drawText('GAME OVER',font,'#000000',new vector(0,getHeight()/10));
// 	size = getWidth()/10;
// 	font = 'bold '+ size+'px' + ' Arial';
// 	this.drawText('Your score:'+gui.score ,font,'#000000',new vector(0,getHeight()/5));
// 	this.createButton("Restart",bind(this,this.restart));
// }

// GameOverMenu.prototype = new Menu();
StartMenu.prototype = new Menu();

StartMenu.prototype.OnTouchStart = function(e){
	this.start();
 	e.preventDefault();
}


StartMenu.prototype.start = function(){
	// Menu.prototype.init.call(this);
	this.init();
	this.draw();
	console.log(getWidth());
	var size = getWidth()/(getWidth()*0.005);
	var font = 'bold '+ size+'px' + ' Arial'
	this.createTextfield(this.ctx,'Tetris',font,'#000000',new vector(0,150),true);

	var offset = function(){
		return Math.floor(getHeight()/(getHeight()*0.01));
	}
	
	this.createButton("Start",bind(this,this.StartGame),null);
	this.createButton("Highscore",bind(this,this.showHighScore),offset);

}



StartMenu.prototype.drawBackground = function(){
	this.ctx.clearRect(0,0,getWidth(),getHeight());
	this.ctx.fillStyle = '#FFFFFF';
	this.ctx.fillRect(0,0,getWidth(),getHeight());
}

StartMenu.prototype.StartGame = function(){
	//this.removeMenu();
	//Game();
	manager.activateScreen(game);
	// manager.deactivateScreen(this);
}


// GameOverMenu.prototype.restart = function(){
// 	this.removeMenu();
// 	this.func.call();
// }



StartMenu.prototype.showHighScore = function(){
	this.ctx.strokeStyle = 'rgba(169,169,169,0.9)';
	this.ctx.fillStyle   = 'rgba(169,169,169,0.9)';
	this.ctx.lineWidth=5;
	this.ctx.strokeRect(0,0,getWidth(),getHeight());
	this.ctx.fillRect(0,0,getWidth(),getHeight());

	var data = networkManager.getInstance().getData();
	size = getWidth()/15;
	font = 'bold '+ size+'px' + ' Arial';
	var i = 0;
	for(x in data){
		var text = data[x].name +" "+ data[x].score;
		i++;
		this.drawText(text,font,'#000000',new vector(0,getHeight()/5+110*i));
	}
	this.shown = true;
}

StartMenu.prototype.removeHighScore = function(){
	this.ctx.clearRect(0,0,getWidth(),getHeight());
	this.draw();
	this.shown = false;
}

// GameOverMenu.prototype.draw = function(){
// 	this.ctx.strokeStyle = 'rgba(169,169,169,0.5)';
// 	this.ctx.fillStyle   = 'rgba(169,169,169,0.5)';
// 	this.ctx.lineWidth=5;
// 	this.ctx.strokeRect(0,0,getWidth(),getHeight());
// 	this.ctx.fillRect(0,0,getWidth(),getHeight());
// }

// GameOverMenu.prototype.checkScores = function(score){
  
//    //var data

// }

var textField = function(ctx,string,font,color,position,center){
	this.ctx = ctx;
	this.textString = string;
	this.font = font;
	this.color = color;
	this.position = position;
	this.centerText = center;

	this.draw =function(){
		this.ctx.font = this.font;
		this.ctx.fillStyle = this.color;
		var textWidth = this.ctx.measureText(this.textString);
		if(this.centerText)this.position.x = getWidth()*0.5-textWidth.width*0.5;
 		this.ctx.fillText(string,position.x, position.y);
	}
}


var button = function(ctx,string,func,offset){
	this.ctx = ctx;
	
	this.textPosition = new vector(0,0);
	this.string = string;
	this.canvasWidth  = getWidth();
	this.canvasHeight = getHeight();
	this.width = this.canvasWidth/2;
	this.height = Math.floor(this.canvasHeight/14);
	this.position =  new vector((getWidth() *0.5)-getWidth()/4,getHeight()/2);;
	
	this.isCollision = false;
	this.func = func;
	this.textSize = this.canvasHeight/15;
	this.font = 'bold '+this.textSize+'px'+' Arial';
	this.offset = offset;



	this.getFontSize = function(){
		var max = Math.max(getWidth(),getHeight());
		return max / 25;
	}

	this.redraw = function(){
		this.position = new vector((getWidth() *0.5)-getWidth()/4,getHeight()/2);
		this.canvasWidth  = getWidth();
		this.canvasHeight = getHeight();
		this.width = this.canvasWidth/2;
		this.height = Math.floor(this.canvasHeight/14);
		this.textSize = this.getFontSize();
		this.font = 'bold '+this.textSize+'px'+' Arial';
		if(this.offset != null) this.position.y += this.offset.call();
		
		this.isCollision = true;
		this.ctx.lineWidth = 1;
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.fillStyle = '#FFFFFF'
		this.ctx.fillRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);

		this.ctx.lineWidth = 6;
		this.ctx.strokeRect(this.position.x,this.position.y,this.width,this.canvasHeight/15);

		this.ctx.font = this.font;
		this.ctx.fillStyle = '#000000';
   		this.ctx.fillText(string,this.position.x+this.width * 0.5-ctx.measureText(this.string).width*0.5, this.position.y+this.height-this.height*0.1);
	}

	this.draw = function(){
		this.position = new vector((getWidth() *0.5)-getWidth()/4,getHeight()/2);
		this.canvasWidth  = getWidth();
		this.canvasHeight = getHeight();
		this.width = this.canvasWidth/2;
		this.height = Math.floor(this.canvasHeight/14);
		this.textSize = this.getFontSize();
		this.font = 'bold '+this.textSize+'px'+' Arial';
		if(this.offset != null) this.position.y += this.offset.call();

		this.isCollision = false;
		this.ctx.lineWidth = 6;
		this.ctx.clearRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
		this.ctx.fillStyle = '#FFFFFF'
		this.ctx.fillRect(this.position.x-this.ctx.lineWidth,this.position.y-this.ctx.lineWidth,this.width+this.ctx.lineWidth*2,this.height+this.ctx.lineWidth*2);
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