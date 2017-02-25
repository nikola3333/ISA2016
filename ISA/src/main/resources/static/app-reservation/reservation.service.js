
(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("ReservationService",ReservationService);
	
	ReservationService.$inject = ['$http'];
	
	function ReservationService($http){
		var service = {};
		
		
		return service;
	}

})();