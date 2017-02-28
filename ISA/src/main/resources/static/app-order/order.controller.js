(function(){
	'use strict'
	
	angular
	.module('app')
	.controller('OrderController',OrderController);
	
	OrderController.$inject = ['$location','$rootScope','OrderService','AuthenticationService','$timeout','ReservationService'];
	function OrderController($location,$rootScope,OrderService,AuthenticationService,$timeout,ReservationService){
		var vm = this;
		vm.reservation = {};
		vm.restaurant = {};
		
		vm.getReservation = getReservation;
		vm.getRestaurant = getRestaurant;
		vm.addFood = addFood;
		vm.addDrink = addDrink;
		
		vm.getReservation();
		vm.getRestaurant();
		function getReservation(){
			OrderService.getReservation()
			.then(function(httpData){
				vm.reservation = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
		function getRestaurant(){
			OrderService.getRestaurant()
			.then(function(httpData){
				vm.restaurant = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		function addFood(index){
			OrderService.addFood(vm.restaurant.menu[index])
			.then(function(httpData){
				vm.reservation = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
		function addDrink(index){
			OrderService.addDrink(vm.restaurant.drinks[index])
			.then(function(httpData){
				vm.reservation = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})			
		}
	}
})();