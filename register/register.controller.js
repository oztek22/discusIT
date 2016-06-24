(function(){
	'use strict';

	angular
		.module('app')
		.factory('userStorage', userStorage)
		.controller('RegisterController',RegisterController);		

		RegisterController.$inject = ['$scope','$http','$filter','$location','userStorage'];
		function RegisterController($scope,$http,$filter,$location,userStorage) {
			$scope.vc = {};
			$scope.vpswd = {};
            		
			$scope.vc.rand = Math.floor(1000 + Math.random() * 9000);		

			$http.get("register/Indian/states.js").then(function(response) {
				$scope.stateList = response.data.stateData;
			});

				
						
			$scope.updateVc = function () {
				if ($scope.vc.v == null) {
					$scope.vc.message = "Write Security code sent to given email address..!!";
					$scope.vc.class = "alert alert-warning";
				}
				else if($scope.vc.v == $scope.vc.rand) {
					$scope.vc.message = "Success..!!";
					$scope.vc.class = "alert alert-success";
				}
				else {
					$scope.vc.message = "Security code doesn't match!!";
					$scope.vc.class = "alert alert-danger";
				}
            };

            $scope.verifyPswd = function () {
            	if($scope.vpswd.v == $scope.user.password) {
					$scope.vpswd.message = "Success..!!";
					$scope.vpswd.class = "alert alert-success";
				}
				else {
					$scope.vpswd.message = "Password doesn't match!!";
					$scope.vpswd.class = "alert alert-danger";
				}
            };

            $scope.updateCity = function () {
            	$http.get("register/Indian/cities.js").then(function(response) {
                	$scope.cityList = $filter('filter')(response.data.cityData,{"state":$scope.state.state});
				});				
            }

            $scope.register = function() {
            	userStorage.Create($scope.user)
                .then(function (response) {
                    if (response.success) {
                        $location.path('/login');
                    } else {
                        
                    }
                    $scope.message = response.message;
                });	    

			}
		}

    
    userStorage.$inject = ['$q', '$filter'];
    function userStorage($q, $filter){

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.data = localStorage;

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);                
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(idd) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: idd });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByEmail(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { email: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { name: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();
            var duplicate = false;
            GetByUsername(user.name)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        duplicate = true;
                    }
                });

            GetByEmail(user.email)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        duplicate = true;
                    }
                });

            if(duplicate == 'true') {
                deferred.resolve({ success: false, message: 'Username "' + user.name + '" or Email "'+user.email+'" is already taken' });
            } else {
                var users = getUsers();

                // assign id
                var lastUser = users[users.length - 1] || { id: 0 };
                user.id = lastUser.id + 1;

                // save to local storage
                users.push(user);
                setUsers(users);

                deferred.resolve({ success: true });
            }
                
            return deferred.promise;
        }

        function Update(user) {
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            
        }

        function Delete(id) {
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
        }

        return service;
    }


})();