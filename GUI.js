var GUI = function(ctx,game){
	this.ctx = ctx;
	this.nextShape = null;
	this.game = game;
	var index =  Math.floor(Math.random()*7);
	this.nextShape = game.shapeFactory.createShape({color:'#FF0000',game:game,index:index,isDisplay:true});
	this.score = 0;

	this.newBlock = function(){
		var index =  Math.floor(Math.random()*7);
		this.nextShape = game.shapeFactory.createShape({color:'#FF0000',game:game,index:index,isDisplay:true});
	}

	this.draw = function(){
		this.ctx.strokeStyle = '#7400E0';
		this.ctx.lineWidth=4;
		this.ctx.strokeRect(500,0,300,720);
		for (var i = 0; i < this.nextShape.blocks.length; i++) {
			this.nextShape.blocks[i].draw(this.ctx);
		};
		this.drawText();
	}

	this.drawText = function(){
		ctx.font = "bold 16px Arial";
		ctx.fillStyle = '#000000';
  		ctx.fillText("Next shape", 600, 300);
  		ctx.fillText("score:"+this.score, 600, 650);
	}
	
};


