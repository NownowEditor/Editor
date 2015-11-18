define(['jquery'], function($){
    var service = function(){
        this.get = function(options){
            var deferred = $.ajax({
                "url":options.url,
                "method":"GET",
                "beforeSend": function(request){
                    // request.setRequestHeader("X-Auth-Token", options.token || "")
                },
                "data": options.params || {},
                "dataType":"JSON",
                "success":function(){
                }
            });
            return deferred;
        };

        this.post = function(options){
            var deferred = $.ajax({
                "url":options.url,
                "method":"POST",
                "beforeSend": function(request){
                    // if (!!options.user){
                    //     request.setRequestHeader("X-Auth-User", options.user)
                    // }
                    // if (!!options.pwd){
                    //     request.setRequestHeader("X-Auth-Password", options.pwd)
                    // }
                    // if (!!options.token){
                    //     request.setRequestHeader("X-Auth-Token", options.token)
                    // }
                },
                "data": options.params || {},
                "dataType":"JSON",
                "success":function(data){
                }
            });
            return deferred;
        };
    };

    return service;
});