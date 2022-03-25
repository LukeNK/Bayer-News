const http = require('http');
const fs = require('fs');

function getFile(path, res) {
    fs.readFile(path, (err, data) => {
        if (typeof(res) == 'object') {
            if (err) {
                res.writeHead(404, 'Not found');
            } else res.write(data);
            res.end();
        } else if (typeof(res) == 'function') {
            res(data);
        }
    })
}

let server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url == '/') getFile('./root/home.html', res);
    else if (req.url.indexOf('/API/asset/') == 0) getFile('.' + req.url, res);
    else if (req.url.indexOf('/API/res/') == 0) getFile('.' + req.url, res);
    // else if (req.url.indexOf('/API/text/count') == 0) fs.readdir('./API/text/', (err, f) => {res.write(f.length); res.end()});
    else if (req.url == '/API/text/list') {
        fs.readFile('API/text/list', 'utf-8', (err, data) => {
            data = data.replace(RegExp('\n', 'g'), ',')
            res.write(data);
            res.end()
        })
    }
    else if (req.url.indexOf('/API/text/') == 0) {
        let a = req.url.replace(RegExp('%20', 'g'), ' ');
        getFile('.' + a, res);
    }
    else if (req.url.indexOf('/comp/') == 0) getFile('.' + req.url, res);
});

server.listen(3000, () => {
    console.log('Hello world')
})