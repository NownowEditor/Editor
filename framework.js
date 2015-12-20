define(["angular",
        "app/config/router",
        "app/service/httpService",
        "app/directive/calendar",
        "app/service/mask",
        "angular-route",
        "angular-cookies"],function(angular, router, http, calendarDirective, mask){
    var app = angular.module("webapp",["ui.router", "ngCookies", router.name]);
    app.directive("calendar", calendarDirective);
    app.service("camel", http);
    app.service("mask", mask);
    app.run([
            "$rootScope",
            "$state",
            "$stateParams",
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
         ]);
    return app;
});