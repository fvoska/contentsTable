/* Contents Table
 * version 1.0
 *
 * Contents Table is a JavaScript object that creates a table of contents for your web-page.
 * It is ideally used on web-pages that have a lot of text which is separated into chapters.
 *
 * Created by Filip Voska (filip.voska@gmail.com).
 * contentsTable is released under The MIT License (MIT)
 */

function contentsTableCreator(levels, table, selectors)
{
	// If no selectors are given explicitly, loop through all elements, check classes and if matching add their tags to selectors.
	if (!selectors)
	{	
		var allTags = $("*");
		var matchingTags = [];
		var uniqueTags = [];
		for (var index = 0; index < allTags.length; index++)
		{
			// Tags can have multiple classes and we must check if any one of them is in our levels classes.
			var classes = String(allTags[index].className).split(/\s+/);
			var match = false;
			for (var j = 0; j < classes.length; j++)
			{
				if ($.inArray(classes[j], levels) != -1)
				{
					match = true;
					// Mulitple levels classes shouldn't be assigned to same tag. It they are, the first one is used.
					break;
				}
			}
			if (match)
			{
				// If we find at least one pair of matching classes, push the tag to matching tags list.
				matchingTags.push(allTags[index].tagName.toLowerCase());
			}
		}
		
		// Remove duplicate tags.
		$.each(matchingTags, function(i, tag){
			if($.inArray(tag, uniqueTags) === -1) uniqueTags.push(tag);
		});
		selectors = String(uniqueTags);
	}
	
	// Continue only if any selectors were found or explicitly given when creating contentsTable object.
	if (selectors)
	{
		// Now that we have desired selectors, get the elements that we'll add Anchors to.
		var anchors = $(selectors);
		for (var index = 0; index < anchors.length; index++)
		{
			// Same story with multiple classes that we had when scanning for selectors.
			var classes = String(anchors[index].className).split(/\s+/);
			var match = false;
			var matchIndex = -1;
			for (var j = 0; j < classes.length; j++)
			{
				if ((matchIndex = $.inArray(classes[j], levels)) != -1)
				{
					match = true;
					break;
				}
			}
			
			if (match)
			{
				// Now we finally know everything, we just need to place Anchors near out levels and link to them from Table.
				var title = anchors[index].innerHTML;
				// Create unique stub for ID.
				var stub = String(anchors[index].innerHTML).replace(/ /g,'') + "-" + String(index);
				anchors[index].innerHTML = "<a id='" + stub + "'></a>" + title;
				$("." + table).html($("." + table).html() + "<a class='" + levels[matchIndex] + "-table" + "' " + "href='#" + stub + "'>" + title + "</a></br>");
			}
		}
	}
}