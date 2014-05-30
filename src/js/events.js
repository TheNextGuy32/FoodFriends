"use strict";

// namespace
var app = app || {};

// when the elements on the window have finished loading
//window.addEventListener('load', app.main.init);
window.addEventListener('resize', app.main.resize);
window.addEventListener('load', function(){
    console.log("finished loading!");
	app.main.init();
});