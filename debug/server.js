
var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./conf/mime').types;
var path=require('path');
var config=require("./conf/config").config;


var start = function(){
    var onRequest = function(request, response){
        var pathname = url.parse(request.url).pathname;
        if (pathname === "/login"){
            response.writeHead(200, {
                'Content-Type':'application/json'
            });
            response.write(JSON.stringify({'result':0}));
            response.end();
            return;
        }
        var realPath = path.join(config.home, pathname);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err);
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    }

    http.createServer(onRequest).listen(config.port || 3000, config.ip || '127.0.0.1');
    console.log("Server listen " + (config.ip || '127.0.0.1') + ":" + config.port || 3000 + ".");

}
exports.start = start;