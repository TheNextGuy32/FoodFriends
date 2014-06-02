/*
 * resources.js
 *
 * @author  Freddy Garcia
 *
 * contains all of the resources used in Food Friends
 */
"use strict";

// namespace
var app = app || {};

app.resources = {
    images : new Array(), // contains all of the images that will be used in Food Friends
	
    /*
	 * Checks to see if the image exists in the array
	 *
	 * @param   {String} key    the key to look for
	 *
	 * @return  {Number} the index of the key (if found). Returns -1 if not found
	 */
	imageExists : function(key)
	{
	    // look for key in the images array
	    for(var i = 0; i < this.images.length; i++)
        {
		    // image exists
		    if(this.images[i].key === key)
			    return i;
        }
		
		// image doesn't exist
		return -1;
	},
	
    /*
	 * Adds the key/value pair to the images array
	 *
	 * @param   {String} key    the key to use for the image
	 * @param   {Image} value   the image to add to the array
	 *
	 * @return  If the image was successfully added to the images array
	 */
    addImage : function(key, value)
    {
        // key exists
        if(this.imageExists(key.toLowerCase()) != -1)
            return false;
			
        // key doesn't exist
		else
		{
		    this.images.push( {key: key.toLowerCase(), value: value} );
			return true;
		}
    },
	
	/*
	 * Returns the value of the image for the given key
	 *
	 * @param   {String} key    the key to search for
	 *
	 * @return  the value matching the key being searched. Returns undefined if not found
	 */
    getImage : function(key)
    {
	    var index;
		
		// check if key exists
		index = this.imageExists(key.toLowerCase());
		
		// key doesn't exist
		if(index === -1)
		    return undefined;
		
		// key exists
		else
		    return this.images[index].value;
    }
};