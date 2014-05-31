//machine.js
//Elvis Perez

"use strict"

var Machine = function(image, xPos, yPos, width, height)
{
	this.image = img;
	this.x = xPos;
	this.y = yPos;
	this.width = width;
	this.height = height;
};

Machine.prototype

Machine.prototype.drawMachine = function(ctx)
{
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};