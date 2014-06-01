//foodemitter.js
//Elvis Perez

"use strict"

var FoodEmitter = function(images, minVelocity, maxVelocity, minSize, maxSize)
{
	this.particles = [];
	
	this.images = images;
	
	this.minVelocity = minVelocity;
	this.maxVelocity = maxVelocity;
	this.minSize = minSize;
	this.maxSize = maxSize;
};

FoodEmitter.prototype.emit = function()
{
	var velocity = (this.maxVelocity - this.minVelocity) * Math.random() + this.minVelocity;
	var size = (this.maxSize - this.minSize) * Math.random() + this.minSize;
	
	this.x = app.dimensions.width * Math.random();
	this.y = -this.size / 2;
	
	this.image = this.images[this.images.length * Math.random()];
	
	this.particles.push(new Partcile(image, x, y, velocity, size));
};

FoodEmitter.prototype.update = function(dt)
{
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].update(dt);
	}
	
	this.particles = this.particles.filter(function(particle){
				return particle.active;
			});
			
	this.emit();
}

FoodEmitter.prototype.draw = function(ctx)
{
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].draw(ctx);
	}
}