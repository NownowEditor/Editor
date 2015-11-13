define([], function(){
    var service = function($q, camel){
        this.login = function(options){
            var defer = $q.defer();

            camel.post({
                "url":"/login",
                "params":{
                    "uname":options.uname,
                    "upwd":options.upwd
                },
                "success":function(data){
                    defer.resolve(data);
                }
            });
            return defer.promise;
        };
    }
    return service;
});