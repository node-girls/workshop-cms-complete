var http = require('http');
var fs = require('fs');

var message;

function handler (request, response) {

    var endpoint = request.url;
    console.log(endpoint);

    if (endpoint === '/') {

        // serve home page
        fs.readFile(__dirname + '/public/index.html', 'utf-8', function (error, file) {

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
        });
    } else if (endpoint === '/node') {

        message = "I love node!";

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message);
        response.end();
    } else if (endpoint === '/girls') {

        message = "Node Girls is cool!";

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message);
        response.end();
    }
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Server is listening on port 3000. Ready to accept requests!");
});
