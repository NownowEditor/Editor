var log = require("../log4js/log4js").fixture;
var fixture = {};


exports.fixture = function(method, url, data){
    if (fixture[url]){
        log.error("fixture for url " + url + " is exists. rewrite it.");
    }
    fixture[url].method = method;
    fixture[url].data = data;
}

exports.getData = function(method, url, data){
    if (!fixture || !fixture.data || !(typeof fixture.data === "function")){
        log.error("fixture not found for url", url);
        return false;
    }
    return fixture[url].data(data);
}