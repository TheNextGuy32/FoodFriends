//machine.js
//Elvis Perez

"use strict"

var Machine = function(image, xPos, yPos, width, height)
{
	this.image = image;
	this.x = xPos;
	this.y = yPos;
	this.width = width;
	this.height = height;
};

Machine.prototype.drawMachineFloor = function(ctx)
{
	ctx.save();
	
	///ctx.fillStyle = ???
	///ctx.fillRect(xPos + offset, yPos + offset, ??, ??);
	
	ctx.restore();
}

Machine.prototype.drawMachine = function(ctx)
{
	//ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	ctx.save();
	
	ctx.fillStyle = "#888888";
	ctx.fillRect(this.x, this.y, this.width, this.height);

	ctx.restore();
};