var GUI = function(ctx,game){
	this.ctx = ctx;
	this.nextShape = null;
	this.game = game;
	var index =  Math.floor(Math.random()*7);
	this.nextShape = game.shapeFactory.createShape({color:'#FF0000',game:game,index:index,isDisplay:true});

	this.newBlock = function(){
		var index =  Math.floor(Math.random()*7);
		this.nextShape = game.shapeFactory.createShape({color:'#FF0000',game:game,index:index,isDisplay:true});
	}

	this.draw = function(){
		ctx.strokeStyle = 'black';
		ctx.lineWidth=2;
		ctx.strokeRect(400,0,200,720);
		for (var i = 0; i < this.nextShape.blocks.length; i++) {
			this.nextShape.blocks[i].draw(ctx);
		};
		this.drawText();
	}

	this.drawText = function(){
		ctx.font = "bold 16px Arial";
		ctx.fillStyle = '#000000';
  		ctx.fillText("Next shape", 460, 250);
  		ctx.fillText("score:"+0, 460, 650);
	}
	
};

