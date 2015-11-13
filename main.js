require.config({
    paths: {
        'jquery': 'third_party/jquery/jquery-2.1.4.min',
        'angular': 'third_party/angular/angular.min',
        'bootstrap': 'third_party/bootstrap/js/bootstrap.min',
        'angular-route': 'third_party/uirouter/angular-ui-router.min',
        'controller': 'app/controller'
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'angular-route':{
            deps:['angular'],
            exports: 'angular-route'
        }
    }
});

require(['jquery','angular','app'],function($, angular, app){
    'use strict';
    angular.bootstrap($('html'), ['webapp']);
});