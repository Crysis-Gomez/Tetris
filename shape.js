var Shape = function(options){
	this.blocks = [];
	this.game = options.game;
	this.color = options.color;
	this.mayMove = true;

	this.maxHeight = $("#canvas").height();
	this.moveDirection = 0;
	this.rotation = 0;
	this._type = 0;
	this.rotateBlocks = [];
	this.mayRotate = true;
	this.maxRotation = 0;
	this.index = options.index;
	this.blockWidth= 0;

	this.getSecondColor = function(index){
		switch(index){
			case 0:

			return '#990000';

			case 1:

			return '#00B800';

			case 2:

			return '#E6E600';

			case 3:

			return '#7400E0';


			case 4:

			return '#0000B3';


			case 5:

			return '#CC8500';


			case 6:

			return '#009CF0';
		}
	}

	this.getColor = function(index){
		switch(index){
			case 0:

			return '#FF0000';

			case 1:

			return '#00FF00';

			case 2:

			return '#FFFF00';

			case 3:

			return '#9B30FF';


			case 4:

			return '#0000FF';


			case 5:

			return '#FFA500';


			case 6:

			return '#3BB9FF';
		}
	}

	this.rotateBlock = function(){
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].rotate();
		};
	}

	this.checkRotateBlock = function(block,x,y){
		block.rotatePosition.x = block.position.x + x;
		block.rotatePosition.y = block.position.y + y;

		var _x = Math.floor(block.rotatePosition.x / block.width);
		var _y = Math.floor(block.rotatePosition.y / block.height);
		if(_x < 0 || _x > 9|| _y < 0 ||_y >17){
			this.mayRotate = false;
			return;
		}

		var tile = this.game.grid[_x][_y];
		if(tile.obj != null && tile.obj._shape !== this){
		 	this.mayRotate = false;
		}

		this.rotateBlocks.push(block);
	}

	this.removeBlocks = function(){
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].removeObject();
		};
		this.rotation += 1;
		if(this.rotation == this.maxRotation) this.rotation = 0;
	}


	this.rotateSelectedBlock = function(){
		this.rotateBlocks = [];
		switch(this.index){
			case 1:
				  this.maxRotation = 4;
				  if(this.rotation == 0){
				  	this.checkRotateBlock(this.block1,0,0);
				  	this.checkRotateBlock(this.block2,BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block3,BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH,BLOCK_WIDTH);

				  }
				  else if(this.rotation == 1){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,0,0);
				  	this.checkRotateBlock(this.block3,0,0);
				  	this.checkRotateBlock(this.block4,0,0);
				  }
				  else if(this.rotation == 2){
				  	this.checkRotateBlock(this.block1,BLOCK_WIDTH,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block3,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block4,0,0);
				  }
				  else if(this.rotation == 3){
				  	this.checkRotateBlock(this.block1,0,0);
				  	this.checkRotateBlock(this.block2,0,0);
				  	this.checkRotateBlock(this.block3,0,0);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH,-BLOCK_WIDTH);
				  }
			break;

			case 2:

				  this.maxRotation = 2;
				  if(this.rotation == 0){
				  	this.checkRotateBlock(this.block1,BLOCK_WIDTH,-BLOCK_WIDTH*2);
				  	this.checkRotateBlock(this.block2,0,0);
				  	this.checkRotateBlock(this.block3,-BLOCK_WIDTH,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH*2,BLOCK_WIDTH);

				  }
				  else if(this.rotation == 1){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH,BLOCK_WIDTH*2);
				  	this.checkRotateBlock(this.block2,0,0);
				  	this.checkRotateBlock(this.block3,BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH*2,-BLOCK_WIDTH);				  	
				  }
			break;

			case 3:
				  this.maxRotation = 4;
				  if(this.rotation == 0){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,0,0);
				  	this.checkRotateBlock(this.block3,BLOCK_WIDTH,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH*2,0);
				  }
				  else if(this.rotation == 1){
				  	this.checkRotateBlock(this.block1,0,0);
				  	this.checkRotateBlock(this.block2,0,0);
				  	this.checkRotateBlock(this.block3,-BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH,BLOCK_WIDTH);
				  }
				  else if(this.rotation == 2){
				  	this.checkRotateBlock(this.block1,BLOCK_WIDTH*2,0);
				  	this.checkRotateBlock(this.block2,-BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block3,0,0);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH,-BLOCK_WIDTH);
				  }
				  else if(this.rotation == 3){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,BLOCK_WIDTH,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block3,0,0);
				  	this.checkRotateBlock(this.block4,0,0);
				  }
			break;

			case 4:
				  this.maxRotation = 2;
				  if(this.rotation == 0){
				  	this.checkRotateBlock(this.block1,BLOCK_WIDTH*2,0);
				  	this.checkRotateBlock(this.block2,0,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block3,BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH,BLOCK_WIDTH);
				  }
				  else if(this.rotation == 1){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH*2,0);
				  	this.checkRotateBlock(this.block2,0,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block3,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH,-BLOCK_WIDTH);
				  }
			break;

			case 5:
				  this.maxRotation = 2;
				  if(this.rotation == 0){
				  	this.checkRotateBlock(this.block1,0,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block3,BLOCK_WIDTH*2,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH,0);

				  }
				  else if(this.rotation == 1){
				  	this.checkRotateBlock(this.block1,0,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block3,-BLOCK_WIDTH*2,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH,0);
				  }				  
			break;

			case 6:
				  this.maxRotation = 4;
				  if(this.rotation == 0){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block2,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block3,0,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH*2,-BLOCK_WIDTH);
				  }
				  else if(this.rotation == 1){
				  	this.checkRotateBlock(this.block1,0,0);
				  	this.checkRotateBlock(this.block2,BLOCK_WIDTH,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block3,-BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH*2,BLOCK_WIDTH);
				  }
				  else if(this.rotation == 2){
				  	this.checkRotateBlock(this.block1,-BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,-BLOCK_WIDTH,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block3,BLOCK_WIDTH, 0);
				  	this.checkRotateBlock(this.block4,BLOCK_WIDTH,0);
				  }
				  else if(this.rotation == 3){
				  	this.checkRotateBlock(this.block1,BLOCK_WIDTH*2,-BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block2,BLOCK_WIDTH,0);
				  	this.checkRotateBlock(this.block3,0,BLOCK_WIDTH);
				  	this.checkRotateBlock(this.block4,-BLOCK_WIDTH,0);
				  }
			break;
		}

		if(this.mayRotate && this.index != 0 && this.mayMove){
			this.removeBlocks();
			this.rotateBlock();

		}
		this.mayRotate = true;

	}


	this.init = function(){
		var _color = this.getColor(this.index);
		var _color2 = this.getSecondColor(this.index);

		switch(this.index){

			case 0:
				this.block1 = new Block(BLOCK_WIDTH*4,0,this,_color,_color2);
				this.block2 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*5,0,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*5,BLOCK_WIDTH,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 2;
			break;

			case 1:
				this.block1 = new Block(BLOCK_WIDTH*4,0,this,_color,_color2);
				this.block2 = new Block(BLOCK_WIDTH*3,BLOCK_WIDTH,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*5,BLOCK_WIDTH,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 3;
			break;

			case 2:
				this.block1 = new Block(BLOCK_WIDTH*3,0,this,_color,_color2);
				this.block2 = new Block(BLOCK_WIDTH*4,0,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*5,0,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*6,0,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 4;
			break;

			case 3:
				this.block1 = new Block(BLOCK_WIDTH*4,0,this,_color,_color2, this.isDisplay);
				this.block2 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH*2,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*5,BLOCK_WIDTH*2,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 2;
			break;

			case 4:
				this.block1 = new Block(BLOCK_WIDTH*3,0,this,_color,_color2);
				this.block2 = new Block(BLOCK_WIDTH*4,0,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*5,BLOCK_WIDTH,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 3;
			break;

			case 5:
				this.block1 = new Block(BLOCK_WIDTH*4,0,this,_color,_color2);
				this.block2 = new Block(BLOCK_WIDTH*5,0,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*3,BLOCK_WIDTH,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 3;
			break;

			case 6:
				this.block1 = new Block(BLOCK_WIDTH*5,0,this,_color,_color2);
				this.block2 = new Block(BLOCK_WIDTH*5,BLOCK_WIDTH,this,_color,_color2);
				this.block3 = new Block(BLOCK_WIDTH*5,BLOCK_WIDTH*2,this,_color,_color2);
				this.block4 = new Block(BLOCK_WIDTH*4,BLOCK_WIDTH*2,this,_color,_color2);
				this.blocks.push(this.block1,this.block2,this.block3,this.block4);//,this.block2,this.block3,this.block4)
				this.blockWidth = 2;
			break;
		}
		 totalBlocks.push(this.block1,this.block2,this.block3,this.block4);
	}

	this.update = function(){
		this.move();
	}

	this.moveRight = function(){
		var bool = true;

		for (var i = 0; i < this.blocks.length; i++){
         	bool = this.blocks[i].checkRight();    
         	if(!bool)break;     
		};

		if(bool){
			for (var l = 0; l < this.blocks.length; l++) {
				 this.blocks[l].removeObject();
			};

			for (var z = 0; z < this.blocks.length; z++){
         		  this.blocks[z].position.x +=BLOCK_WIDTH;
         		  this.blocks[z].rePosition();
			};
		}
	}

	this.moveLeft = function(){
		var bool = true;

		for (var i = 0; i < this.blocks.length; i++){
         	bool = this.blocks[i].checkLeft();
         	if(!bool)break;    
		};

		if(bool){
			for (var l = 0; l < this.blocks.length; l++) {
				 this.blocks[l].removeObject();
			};

			for (var z = 0; z < this.blocks.length; z++){
         		  this.blocks[z].position.x -=BLOCK_WIDTH;
         		  this.blocks[z].rePosition();
			};
		}
	}

	this.checkLastIndexes = function(){

		for (var i = 0; i < this.blocks.length; i++){
             this.blocks[i].checkLastIndex();
		};

	}

	this.move = function(){
		if(!this.mayMove)return;

		for (var i = 0; i < this.blocks.length; i++){
             if(!this.blocks[i].checkMovement(this.game.grid)){

             	this.mayMove = false;
             	break;
             }
		};
		if(!this.mayMove)return;
		
		for (var z= 0; z < this.blocks.length; z++){
             this.blocks[z].removeObject(this.game.grid);
		};
		
		for (var l = 0; l < this.blocks.length; l++){
             this.blocks[l].position.y += BLOCK_WIDTH;
             this.blocks[l].rePosition(this.game.grid);
		};
	}

	this.init();
}