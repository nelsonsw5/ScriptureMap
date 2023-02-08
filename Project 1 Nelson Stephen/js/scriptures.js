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
    const URL_SCRIPTURES = `${URL_BASE}mapscrip/mapgetscrip.php`;
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
    let bookChapterValid;
    let booksGrid;
    let booksGridContent
    let bookTitle;
    let cacheBooks;
    let chapterGrid;
    let encodedScripturesUrl;
    let getScripturesFailure;
    let getScripturesSucces;
    let init;
    let onHashChanged;
    let navigateHome;
    let navigateBook;
    let navigateChapter;
    let volumesGridContent;
    let volumeTitle;

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
    bookChapterValid = function (bookId, chapter) {
        return true;
    };
    booksGrid = function (volume) {
        let gridContent = `<div class="books">`;

        volume.books.forEach(function (book) {
            gridContent += 
            `<a class="btn" id="book.id" href="#${volume.id}:${book.id}">${book.gridName}</a>`;
        });
        return `${gridContent}</div>`;
    }
    booksGridContent = function (bookId){
        let gridContent = "";
        gridContent += `<div class="volume">${bookTitle(books[bookId])}</div>`;
        gridContent += chapterGrid(books[bookId]);
        return gridContent;
    }
    bookTitle = function (book){
        return `<a href="#${book.id}"><h5>${book.fullName}</h5></a>`

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
    chapterGrid = function (book) {
        let gridContent = `<div class="books">`;
        for (let i = 1; i < book.numChapters + 1; i++) {
            gridContent += 
            `<a class="btn" id="chapter">${i}</a>`;
         }
         return `${gridContent}</div>`;
    }
    encodedScripturesUrl = function (bookId, chapter, verses, isJst) {
        if (bookId !== undefined && chapter !== undefined) {
            let options = "";

            if (verses !== undefined){
                options += verses;
            }
            if (isJst !== undefined){
                options += "&jst=JST"
            }
            return `${URL_SCRIPTURES}?book=${bookId}&chap=${chapter}&verses=${options}`;
        }

    };
    getScripturesFailure = function (request) {
        document.getElementById("scriptures").innerHTML = 
            `Unable to retrieve chapter contents.`
    }
    getScripturesSucces = function (chapterHtml) {
        document.getElementById("scriptures").innerHTML = chapterHtml;
    }
    navigateBook = function (bookId) {
        document.getElementById("scriptures").innerHTML = 
            `<div id="scripnav">${booksGridContent(bookId)}</div>`;
    };
    navigateChapter = function (bookId, chapter) {
        ajax(encodedScripturesUrl(bookId, chapter), getScripturesSucces, getScripturesFailure, true);

    }
    navigateHome = function (volumeId) {
        document.getElementById("scriptures").innerHTML = 
            `<div id="scripnav">${volumesGridContent(volumeId)}</div>`;
    };
    volumesGridContent = function (volumeId){
        let gridContent = "";
        volumes.forEach(function (volume) {
            if (volumeId === undefined || volumeId === volume.id){
                gridContent += `<div class="volume">${volumeTitle(volume)}</div>`;
                gridContent += booksGrid(volume);
            }
        
        });
        return gridContent;

    }
    volumeTitle = function (volume){
        return `<a href="#${volume.id}"><h5>${volume.fullName}</h5></a>`

    };
    

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

            if (volumes.map((volume) => volume.id).includes(volumeId)) {
                navigateHome(volumeId);
            }
            else{
                navigateHome();
            }
        } else {
            const bookId = Number(ids[1]);

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
