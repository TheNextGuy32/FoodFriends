"use strict";

var player = {
	score : undefined,
	timer : undefined,
	
	init : function(score, timer)
	{
		this.score = score;
		this.timer = timer;
		
		console.log("score: " + this.score);
		console.log("timer: " + this.timer);
	}
};