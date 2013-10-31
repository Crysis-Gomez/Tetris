var Block = function(x,y,shape,color,color2,display){
	this.position = new vector(x,y);
	this.width = BLOCK_WIDTH;
	this.height =BLOCK_WIDTH;
	this.color = color;
	this.secondColor = color2;
	this._shape = shape;
	this.grid = shape.game.grid;
	this.rotatePosition = new vector(0,0);
	this.destroyed = false;

	this.draw = function(ctx){
		if(this.destroyed){
			return;
		}

		ctx.fillStyle = this.color;	
		ctx.fillRect(this.position.getX(),this.position.getY(),this.width,this.height);
		ctx.strokeStyle = 'black';
		ctx.lineWidth=1;
		ctx.strokeRect(this.position.getX(),this.position.getY(),this.width,this.height);
		
		ctx.fillStyle = this.secondColor;
		ctx.fillRect(this.position.getX()+5,this.position.getY()+5,this.width-10,this.height-10);
		ctx.strokeRect(this.position.getX()+5,this.position.getY()+5,this.width-10,this.height-10);
	}

	this.getOffSet = function(){
		var startX = gridWidth*BLOCK_WIDTH;
		this.offset.x = startX-BLOCK_WIDTH-10;
		this.offset.y = 50;
	}

	this.init = function(){
		if(this._shape.isDisplay)return;
		this.rePosition();
	}

	this.checkLastIndex = function(){
		if(this.position.y <= 0){
			gameOver = true;
			SoundManager.getInstance().playSound("gameOver");
		}
	}

	this.rotate = function(){
		this.position.x = this.rotatePosition.x;
		this.position.y = this.rotatePosition.y;
		var _x = Math.floor(this.position.x / BLOCK_WIDTH);
		var _y = Math.floor(this.position.y / BLOCK_WIDTH);
		this.grid[_x][_y].obj = this;

	}

	this.checkMovement = function(){
		var _x = Math.floor(this.position.getX() / BLOCK_WIDTH);
		var _y = Math.floor(this.position.getY() / BLOCK_WIDTH);
		if(_y == 17)return false;
		var tile = this.grid[_x][_y+1];

		if(tile.obj != null && tile.obj._shape !== this._shape){
			return false;
		}
	  return true;
	}

	this.removeObject = function(){
		var _x = Math.floor(this.position.x / BLOCK_WIDTH);
		var _y = Math.floor(this.position.y / BLOCK_WIDTH);

		this.grid[_x][_y].obj = null;
	}

	this.rePosition = function(){
		var _x = Math.floor(this.position.x / BLOCK_WIDTH);
		var _y = Math.floor(this.position.y / BLOCK_WIDTH);
		this.grid[_x][_y].obj = this;
	}

	this.checkRight = function(){
		if(!this._shape.mayMove)return false;
		var _x = Math.floor(this.position.getX() / BLOCK_WIDTH);
		var _y = Math.floor(this.position.getY() / BLOCK_WIDTH);

		if(_x == 9)return false;

		var tile = this.grid[_x+1][_y];
		if(tile.obj != null && tile.obj._shape !== this._shape){
			return false;
		}
	 	return true;
	}

	this.checkLeft = function(){
		if(!this._shape.mayMove)return false;file:///C:/Users/Sony/Desktop/tetrisGame/game.js
		var _x = Math.floor(this.position.getX() /BLOCK_WIDTH);
		var _y = Math.floor(this.position.getY() / BLOCK_WIDTH);

		if(_x == 0)return false;

		var tile = this.grid[_x-1][_y];
		if(tile.obj != null && tile.obj._shape !== this._shape){
			return false;
		}
	 	return true;
	}
	this.init();
}
