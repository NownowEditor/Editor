
var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./conf/mime').types;
var path=require('path');
var config=require("./conf/config").config;


var start = function(){

    var onFileExist = function(realPath, response){
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
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

    var onRequest = function(request, response){
        var pathname = url.parse(request.url).pathname;
        if (pathname === "/cgi-bin/token"){
            response.writeHead(200, {
                'Content-Type':'application/json'
            });
            response.write(JSON.stringify({"base":{"code":0,"errmsg":"ok"},"result":{"expired":7200,"token":"N-Hdy-sgA-Pc-ghMAPSomZzA5I69D09BKGtUPg1UHrHrZs60x-cLo4CUsjHKn1kRCA7Qmi6yjeZOtLve7KXUcFwqh18cWBWOXqP8lymEseitZB3lwklt4kzbOJ50wepLPIDCECcEjpUaxIVCWe17uJWD0ZkN9hDRIcDD_74SbV0%3D"}}));
            response.end();
            return;
        }else if (pathname === "/cgi-bin/verify"){
            response.writeHead(200, {
                'Content-Type':'application/json'
            });
            //response.write(JSON.stringify({"base":{"code":0,"errmsg":"ok"},"result":{"uid":16}}));
            response.write(JSON.stringify({"code":20001,"errmsg":"wrong token's client ip"}));
            response.end();
            return;
        }
        var realPath = path.join(config.home, pathname);
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                onFileExist(realPath, response);
            }
        });
    }

    http.createServer(onRequest).listen(config.port || 3000, config.ip || '127.0.0.1');
    console.log("Server listen " + (config.ip || '127.0.0.1') + ":" + config.port || 3000 + ".");

}
exports.start = start;