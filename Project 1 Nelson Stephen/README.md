# README.md for Project 1 for IS 542

- [x] Implement features for the user to see a list of volumes and navigate between volumes/books/chapter lists/chapter contents in the scriptures.

- [x] Include the ability to navigate from one chapter to the next (or previous).

- [ ] Check the edge cases when you go back and forth on chapters that don’t exist.

- [x] Register for an API key with Google Maps.  Start here: https://developers.google.com/maps/documentation/javascript/ and click on the "Get a Key" button.  Follow the instructions so you'll have access to the Google Maps JavaScript API.

- [x] Integrate this API into your project and start by displaying the map centered on Jerusalem at an appropriate zoom level that displays the lands of the Bible.

- [ ] When the user displays a chapter of the scriptures, clear any markers that may be present on the map.

- [ ] When the user displays a chapter, if there are geocoded places in the displayed chapter, add markers to the map for each such place. You'll know there is a geocoded place because it will be hyperlinked with an "<a></a>" tag that has an "onclick" attribute that calls "showLocation".  You can write a CSS selector query expression to retrieve all such nodes from the DOM tree.  

- [ ] When the user displays a chapter, if there is only one marker, center on it and zoom to an appropriate distance.  If there are multiple markers, zoom to a rectangle that displays all the markers at once.

- [ ] The marker can have the standard Google look and feel (an upside-down red teardrop shape), or you can customize the look of your marker.  But in addition to the pin, please add the geocoded place-name to the map.  Display on the map the name that is second parameter to the "showLocation" function in the "<a></a>" tag.  If you dig, you can find some code online that implements a custom marker that includes a label.  You're welcome to use somebody else's custom marker code for this task, but you need to integrate it into your own project yourself and document where you got that code.  (To avoid plagiarism, always document any code sources you use in any project.)

- [ ] Implement the "showLocation" JavaScript function so that when the user clicks on a geocoded place-name hyperlink, the map centers on the given marker and zooms to an appropriate level.  The 3rd and 4th parameters to "showLocation()" are latitude/longitude, and the 9th parameter is a desired view altitude.