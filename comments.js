// Create web server

// 1. Load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// 2. Create web server object
const app = http.createServer(function(request, response) {
    // 2.1. Get path from request
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    // 2.2. Log path to console
    console.log(pathname);

    // 2.3. If path is '/', read data from file and send to client
    if (pathname === '/') {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
            const title = queryData.id;
            const template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ol>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ol>
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
            `;

            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create') { // 2.4. If path is '/create', send html form to client
        fs.readFile('create.html', 'utf8', function(err, description) {
            const title = 'WEB - create';
            const template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ol>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>