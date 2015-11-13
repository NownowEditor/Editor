define(['angular-route'],function(){
    var router =['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$uiViewScrollProvider',  function($stateProvider, $urlRouterProvider, $controllerProvider, $uiViewScrollProvider){
        //用于改变state时跳至顶部
        $uiViewScrollProvider.useAnchorScroll();
        // 默认进入先重定向
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login',{
                url:'/login',
                templateUrl: '/app/views/login.html',
                controller:'login',
                resolve:{
                    deps:function($q, $rootScope){
                        var deferred = $q.defer();
                        require(['controller/loginCtrl'],function(loginCtrl){
                            $rootScope.$evalAsync(function(){
                                $controllerProvider.register('login', loginCtrl);
                            });
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }

            }
        );
        $stateProvider.state('home',{
                url:'/home',
                templateUrl: '/app/views/home.html',
                controller:'home',
                resolve:{
                    deps: function($q, $rootScope){
                        var deferred = $q.defer();
                        require(['controller/homeCtrl'],function(homeCtrl){
                            $rootScope.$evalAsync(function(){
                                $controllerProvider.register('home', homeCtrl);
                            });
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }
        );
        $stateProvider.state('home.cEnergy',{
                url:'/cEnergy',
                templateUrl: '/app/views/energy.html',
                controller:'home.cEnergy',
                resolve: {
                    deps: function($q, $rootScope){
                        var deferred = $q.defer();
                        require(['controller/cEnergyCtrl'],function(ctrl){
                            $rootScope.$evalAsync(function(){
                                $controllerProvider.register('home.cEnergy', ctrl);
                            });
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }
        );
        $stateProvider.state('home.cSearch',{
                url:'/cSearch',
                template: '功能开发中...',
                controller:'developing'
            }
        );
        $stateProvider.state('home.cTabloid',{
                url:'/cTabloid',
                template: '功能开发中...',
                controller:'developing'
            }
        );
        $stateProvider.state('home.pTools',{
                url:'/pTools',
                template: '功能开发中...',
                controller:'developing'
            }
        );
    }];
    var configModule = angular.module('configModule',['ui.router']);
    configModule.controller('developing', ['$scope', function($scope){
        
    }]);
    configModule.config(router);
    return configModule;
});