//machine.js
//Elvis Perez

"use strict"

var Machine = function(machineImage, conveyorImage, xPos, yPos, width, height)
{
	this.machineImage = machineImage;
	this.conveyorImage = conveyorImage;
	this.x = xPos;
	this.y = yPos;
	this.width = width;
	this.height = height;
};

Machine.prototype.drawBottom = function(ctx)
{
	ctx.save();
	
	ctx.fillStyle = "rgb(233, 234, 235)";
	ctx.fillRect(this.x - 26, this.y + 18, 53, 13);
	
	ctx.drawImage(this.conveyorImage, this.x - this.width / 2, this.y + this.height / 2 - 2, this.width, 355);
	
	ctx.restore();
}

Machine.prototype.draw = function(ctx)
{
	
	ctx.save();
	
	ctx.drawImage(this.machineImage, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

	ctx.restore();
};