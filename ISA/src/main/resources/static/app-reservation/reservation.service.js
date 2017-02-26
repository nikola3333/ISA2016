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
		service.confirmReservation = confirmReservation;
		service.inviteFriend = inviteFriend;
		return service;
		
		function getSelectedRestaurant(){
			return $http.get('/restaurants/session');
		}
		
		function sendDate(dates){
			return $http.post('/reservations/date',dates);
		}
		
		function checkIfReserved(tableId){
			return $http.get("/reservations/" +tableId);
		}
		
		function confirmReservation(tables){
			return $http.post("/reservations",tables);
		}
		
		function inviteFriend(friend,reservationId){
			return $http.post("/reservations/friend/"+reservationId,friend);
		}
	}
})();