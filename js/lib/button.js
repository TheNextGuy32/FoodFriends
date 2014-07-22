/*
 * button.js
 * @author Freddy Garcia
 *
 * -- Part of the Core2D kit --
 * A representation of a button. 
 */
 
"use strict";
 
// namespace
var Core2D = Core2D || {};

Core2D.BUTTON_STATE = {
	MAIN : 0,
	HOVER: 1,
	CLICK: 2
}; // Different states available to the button
 
Core2D.Button = (function()
{
	/*
	 * Creates a button based on the given properties
	 * TODO: pass in a label as part of the button
	 *
	 * @param   {Object} properties     the properties that will be given to the button
	 *
	 * @return  none
	 */
	var Button = function(properties)
	{
		this.modify(properties);
		
		this.currentState  = Core2D.BUTTON_STATE.MAIN;
		this.previousState = Core2D.BUTTON_STATE.MAIN;
	};
	
	/*
	 * Changes the state of the button
	 *
	 * @param   the state to change into
	 *
	 * @return  none
	 */
	Button.prototype.changeState = function(newState)
	{
	    this.previousState = this.currentState;
		this.currentState = newState;
		
	    // transition action to new state
	    switch(this.currentState)
	    {
	    case Core2D.BUTTON_STATE.CLICK:
		    this.callbacks.onClick();
			break;
			
		case Core2D.BUTTON_STATE.HOVER:
		    this.callbacks.onHover();
			break;
			
		default:
		    this.callbacks.onMain();
			break;
	    };
	};
	
	Button.prototype.getState = function()
	{
		return this.currentState;
	};
	
	/*
	 * Updates the button
	 *
	 * @return	none
	 */
	Button.prototype.update = function()
	{
	};
	
	/*
	 * Modifies the button based on properties passed in
	 *
	 * @return  none
	 */
	Button.prototype.modify = function(properties)
	{
		// covering bases
		var properties       = properties           || {};
		properties.center    = properties.center    || {};
		properties.size      = properties.size      || {};
		properties.color     = properties.color     || {};
		properties.hover     = properties.hover     || {};
		properties.text      = properties.text      || {};
		properties.callbacks = properties.callbacks || {};
	
		this.center = {
		    x : properties.center.x === undefined ? window.innerWidth / 2 
		        : properties.center.x,
		    y : properties.center.y === undefined ? window.innerHeight / 2
		        : properties.center.y
		};
		
		this.size	= {
		    width  : properties.size.width  === undefined ? 30
			    : properties.size.width,
			height : properties.size.height === undefined ? 10
			    : properties.size.height,
			stroke : properties.size.stroke === undefined ? 2
			    : properties.size.stroke
		};
		
		// image or color
		if(properties.image)
			this.image = properties.image; // requires image to already be loaded!
		
		else
		{
			this.color  = {
				fill   : properties.color.fill   === undefined ? "#4C6B88"
					: properties.color.fill,
				stroke : properties.color.stroke === undefined ? "#4C6B88"
					: properties.color.stroke
			};
			
			this.hover  = {
				fill   : properties.hover.fill   === undefined ? this.color.fill
					: properties.hover.fill,
				stroke : properties.hover.stroke === undefined ? this.color.stroke
					: properties.hover.stroke
			};
		}
		
		this.text   = {
			string    : properties.text.string === undefined ? ""
			    : properties.text.string,
			color     : properties.text.color  === undefined ? "#EFECDE"
			    : properties.text.color,
			size      : properties.text.size   === undefined ? 12
			    : properties.text.size,
			font      : properties.text.font   === undefined ? "Helvetica"
			    : properties.text.font,
			alignment : properties.text.align  === undefined ? "center"
			    : properties.text.align
		};
		
		this.callbacks = {
			onHover  : properties.callbacks.hover === undefined ? function(){console.log("default hover");}
			    : properties.callbacks.hover,
			onClick  : properties.callbacks.click === undefined ? function(){console.log("default click");}
			    : properties.callbacks.click,
			onMain   : properties.callbacks.main  === undefined ? function(){console.log("default main");}
			    : properties.callbacks.main
		};
	};
	
	/*
	 * Draw the button in the given drawing context
	 *
	 * @param	ctx     the context that the button is being drawn to
	 */
	Button.prototype.render = function(ctx)
	{
		// restore point - pre rectangle
		ctx.save();
			ctx.lineWidth = this.size.stroke;
			
			// colors based on state
			switch(this.currentState)
			{
			case Core2D.BUTTON_STATE.MAIN:
				if(this.image)
				{
				    // no need to set styles
				}
				
				else
				{
				    ctx.fillStyle   = this.color.fill;
				    ctx.strokeStyle = this.color.stroke;
				}
				
				break;
				
			case Core2D.BUTTON_STATE.HOVER:
				if(this.image)
				{
				    // no need to set styles
				}
				
				else
				{
				    ctx.fillStyle   = this.color.fill;
				    ctx.StrokeStyle = this.color.stroke;
				}
				
				break;
				
			default:
				if(this.image)
				{
				    // no need to set styles
				}
				
				else
				{
				    ctx.fillStyle   = this.color.fill;
				    ctx.strokeStyle = this.color.stroke;
				}
				
				break;
			}
			
			// image drawing
			if(this.image)
			{
			    ctx.drawImage(this.image, this.center.x - this.size.width/2,
				    this.center.y - this.size.height/2, this.size.width, this.size.height);
			}
			
			// standard color / text drawing
			else
			{
				// background
			    ctx.fillRect(this.center.x - this.size.width/2, 
			        this.center.y - this.size.height/2, this.size.width, this.size.height);
			    ctx.strokeRect(this.center.x - this.size.width/2,
			        this.center.y - this.size.height/2, this.size.width, this.size.height);
					
				// text settings
			    ctx.font      = this.text.size + "px " + this.text.font;
			    ctx.fillStyle = this.text.color;
			    ctx.textAlign = this.text.alignment;
			
			    // draw text centered on the button
			    // TODO: Base drawing on size of text relative to size of button!
			    ctx.fillText(this.text.string, this.center.x, this.center.y + this.size.height/8);
			}
		
		// revert changes - post text
		ctx.restore();
	};
	
	return Button;
})();