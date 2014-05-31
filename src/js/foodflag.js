//foodflag.js
//Elvis Perez

"use strict"

var FoodFlag = function(machine, image, width, height)
{
	var offset = 0;

	this.x = machine.x + offset;
	this.y = machine.y + offset;
	
	this.image = image;
	
	this.width = width;
	this.height = height;
};

FoodFlag.prototype.setFlag = function(country)
{
	//
};

FoodFlag.prototype.draw = function(ctx)
{
	if(this.image !== undefined)
	{
		ctx.drawImage(this.image, this.x, this.y, this.image.clientWidth, this.image.clientHeight);
	}
}