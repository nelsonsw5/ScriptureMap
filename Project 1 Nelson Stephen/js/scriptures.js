/*========================================================================
 * FILE:    scriptures.js
 * AUTHOR:  Stephen W. Liddle
 * DATE:    Winter 2023
 *
 * DESCRIPTION: Front-end JavaScript code for the Scriptures, Mapped.
 *              IS 542, Winter 2023, BYU.
 */
/*jslint
    browser, long
*/
/*global
    console, google, map, markerWithLabel
*/
/*property
    books, forEach, init, maxBookId, minBookId, onerror, onload, open, parse,
    push, response, send, status, location, hash, slice, split
*/

const Scriptures = (function () {
    "use strict";

    /*-------------------------------------------------------------------
     *                      CONSTANTS
     */
    const REQUEST_GET = "GET";
    const REQUEST_STATUS_OK = 200;
    const REQUEST_STATUS_ERROR = 400;
    const URL_BASE = "https://scriptures.byu.edu/";
    const URL_BOOKS = `${URL_BASE}mapscrip/model/books.php`;
    const URL_VOLUMES = `${URL_BASE}mapscrip/model/volumes.php`;

    /*-------------------------------------------------------------------
     *                      PRIVATE VARIABLES
     */
    let books;
    let volumes;

    /*-------------------------------------------------------------------
     *                      PRIVATE METHOD DECLARATIONS
     */
    let ajax;
    let cacheBooks;
    let init;
    let onHashChanged;

    /*-------------------------------------------------------------------
     *                      PRIVATE METHODS
     */
    ajax = function (url, successCallback, failureCallback, skipJsonParse) {
        let request = new XMLHttpRequest();

        request.open(REQUEST_GET, url, true);

        request.onload = function () {
            if (request.status >= REQUEST_STATUS_OK && request.status < REQUEST_STATUS_ERROR) {
                let data = (
                    skipJsonParse
                        ? request.response
                        : JSON.parse(request.response)
                );

                if (typeof successCallback === "function") {
                    successCallback(data);
                }
            } else {
                if (typeof failureCallback === "function") {
                    failureCallback(request);
                }
            }
        };

        request.onerror = failureCallback;
        request.send();
    };

    cacheBooks = function (callback) {
        volumes.forEach(function (volume) {
            let volumeBooks = [];
            let bookId = volume.minBookId;

            while (bookId <= volume.maxBookId) {
                volumeBooks.push(books[bookId]);
                bookId += 1;
            }

            volume.books = volumeBooks;
        });

        if (typeof callback === "function") {
            callback();
        }
    };

    /*-------------------------------------------------------------------
     *                      PUBLIC API
     */
    function displayVolumes() {
        let volumesList = "<ul>";

        volumes.forEach(function (volume) {
            volumesList += `<li><h3>${volume.fullName}</h3></li>`;
        });

        volumesList += "</ul>";

        document.getElementById("scriptures").innerHTML = volumesList;
    }

    init = function (callback) {
        let booksLoaded = false;
        let volumesLoaded = false;

        ajax(URL_BOOKS, function (data) {
            books = data;
            booksLoaded = true;

            if (volumesLoaded) {
                cacheBooks(callback);
            }
        });
        ajax(URL_VOLUMES, function (data) {
            volumes = data;
            volumesLoaded = true;

            if (booksLoaded) {
                cacheBooks(callback);
            }
        });
    };

    onHashChanged = function (event) {
        if (!window.location.hash || typeof window.location.hash !== "string") {
            navigateHome();
            return;
        }

        let components = window.location.hash.slice(1).split(":");

        if (components.length === 1) {
            // Navigate to volume
        }
        /*
        If we have one ID, it’s a volume, so navigate to that volume
        But if the volume ID is < 1 or > 5, it’s invalid, so navigate to “home”
        If we have two ID’s, it’s a volume and book, so navigate to that book’s list of chapters
        But if the volume or book ID is invalid, navigate “home”
        If the book doesn’t have chapters, navigate to its content directly
        If we have three ID’s, its volume, book, chapter, so navigate there if valid
        If invalid, navigate “home”
        */
    };

    return {
        displayVolumes,
        init,
        onHashChanged
    };

}());
