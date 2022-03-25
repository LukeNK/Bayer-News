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

function openPost(link) {
    loadData(link, data => {
        innerHTMLtemp = document.getElementById('newsList').innerHTML;
        document.getElementById('newsList').innerHTML = data;
    })
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

(function() {
    loadData('/API/text/list', (data) => {
        data = data.split(',');
        for (n of data) {
            document.getElementById('newsList').innerHTML = 
                `<h2 style="cursor: pointer;" onclick="openPost('/API/text/${n}')">${n}</h2><br>` + 
                document.getElementById('newsList').innerHTML;
        }
        innerHTMLtemp = document.getElementById('newsList').innerHTML;
        if (window.location.hash.indexOf('#id') == 0) 
            openPost('/API/text/' + data[window.location.hash.substring(3)]);
    })
})()