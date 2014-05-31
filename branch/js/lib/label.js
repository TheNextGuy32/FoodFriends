/*
 * label.js
 *
 * @author Freddy Garcia
 *
 * -- Part of the Core2D kit --
 * A representation of a label
 */
 
"use strict";

var Core2D = Core2D || {};

Core2D.Label = (function()
{
	// private  ----------------------------------------

	// public	----------------------------------------
	
	/*
	 * Creates a label with the given properties
	 *
	 * @param	{Object} properties     the properties that the label will have
	 *
	 * @return	none
	 */
	var Label = function(properties)
	{
		// prevent undefined errors
		var properties    = properties        || {};
		properties.pos    = properties.pos    || {};
		properties.color  = properties.color  || {};
		properties.shadow = properties.shadow || {};
		
		// Settings ---------------------------------------------------------
		this.string    = properties.string    === undefined ? "Default"
		    : properties.string;
		this.size      = properties.size      === undefined ? 12
		    : properties.size;
		this.font      = properties.font      === undefined ? "Helvetica"
		    : properties.font;
		this.alignment = properties.alignment === undefined ? "left"
		    : properties.alignment;
		this.baseline  = properties.baseline  === undefined ? "middle"
		    : properties.baseline;
		
		this.pos    = {
			x : properties.pos.x === undefined ? window.innerWidth / 2
			    : properties.pos.x,
			y : properties.pos.y === undefined ? window.innerHeight / 2
			    : properties.pos.y
		};
		
		this.color  = {
			fill   : properties.color.fill   === undefined ? "#DED1B7"
			    : properties.color.fill,
			stroke : properties.color.stroke === undefined ? "#DED1B7"
			    : properties.color.stroke
		};
		
		// additional shadow properties
		if(properties.shadow)
		{
			this.shadow = true;
		
			this.shadowColor = properties.shadow.color === undefined ? "#561426"
			    : properties.shadow.color;
			
			this.shadowOffset = {
				x : properties.shadow.offsetX === undefined ? 5
				    : properties.shadow.offsetX,
				y : properties.shadow.offsetY === undefined ? 5
				    : properties.shadow.offsetY
			};
			
			this.shadowBlur = properties.shadow.blur === undefined ? 5
			    : properties.shadow.blur;
		}
	};
	
	/*
	 * Changes the text of the label to the given parameter
	 *
	 * @param	newText	the new text for the label
	 *
	 * @return	none
	 */
	Label.prototype.Text = function(newText)
	{
		this.text = newText;
	};
	
	/*
	 * Updates the label
	 *
	 * @return none
	 */
	Label.prototype.update = function()
	{
		// empty for labels
	};
	
	/*
	 * Draws the label on the given drawing context
	 *
	 * @param	ctx		the drawing context to draw to
	 *
	 * @return	none
	 */
	Label.prototype.render = function(ctx)
	{
		// restore point
		ctx.save();
		
			// settings
			ctx.font			= this.size + "px " + this.font;
			ctx.textBaseline 	= this.baseline;
			ctx.textAlign 		= this.alignment;
			ctx.fillStyle 		= this.color.fill;
			ctx.strokeStyle		= this.color.stroke;
			
			// shadow settings
			if(this.shadow)
			{
				ctx.shadowColor 	= this.shadowColor;
				ctx.shadowOffsetX	= this.shadowOffsetX;
				ctx.shadowOffsetY	= this.shadowOffsetY;
				ctx.shadowBlur		= this.shadowBlur;
			}
		
			// draw
			ctx.fillText(this.text, this.pos.x, this.pos.y);
			//ctx.
			
		// revert changes
		ctx.restore();
	};
	
	// public API
	return Label;
})();