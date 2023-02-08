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
    let navigateHome;

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
    navigateHome = function (volumeId) {
        let volumesList = "<ul>";

        volumes.forEach(function (volume) {
            volumesList += `<li><h3>${volume.fullName}</h3></li>`;
        });

        volumesList += "</ul>";

        document.getElementById("scriptures").innerHTML = volumesList;

        // NEEDS WORKS
    }

    /*-------------------------------------------------------------------
     *                      PUBLIC API
     */

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
        let ids = [];
        if (location.hash !== "" && location.hash.length > 1) {
            ids = location.hash.slice(1).split(":");
        }

        if (ids.length <= 0) {
            navigateHome();
            return;
        } else if (ids.length === 1){
            const volumeId = Number(ids[0]);

            console.log(volume.map((volume) => volume.id));
            if (volumes.map((volume) => volume.id).includes(volumeId)) {
                navigateHome(volumeId);
            }
            else{
                navigateHome();
            }
        } else {
            const bookID = Number(ids[1]);

            if (books[bookId] === undefined){
                navigateHome();
            } else {
                if (ids.length === 2){
                    navigateBook(bookId);
                } else {
                    const chapter = Number(ids[2]);
                    if (bookChapterValid(bookId, chapter)){
                        navigateChapter(bookId, chapter);
                    } else {
                        navigateHome();
                    }
                }
            }
        }
    };

    return {
        init,
        onHashChanged
    };

}());
