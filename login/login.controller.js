(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginController',LoginController);

		LoginController.$inject = ['$scope','$location','userStorage'];
		function LoginController($scope, $location, userStorage) {
			$scope.list = [];
			$scope.login = function() {
	            userStorage.GetByUsername($scope.username)
                    .then(function (user) {
                    	if ($scope.username === 'admin' && $scope.userpassword === 'admin') {
                    		$location.path('/admin');
                    	}
                    	else {
	                        if (user !== null && user.password === $scope.userpassword) {
	                            $location.path('/home');
	                        } else {
	                            $scope.message = 'Username or password is incorrect';
	                        }
                    	}
                    });
	        };
		}


})();