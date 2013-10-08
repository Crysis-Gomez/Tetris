var tile = function(x,y){
	this.position = new vector(x,y);
	this.width = 40;
	this.height = 40;
	this.color = 'blue';
	this.obj = null;
	this.tileUp = null;
	this.tileDown = null;
	this.tileRight = null;
	this.tileLeft = null;

	this.draw = function(ctx){
		ctx.strokeStyle = 'black';
		ctx.lineWidth=2;
		if(this.obj != null){
			ctx.lineWidth=4;
			ctx.strokeStyle = 'blue';
		}
		ctx.strokeRect(this.position.getX(),this.position.getY(),this.width,this.height);
	}

	this.checkNeighbours = function(grid){

		var index_x = Math.floor(this.position.x / this.width);
		var index_y = Math.floor(this.position.y / this.height); 

		if(index_x +1 < 10)
		{
			this.tileRight = grid[index_x+1][index_y];
		} 
		if(index_y + 1 < 14)
		{
			this.tileDown = grid[index_x][index_y+1];
		} 
		if(index_y > 0)
		{
			this.tileUp = grid[index_x][index_y-1];
		} 
		if(index_x > 0)
		{
			this.tileLeft = grid[index_x-1][index_y];
		} 
	}
}