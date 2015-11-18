define([], function(){
    var service = function($q, camel){
        this.login = function(options){
            var defer = $q.defer();
            var loginReq = camel.post({
                "url":"/login",
                "user": options.uname,
                "pwd":options.upwd,
                "params":{
                }
            });
            loginReq.success(function(data){
                defer.resolve(data);
            });
            return defer.promise;
        };
    }
    return service;
});