var Block = function(x,y,shape,color,color2,offset){
	this.position = new vector(x,y);
	this.width = 40;
	this.height = 40;
	this.color = color;
	this.secondColor = color2;
	this._shape = shape;
	this.grid = shape.game.grid;
	this.rotatePosition = new vector(0,0);
	this.destroyed = false;
	this.offset = offset;

	this.draw = function(ctx){
		if(this.destroyed){
			return;
		}

		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.getX()+this.offset.x,this.position.getY()+this.offset.y,this.width,this.height);
		ctx.strokeStyle = 'black';
		ctx.lineWidth=1;
		ctx.strokeRect(this.position.getX()+this.offset.x,this.position.getY()+this.offset.y,this.width,this.height);
		
		ctx.fillStyle = this.secondColor;
		ctx.fillRect(this.position.getX()+5+this.offset.x,this.position.getY()+5+this.offset.y,this.width-10,this.height-10);
		ctx.strokeRect(this.position.getX()+5+this.offset.x,this.position.getY()+5+this.offset.y,this.width-10,this.height-10);
	}

	this.init = function(){
		if(this._shape.isDisplay)return;
		this.rePosition();
	}

	this.checkLastIndex = function(){
		if(this.position.y <= 0)gameOver = true;
	}

	this.rotate = function(){
		this.position.x = this.rotatePosition.x;
		this.position.y = this.rotatePosition.y;
		var _x = this.position.x / this.width;
		var _y = this.position.y / this.height;
		this.grid[_x][_y].obj = this;

	}

	this.checkMovement = function(){
		var _x = this.position.getX() / this.width;
		var _y = this.position.getY() / this.height;
		if(_y == 17)return false;
		var tile = this.grid[_x][_y+1];

		if(tile.obj != null && tile.obj._shape !== this._shape){
			return false;
		}
	  return true;
	}

	this.removeObject = function(){
		var _x = this.position.x / this.width;
		var _y = this.position.y / this.height;
		this.grid[_x][_y].obj = null;
	}

	this.rePosition = function(){
		var _x =this.position.x / this.width;
		var _y =this.position.y / this.height;
		this.grid[_x][_y].obj = this;
	}

	this.checkRight = function(){
		if(!this._shape.mayMove)return false;
		var _x = Math.floor(this.position.getX() / this.width);
		var _y = Math.floor(this.position.getY() / this.height);

		if(_x == 9)return false;

		var tile = this.grid[_x+1][_y];
		if(tile.obj != null && tile.obj._shape !== this._shape){
			return false;
		}
	 	return true;
	}

	this.checkLeft = function(){
		if(!this._shape.mayMove)return false;
		var _x = Math.floor(this.position.getX() / this.width);
		var _y = Math.floor(this.position.getY() / this.height);

		if(_x == 0)return false;

		var tile = this.grid[_x-1][_y];
		if(tile.obj != null && tile.obj._shape !== this._shape){
			return false;
		}
	 	return true;
	}
	this.init();
}
