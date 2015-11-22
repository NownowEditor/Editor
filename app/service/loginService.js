define([], function(){
    var service = function($q, camel){
        this.login = function(options){
            var defer = $q.defer();
            var loginReq = camel.post({
                "url":"/cgi-bin/token",
                "params":{
                    "username": options.username,
                    "password": options.password
                }
            });
            loginReq.success(function(data){
                defer.resolve(data);
            });
            return defer.promise;
        };
        this.verify = function(options){
            var deferred = $q.defer();
            var verifyReq = camel.post({
                "url":"/cgi-bin/verify",
                "params":{
                    "token": options.token || ""
                }
            });
            verifyReq.success(function(data){
                deferred.resolve(data);
            });
            // verifyReq.failed(function(){
            //     deferred.resolve();
            // });
            return deferred.promise;
        }
    }
    return service;
});