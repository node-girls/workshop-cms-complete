var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var message;

function handler (request, response) {

    var endpoint = request.url;

    if (endpoint === '/') {

        // serve home page
        fs.readFile(__dirname + '/public/index.html', function (error, file) {

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

    } else if (endpoint === '/create-post') {

        message = "";
        
        request.on("data", function(data) {
            message += data;
        });

        request.on("end", function () {
            response.writeHead(302, {"Location": "/"});
            message = querystring.parse(message);
            console.log(message.blogpost);
            response.end();
        });

    } else {

        var pathToFile = __dirname + '/public' + endpoint;
        var fileExtensionArray = endpoint.split('.');
        var fileExtension = fileExtensionArray[1];

        fs.readFile(pathToFile, function (error, file) {

            response.writeHead(200, { "Content-Type": "text/" + fileExtension });
            response.write(file);
            response.end();
        });
    }
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Server is listening on port 3000. Ready to accept requests!");
});
