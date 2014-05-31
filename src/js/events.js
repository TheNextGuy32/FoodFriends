"use strict";

// namespace
var app = app || {};

// when the elements on the window have finished loading
//window.addEventListener('load', app.main.init);
window.addEventListener('resize', app.main.resize);
window.addEventListener('click', onClick);
window.addEventListener('load', function () {
    console.log("finished loading!");
    app.main.init();
});

/*function onClick(e) {
    var rightclick;
	e.preventDefault();
    if (e.which) rightclick = (e.which == 3);
    else if (e.button) rightclick = (e.button == 2);
	if(rightclick){
		app.main.switchLane(2);
	}else
		app.main.switchLane(1);
};*/
/*
 * If you click on the left side of the Game, the left 2 Lanes Switch
 * If you click on the right side of the Game, the right 2 Lanes Switch
 */
function onClick(e){
	e.preventDefault();
	
	// proper x/y value
	var x = (e.clientX - app.offset.left) / app.dimensions.scale;
	var y = (e.clientY - app.offset.top) / app.dimensions.scale;

	if(x < app.main.DEFAULT_WIDTH/2) app.main.switchLane(1);
	else app.main.switchLane(2);
};

