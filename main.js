require.config({
    paths: {
        "jquery": "third_party/jquery/jquery-2.1.4.min",
        "angular": "third_party/angular/angular.min",
        "bootstrap": "third_party/bootstrap/js/bootstrap.min",
        "angular-route": "third_party/uirouter/angular-ui-router.min",
        "controller": "app/controller",
        "calendar": "third_party/responsiveCalendar/js/calendar-tpls",
        "angular-cookies": "third_party/angular/angular-cookies",
        "angular-animate": "third_party/angular/angular-animate"
    },
    shim:{
        "angular":{
            exports:"angular"
        },
        "angular-route":{
            deps:["angular"],
            exports: "angular-route"
        },
        "angular-cookies":{
            deps:["angular"]
        },
        "angular-animate":{
            deps:["angular"]
        }
    }
});

require(["jquery","angular","framework"],function($, angular, app){
    "use strict";
    Date.prototype.Format = function(fmt) //扩展的Date简易format方法
    { //author: meizz
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }
    angular.bootstrap($("html"), [app.name]);
});