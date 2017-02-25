(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("ReservationService",ReservationService);
	
	ReservationService.$inject = ['$http'];
	
	function ReservationService($http){
		var service = {};
		service.getSelectedRestaurant = getSelectedRestaurant;
		service.sendDate = sendDate;
		service.checkIfReserved = checkIfReserved;
		
		return service;
		
		function getSelectedRestaurant(){
			return $http.get('/restaurants/session');
		}
		
		function sendDate(dates){
			return $http.post('/reservations',dates);
		}
		
		function checkIfReserved(tableId){
			return $http.get("/reservations/" +tableId);
		}
	}
})();