require.config({
    paths: {
        'jquery': 'third_party/jquery/jquery-2.1.4.min',
        'angular': 'third_party/angular/angular.min',
        'bootstrap': 'third_party/bootstrap/js/bootstrap.min',
        'angular-route': 'third_party/uirouter/angular-ui-router.min',
        'controller': 'app/controller',
        'calendar': 'third_party/responsiveCalendar/js/calendar-tpls',
        'angular-cookies': 'third_party/angular/angular-cookies',
        'angular-animate': 'third_party/angular/angular-animate'
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'angular-route':{
            deps:['angular'],
            exports: 'angular-route'
        },
        'angular-cookies':{
            deps:['angular']
        },
        'angular-animate':{
            deps:['angular']
        }
    }
});

require(['jquery','angular','framework'],function($, angular, app){
    'use strict';
    angular.bootstrap($('html'), [app.name]);
});