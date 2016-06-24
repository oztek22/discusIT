(function () {
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .config(config)
        .controller('MainController',MainController);       

        MainController.$inject = ['$scope','$http','$filter','$location','userStorage'];
        function MainController($scope,$http,$filter,$location,userStorage) {

        }

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'hc'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'lc'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'rc'
            })

    	    .when('/about',{
    		      templateUrl: 'about/about.view.html',
                  controller: 'AboutController',
                  controllerAs: 'ac'
    	    })

            .when('/admin',{
                  templateUrl: 'admin/admin.view.html',
                  controller: 'AdminController',
                  controllerAs: 'adc'
            })	

            .otherwise({ redirectTo: '/home' });
    }

   


})();
