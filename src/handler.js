var fs = require('fs');
var querystring = require('querystring');

function handler (request, response) {

    var endpoint = request.url;

    if (endpoint === '/') {

        var pathToIndex = __dirname + '/../public/index.html';

        fs.readFile(pathToIndex, function (error, file) {

            if (error) {
                throw error;
            }
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
        });
    } else if (endpoint === '/add-post') {

        var data = "";

        request.on("data", function(chunk) {

            data += chunk;
        });

        request.on("end", function () {

            var newPost = querystring.parse(data);

            fs.readFile(__dirname + "/posts.json", "utf8", function (error, fileData) {

                if (error) {
                    console.log(error);
                }
                var blogposts = JSON.parse(fileData);
                var currentTime = Date.now();

                blogposts[currentTime] = newPost.blogpost;

                fs.writeFile(__dirname + '/posts.json', JSON.stringify(blogposts, null, 4), function (error) {

                    if (error) {
                        console.log(error);
                    }
                    response.writeHead(302, {"Location" : "/"});
                    response.end();
                });
            });
        });

    } else if (endpoint === '/get-posts'){

        var pathToJSON = __dirname + '/posts.json';

        fs.readFile(pathToJSON, function (error, blogposts) {

            if (error) {
                throw error;
            }
            response.writeHead(200, {"Content-Type": "text/json"});
            response.write(blogposts);
            response.end();
        });
    } else {

        var pathToFile = __dirname + '/../public' + endpoint;
        var fileExtensionArray = endpoint.split('.');
        var fileExtension = fileExtensionArray[1];

        fs.readFile(pathToFile, function (error, file) {

            if (error) {
                throw error;
            }
            response.writeHead(200, { "Content-Type": "text/" + fileExtension });
            response.write(file);
            response.end();
        });
    }
}

module.exports = handler;
