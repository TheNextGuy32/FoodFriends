"use strict";

var player = {
	score : undefined,
	timer : undefined,
	name : undefined,
	
	
	init : function(name, timer)
	{
		this.name = name;
		this.timer = timer;
	}
	
	setName : function(name)
	{
	this.name = name;
	}
	
	getName : function()
	{
	return this.name;
	}
	
	setScore : function(score)
	{
		this.score=score;
	}
	getScore : function()
	{
		return this.score;
	}
};