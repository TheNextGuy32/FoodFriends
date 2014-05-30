//particle.js
//Dependencies: vector.js
//Elvis Pérez
"use strict"

var Particle = function(pos, vel, accel, lifetime, size, colour, toFade)
{
	this.position = pos;
	this.velocity = vel;
	this.acceleration = accel;
	
	this.age = lifetime;
	this.radius = size;
	this.color = colour;
	
	this.lifespan = lifetime;
	this.fade = toFade;
	this.active = true;
};

//Moves the particle based on its movement vectors
Particle.prototype.move = function()
{
	//Euler Integration
	
	//Velocity += Acceleration
	this.velocity.add(this.acceleration);
	
	//Position += Velocity
	this.position.add(this.velocity);
};

//Reduce the age of the particle
Particle.prototype.decay = function()
{
	///May not want to make lifetime framebased
	this.age--; //Reduce age
	
	//Set particle inactive if exceeds lifetime
	if(this.age <= 0)
	{
		this.age = 0; //Prevent alpha value based on age from becoming negative
		this.active = false;
	}
};

//Update the properties of the particle
Particle.prototype.update = function()
{
	if(this.active)
	{
		this.move();
		this.decay();
		
		if(this.fade)
		{
			var arr = this.color.split(",");
			this.color = arr[0] + "," + arr[1] + ", " + arr[2] + "," + this.age / this.lifespan + ")";
		}
	}
};

Particle.prototype.draw = function(ctx)
{
	ctx.save();

	ctx.fillStyle = this.color;
	
	ctx.beginPath();
	ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
	ctx.fill();
	
	ctx.restore();
};