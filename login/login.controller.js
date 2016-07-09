(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginController',LoginController);

		LoginController.$inject = ['$cookieStore','$rootScope','$scope','$location','userStorage'];
		function LoginController($cookieStore, $rootScope,$scope, $location, userStorage) {
			(function initController() {
	            // reset login status
	            $cookieStore.remove('globalUser');
	            $rootScope.globalUser = {};      
	             
	        })();
			$scope.login = function() {
	            userStorage.GetByUsername($scope.username)
                    .then(function (user) {
                    	if ($scope.username === 'admin' && $scope.userpassword === 'admin') {
                    		$rootScope.globalUser = {
					                currentUser: {
					                    username: 'admin',
					                    aType: 'admin'
					                }
					            };
					        $cookieStore.put('globalUser', $rootScope.globalUser);					       	    
                    		$location.path('/admin');
                    	}
                    	else {
                    		if (user != null && user.password == $scope.userpassword) {
	                        	
	                        	$rootScope.globalUser = {
					                currentUser: {
					                    username: user.name,
					                    aType: user.aType
					                }
					            };

					            $cookieStore.put('globalUser', $rootScope.globalUser);
					       	    $location.path('/home');
	                        } else {
	                            $scope.message = 'Username or password is incorrect';
	                        }
                    	}
                    });
	        };
		}


})();