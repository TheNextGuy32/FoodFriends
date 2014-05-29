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
	
	setScore : function(score)
	{
		this.score=score;

	}
};