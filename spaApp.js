// (function(){
var partialsCache = {};

window.addEventListener("hashchange", navigate);

function fetchFile(path, callback) {
    var request = new XMLHttpRequest();

    request.onload = function () {
        callback(request.responseText);
    };

    request.open("GET", path);
    request.send(null)
};

function getContent(fragmentId, callback) {

    if (partialsCache[fragmentId]) {
        callback(partialsCache[fragmentId]);
    } else {
        fetchFile(fragmentId + ".html", function (content) {
            partialsCache[fragmentId] = content;

            callback(content);
        });
    };

};

function navigate() {

    var contentDiv = document.getElementById("content");

    fragmentId = location.hash.substr(1);
    getContent(fragmentId, function (content) {
        contentDiv.innerHTML = content;
    });
};

navigate();

if (!location.hash) {
    location.hash = "#home"
};

// })();