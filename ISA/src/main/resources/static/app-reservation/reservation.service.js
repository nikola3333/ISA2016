(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("ReservationService",ReservationService);
	
	ReservationService.$inject = ['$http'];
	
	function ReservationService($http){
		var service = {};
		service.getSelectedRestaurant = getSelectedRestaurant;
		
		
		return service;
		
		function getSelectedRestaurant(){
			return $http.get('/restaurants/session');
		}
	}
})();