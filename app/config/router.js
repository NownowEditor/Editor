define(['app/service/loginService','angular-route'],function(LoginService){
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
                    deps: function($q){
                        var deferred = $q.defer();
                        require(['controller/homeCtrl'],function(homeCtrl){
                            $controllerProvider.register('home', homeCtrl);
                            deferred.resolve('deps resolved');
                        });
                        return deferred.promise;
                    },
                    user: function($q, $cookies, camel){
                        var loginService = new LoginService($q, camel);
                        var deferred = $q.defer();
                        var userInCookie = $cookies.getObject("user");
                        if (userInCookie && userInCookie.token){
                            var verify = loginService.verify({
                                token: userInCookie.token
                            });
                            verify.then(function(data){
                                if (data && data.code === 0){
                                    deferred.resolve(data);
                                }else{
                                    deferred.resolve();
                                }
                            });
                        }else{
                            setTimeout(function(){
                                deferred.resolve()
                            }, 0);
                        }
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
