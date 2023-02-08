


const Scriptures = (function () { 
    "use strict";


    let init;


    ajax = function (url, sucessCallback, failureCallback){
        let request = new XMLHttpRequest ();
        request.open ('GET', url, true);

        request.onload = function( ) {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse (request.responseText);

                if (typeof sucessCallback === "function"){
                    sucessCallback(data);
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

    init = function (callback) {
        ajax("https://scriptures.byu.edu/mapscrip/model/books.php",
            data => {
                console.log("Loaded volumes from server");
                console.log(data);
            }
        );
        ajax("https://scriptures.byu.edu/mapscrip/model/volumes.php",
            data => {
                console.log("Loaded volumes from server");
                console.log(data);
            }
        );
    };
    

    return {
        init: init
    };
}());