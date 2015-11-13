define(['angular', 'app/config/router', 'app/service/httpService', 'angular-route'],function(angular, router, http){
    var app = angular.module("webapp",['ui.router', router.name]);
    app.service('camel', http);
    app.run([
            '$rootScope',
            '$state',
            '$stateParams',
            function ($rootScope, $state, $stateParams) {
                console.log('run...');
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams
            }
         ]);
    return app;
});