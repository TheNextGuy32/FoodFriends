//vector.js
//Elvis Pérez
"use strict"

//A 2-dimensional vector
var Vector = function(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
};

//Adds another vector to the vector
Vector.prototype.add = function(vector)
{
	this.x += vector.x;
	this.y += vector.y;
};

//Returns the magnitude (length) of the vector
Vector.prototype.getMagnitude = function()
{
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

//Returns the angle of the vector in radians
Vector.prototype.getAngle = function()
{
	return Math.atan2(this.y, this.x);
};

//"Static" Function
//Creates and returns a vector of given angle and magnitude
Vector.fromAngle = function(angle, magnitude)
{
	return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};