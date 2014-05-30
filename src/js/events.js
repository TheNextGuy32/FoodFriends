"use strict";

// namespace
var app = app || {};

// when the elements on the window have finished loading
//window.addEventListener('load', app.main.init);
window.addEventListener('resize', app.main.resize);
window.addEventListener('click', onClick);
window.addEventListener('load', function(){
    console.log("finished loading!");
	app.main.init();
});

function onClick(e) {
    var rightclick;
	e.preventDefault();
    if (e.which) rightclick = (e.which == 3);
    else if (e.button) rightclick = (e.button == 2);
	if(rightclick){
		app.main.switchLane(2);
	}else
		app.main.switchLane(1);
};