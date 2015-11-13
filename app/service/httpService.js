define(['jquery'], function($){
    var service = function(){
        this.get = function(options){
            $.ajax({
                "url":options.url,
                "method":"GET",
                "beforeSend": function(request){
                    request.setRequestHeader("X-Auth-Token", options.token || "")
                },
                "data": options.params,
                "dataType":"JSON",
                "success":function(data){
                    (typeof options.success === "function") && (options.success(data));
                }
            });
        };

        this.post = function(options){
            $.ajax({
                "url":options.url,
                "method":"POST",
                "beforeSend": function(request){
                    request.setRequestHeader("X-Auth-Token", options.token || "")
                },
                "data": options.params,
                "dataType":"JSON",
                "success":function(data){
                    (typeof options.success === "function") && (options.success(data));
                }
            });
        };

        this.auth = function(options){
            $.ajax({
                "url":options.url,
                "method":"GET",
                "beforeSend": function(request){
                    request.setRequestHeader("X-Auth-Token", options.token || "")
                },
                "data": options.params,
                "dataType":"JSON",
                "success":function(data){
                    (typeof options.success === "function") && (options.success(data));
                }
            });

        };
    };

    return service;
});