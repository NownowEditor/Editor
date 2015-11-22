define(['jquery'], function($){
    var service = function($q, camel){
        this.getEditedDate = function(options){
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
            loginReq.fail(function(){
                defer.resolve();
            });
            return defer.promise;
        }

        this.getContent = function(options){
            var deferred = $q.defer();
            var getcontent = camel.post({
                "url":"/cgi-bin/edit/get?token=" + (options.token || ""),
                "params":options.params || {}
            });
            getcontent.success(function(data){
                deferred.resolve(data);
            });
            getcontent.fail(function(){
                deferred.resolve();
            });
            return deferred.promise;
        }

        this.setContent = function(options){
            var deferred = $q.defer();
            var setContent = camel.post({
                "url":"/cgi-bin/edit/get?token=" + (options.token || ""),
                "params":options.params || {}
            });
            setContent.success(function(data){
                deferred.resolve(data);
            });
            setContent.fail(function(){
                deferred.resolve();
            });
            return deferred.promise;
        }
    }
    return service;
});