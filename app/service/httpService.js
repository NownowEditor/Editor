define(['jquery'], function($){
    var service = function(){
        this.get = function(options){
            var deferred = $.ajax({
                "url":options.url,
                "method":"GET",
                "beforeSend": function(request){
                },
                "data": JSON.stringify(options.params || {}),
                "dataType":"JSON"
            });
            return deferred;
        };

        this.post = function(options){
            var deferred = $.ajax({
                "url":options.url,
                "method":"POST",
                "beforeSend": function(request){
                },
                "data": JSON.stringify(options.params || {}),
                "dataType":"JSON"
            });
            return deferred;
        };
    };

    return service;
});