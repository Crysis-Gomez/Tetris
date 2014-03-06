var GUI = function(ctx,game){
	this.ctx = ctx;
	this.nextShape = null;
	this.game = game;
	this.score = 0;
	this.boxWidth  = 0;
	this.boxHeight = 0;
	this.offset = 4;
	this.index = Math.floor(Math.random()*7);

	this.newBlock = function(){
		this.index =  Math.floor(Math.random()*7);
		this.drawGrid();
	}

	this.getSecondColor = function(){
		switch(this.index){
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

	this.getColor = function(){
		switch(this.index){
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

	this.draw = function(){
		this.boxWidth = gridWidth * BLOCK_WIDTH - (BLOCK_WIDTH*this.offset);
		this.boxHeight = gridHeight*BLOCK_WIDTH;
		this.ctx.strokeStyle = '#FFFFFF';
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(gridWidth*BLOCK_WIDTH+8,0,this.boxWidth,this.boxHeight);
		this.drawText();
		this.drawGrid();
	}

	this.drawGrid = function(){
		this.ctx.clearRect(gridWidth*BLOCK_WIDTH,BLOCK_WIDTH*2,gridWidth*BLOCK_WIDTH,BLOCK_WIDTH*3);
		for (var i = 0; i < gridWidth-this.offset; i++) {
			for (var l = 0; l < 3; l++) {
				this.ctx.strokeStyle = 'white';
				var position = new vector((BLOCK_WIDTH*i)+(gridWidth*BLOCK_WIDTH+8),BLOCK_WIDTH*l+BLOCK_WIDTH*2)
				

				this.ctx.strokeRect(position.x,position.y,BLOCK_WIDTH,BLOCK_WIDTH);
				var sequence = this.getFillGrid(position);
				if(sequence.seq1[i] == "1" && l == 0)
				{
					this.drawBlock(position);
				}else if(sequence.seq2[i] == "1" && l == 1){this.drawBlock(position);
				}else if(sequence.seq3[i] == "1" && l == 2)this.drawBlock(position);
			};
		}
	}

	this.drawBlock = function(position){
		// this.ctx.lineWidth=1;
		this.ctx.fillStyle = this.getColor();
		this.ctx.fillRect(position.x,position.y,BLOCK_WIDTH,BLOCK_WIDTH);
		this.ctx.strokeStyle = 'white';
		this.ctx.strokeRect(position.x,position.y,BLOCK_WIDTH,BLOCK_WIDTH);
		this.ctx.fillStyle = this.getSecondColor();
		this.ctx.strokeRect(position.x+5,position.y+5,BLOCK_WIDTH-10,BLOCK_WIDTH-10);
		this.ctx.fillRect(position.x+5,position.y+5,BLOCK_WIDTH-10,BLOCK_WIDTH-10);
	}

	this.getFillGrid = function(){
		switch(this.index){
			case 0:return {seq1:"000000",seq2:"001100",seq3:"001100"};
			case 1:return {seq1:"000100",seq2:"001100",seq3:"000100"};
			case 2:return {seq1:"000000",seq2:"000000",seq3:"011110"};
			case 3:return {seq1:"001000",seq2:"001000",seq3:"001100"};
			case 4:return {seq1:"000000",seq2:"001100",seq3:"000110"};
			case 5:return {seq1:"000000",seq2:"000110",seq3:"001100"};
			case 6:return {seq1:"000100",seq2:"000100",seq3:"001100"};
		}
	}

	this.updateScore = function(score){

	}

	this.drawText = function(){
		var _w = this.boxWidth *0.5;
		var _h = gridHeight*BLOCK_WIDTH/5;
		ctx.font = "bold 16px Arial";
		ctx.fillStyle = '#FFFFFF';
		var textWidth = this.ctx.measureText("Next shape").width*0.5;
  		ctx.fillText("Next shape",gridWidth*BLOCK_WIDTH+8+_w-textWidth, _h*2);
  		textWidth = this.ctx.measureText("score:"+this.score).width*0.5;
  		
  		ctx.clearRect(gridWidth*BLOCK_WIDTH+8+_w-textWidth,_h*3-20,textWidth*2,20);
  		ctx.fillText("score:"+this.score,gridWidth*BLOCK_WIDTH+8+_w-textWidth,_h*3);
	}
};


