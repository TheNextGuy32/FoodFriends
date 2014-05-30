//emitter.js
//Dependencies: particle.js, vector.js?
//Elvis Pérez

"use strict"

//position, color, speed, maxAge, [shape]
var Emitter = function(pos, minVel, maxVel, minAccel, maxAccel, minLife, maxLife, minSize, maxSize, colorPalette, colorPaletteRange, toFade)
{
	this.debug = true;

	this.particles = [];

	this.position = pos; //Position of the emitter
	
	//Velocity range for particles
	this.minVelocity = minVel;
	this.maxVelocity = maxVel;
	
	//Acceleration range for particles
	this.minAcceleration = minAccel;
	this.maxAcceleration = maxAccel;
	
	//Lifetime range for particles
	this.minAge = minLife;
	this.maxAge = maxLife;
	
	//Size range for particles
	this.minRadius = minSize;
	this.maxRadius = maxSize;
	
	//Central color and color range of particles
	this.color = hex2rgba(nameToHex(colorPalette));
	this.colorRange = colorPaletteRange;
	
	//Sets if particles fade linearly over time
	this.fade = toFade;
};

Emitter.prototype.emit = function()
{
	var arc = Math.PI * 2 * Math.random();
	var velocity = (this.maxVelocity - this.minVelocity) * Math.random() + this.minVelocity;
	var acceleration = (this.maxAcceleration - this.minAcceleration) * Math.random() + this.minAcceleration;
	var age = (this.maxAge - this.minAge) * Math.random() + this.minAge;
	var radius = (this.maxRadius - this.minRadius) * Math.random() + this.minRadius;
	
	///Begin Disgusting
	var arr = this.color.split(",");
	var differential = Math.random() * (this.colorRange * 2 + 1) - this.colorRange; 
	
	arr[0] = arr[0].substr(5); //Get rid of "rgba("
	
	arr[0] = Math.floor(clamp(parseFloat(arr[0]) + differential, 0, 255));
	differential = Math.random() * (this.colorRange * 2 + 1) - this.colorRange; 
	
	arr[1] = Math.floor(clamp(parseFloat(arr[1]) + differential, 0, 255));
	differential = Math.random() * (this.colorRange * 2 + 1) - this.colorRange; 
	
	arr[2] = Math.floor(clamp(parseFloat(arr[2]) + differential, 0, 255));
	differential = Math.random() * (this.colorRange * 2 + 1) - this.colorRange; 
	
	var color = "rgba(" + arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3];
	///End Disgusting
	
	this.particles.push(new Particle(new Vector(this.position.x, this.position.y), Vector.fromAngle(arc, velocity), Vector.fromAngle(arc, acceleration), age, radius, color, this.fade));
};
//Update emitter and its particles
Emitter.prototype.update = function()
{
	//Update particles
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].update();
	}
		
	//Remove inactive particles
	this.particles = this.particles.filter(function(particle){
			return particle.active;
		});
		
	//Emit new particle
	///Do I really want to emit a particle every frame?
	this.emit();
};

//Draw emitter's particles
Emitter.prototype.draw = function(ctx)
{
	ctx.save();

	if(this.debug)
	{
		//Draw Emitter
		ctx.strokeStyle = "gray";
		ctx.strokeRect(this.position.x - 10, this.position.y - 10, 20, 20);
	}
	
	//Draw Particles
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].draw(ctx);
	}
	
	ctx.restore();
};