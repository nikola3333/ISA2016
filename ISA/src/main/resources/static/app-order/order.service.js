(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("OrderService",OrderService);
	
	OrderService.$inject = ['$http'];	
	
	function OrderService ($http){
		var service = {};
		service.getReservation = getReservation;
		service.getRestaurant = getRestaurant;
		service.addDrink = addDrink;
		service.addFood = addFood;
		return service;
		
		function getReservation(){
			return $http.get('/reservations')
		}
		
		function getRestaurant(){
			return $http.get('/restaurants/session');
		}
		
		function addDrink(drink){
			return $http.post('/reservations/orders/drink',drink);
		}

		function addFood(food){
			return $http.post('/reservations/orders/food',food);
		} 		
	}
	
})();