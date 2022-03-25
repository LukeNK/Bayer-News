let innerHTMLtemp = ''

/**
 * Make GET request to link
 * @param {String} link The link to make GET
 * @param {function} callback Callback (data)
 */
 function loadData(link, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() { callback(this.responseText) }
    xhttp.open("GET", link);
    xhttp.send();
}

function sendData(target, data, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() { callback(this.responseText); };
    xhttp.open("POST", target, true);
    xhttp.send(data);
}

(function() {
    // load all of components
    let divs = document.getElementsByTagName('div');
    for (div of divs) {
        let id = div.getAttribute('id');
        if (!id || !id.includes('comp-')) continue;
        loadData('/comp/' + id + '.html', (data) => {
            document.getElementById(id).innerHTML = data; // idk why
        })
    }
})();