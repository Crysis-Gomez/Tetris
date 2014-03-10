var Emitter = function(){
	this.canvas  = $("#canvas")[0];
	
	this.ctx = this.canvas.getContext("2d");
	this.particles = [];

	this.emit = function(position,color,life,frequency,totalparticle){
		this.position = position;
		this.life = life;
		this.color = color;
		this.frequency = frequency;
		this.totalparticle = totalparticle;
		this.angleBetween = 360 / totalparticle;
		this.currentAngle = 0;
		this.velocity = new vector(0,0);
		
		for (var i = 1; i < totalparticle+1; i++) {
			this.currentAngle += this.angleBetween;
			this.velocity = this.velocity.fromAngle(this.currentAngle);
			this.velocity = this.velocity.multiply(5);
			var part = new Particle(this.position.clone(),this.velocity.clone(),this.color,this.ctx,this.life);
			this.particles.push(part);
		}
	}

	this.update = function(){
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
			if(this.particles[i].life <= 0){
			   this.particles[i] = null;
			   this.particles.splice(i,1);
			   --i;	
			}
		};
	}

	this.draw = function(){
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].draw();
		};
	}
}

var Particle = function(posi,vel,color,ctx,life){
	this.ctx = ctx;
	this.position = posi;
	this.velocity = vel;
	this.radius = Math.random()*4;
	this.life = life;
	this.color = color;


	this.draw = function(){
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = this.color;
      	this.ctx.fill();	
	}

	this.clearParticle = function(){
		//this.ctx.fillStyle = 'white'
		this.ctx.clearRect(this.position.x-this.radius,this.position.y-this.radius,this.radius*10,this.radius*10)
		//this.ctx.fillRect(this.position.x,this.position.y,this.radius,this.radius)
	}

	this.update = function(){
		this.clearParticle();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.life -= 1;
	} 
}