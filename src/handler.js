var fs = require('fs');
var querystring = require('querystring');

function handler (request, response) {
    
    var endpoint = request.url;

    if (endpoint === '/') {

        var pathToIndex = __dirname + '/../public/index.html';

        fs.readFile(pathToIndex, function (error, file) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
        });
    } else if (request.method === 'POST') {

        var data = "";
        
        request.on("data", function(chunk) {
            data += chunk;
            var post = querystring.parse(data);
            post.timestamp = Date.now();
            console.log(post);

            fs.writeFile(__dirname + '/posts.json', JSON.stringify(post), function (err) {
                if (err) {
                    console.log(err);
                }
            })
        });

        request.on("end", function () {
        
            var convertedData = querystring.parse(data);
            fs.readFile(__dirname + "/posts.json", "utf8", function (err, data) {

                if (err) {
                    console.log(err);
                } 

                response.writeHead(200);
                response.write(data);
                response.end();
                
            });
            
        });

    } else {
        var pathToFile = __dirname + '/../public' + endpoint;
        var fileExtensionArray = endpoint.split('.');
        var fileExtension = fileExtensionArray[1];

        fs.readFile(pathToFile, function (error, file) {

            response.writeHead(200, { "Content-Type": "text/" + fileExtension });
            response.write(file);
            response.end();
        });
    }
}

module.exports = handler;