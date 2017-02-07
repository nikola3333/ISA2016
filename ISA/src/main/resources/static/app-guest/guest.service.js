(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("GuestService",GuestService);
	
	GuestService.$inject = ['$http'];
	
	function GuestService($http){
		
		var service = {};
		service.getLoggedUser = getLoggedUser;
		return service;
		
		function getLoggedUser(email){
            return $http.post('/guests/email', email);

		}
	}
})();