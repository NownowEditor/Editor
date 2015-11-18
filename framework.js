define(['angular', 'app/config/router', 'app/service/httpService', 'app/directive/calendar', 'angular-route'],function(angular, router, http, calendarDirective){
    var app = angular.module("webapp",['ui.router', router.name]);
    app.directive('calendar', calendarDirective);
    app.service('camel', http);
    app.run([
            '$rootScope',
            '$state',
            '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams
            }
         ]);
    return app;
});