//foodparticle.js
//Elvis Perez

"use strict"

var FoodParticle = function(image, x, y, velocity, size)
{
	this.image = image;
	this.x = x;
	this.y = y;
	
	this.velocity = velocity;
	this.size = size;
	
	this.active = true;
};

FoodParticle.prototype.move = function(dt)
{
	this.y -= this.velocity;
	
	if(this.y - this.size / 2 > app.dimensions.height)
	{
		this.active = false;
	}
};

FoodParticle.prototype.update = function(dt)
{
	if(this.active)
	{
		this.move(dt);
	}
}

FoodParticle.prototype.draw = function(ctx)
{
	ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, size, size);
}