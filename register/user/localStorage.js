(function(){
	'use strict';

	angular
		.module('app')
		.factory('userStorage', userStorage)

	function userStorage($http, $filter){

		var service = {};

	    service.GetAll = getUsers;
	    service.GetById = GetById;
	    service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
	    service.Delete = Delete;

		function getUsers() {
            if(!localStorage.users){
            	//$http.get("register/user/userData.js").then(function(response) {
                //	localStorage.users = response.data.userData;
                //}
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

        function GetById(id) {
        	var filtered = $filter('filter')(getUsers(), { email: id });
        	var user = filtered.length ? filtered[0] : null;
        	return user;
        }

        function GetByUsername(username) {
            var filtered = $filter('filter')(getUsers(), { name: username });
            var user = filtered.length ? filtered[0] : null;
            return user;
        }

        function Create(user) {
        	GetByUsername(user.name)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            var message = user.name +"is already taken";
                            var success = false;
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1];
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            var message = "User added successfully!!";
                            var success = true;
                        }
                        return {message: message, success: success};
                    });
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
});