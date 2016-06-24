(function(){
	'use strict';

	angular
		.module('app')
		.controller('AdminController',AdminController);

		AdminController.$inject = ['$scope', '$filter', 'userStorage'];
		function AdminController($scope, $filter, userStorage) {			
	       	$scope.list = JSON.parse(userStorage.data.users);
	       
	        $scope.a = [];
	        for(var i=0; i<$scope.list.length; i++) {
	        	$scope.a.push(i);
	        }

	        $scope.updateTabel = function () {
	        	$scope.list = [];
	        	if($scope.searchBy == 'Id') {
	        		userStorage.GetById($scope.searchKey)
	        			.then(function (user) {
                    		$scope.list.push(user);
               			 });
	        	}
	        	else if($scope.searchBy == 'Name') {
	        		userStorage.GetByUsername($scope.searchKey)
	        			.then(function (user) {
                    		$scope.list.push(user);
               			 });
	        	}
	        	else if($scope.searchBy == 'Email') {
	        		userStorage.GetByEmail($scope.searchKey)
	        			.then(function (user) {
                    		$scope.list.push(user);
               			 });
	        	}
	        	else {
	        		$scope.list = JSON.parse(userStorage.data.users);
	        	}

            	for(var i=$scope.a.length; i>$scope.list.length+1; i--) {
		        	$scope.a.pop();
		        }
            }
            $scope.deleteUser = function(id) {
	            userStorage.Delete(id)
	            .then(function () {
	                $scope.updateTabel();
	            });
	        }
	    }


})();