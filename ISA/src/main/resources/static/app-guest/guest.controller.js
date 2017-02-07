(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('GuestController',GuestController);
	
	GuestController.$inject = ['$location','$rootScope','GuestService'];
	
	function GuestController($location,$rootScope,GuestService){
		var vm = this;
		vm.restaurantsSelected = false;
		vm.friendsSelected = false;
		vm.profileSelected = false;
		vm.selectedPerson = undefined;
		vm.update = false;
		vm.loggedUser = undefined;
		
		vm.friends =
			[
				{
					"name" : "danilo",
					"lastName" : "acimovic",
					"email" : "da@a.com"
				},
				{
					"name" : "aaa",
					"lastName" : "bb",
					"email" : "hhh@a.com"
				},
				{
					"name" : "jjj",
					"lastName" : "vvv",
					"email" : "nnn@a.com"
				}
			];
		vm.showRestaurants = showRestaurants;
		vm.showFriends = showFriends;
		vm.showProfile = showProfile;
		vm.showSelectedPerson = showSelectedPerson;
		vm.sendFriendRequest = sendFriendRequest;
		vm.updateAccount = updateAccount;
		vm.saveChanges = saveChanges;
		vm.getLoggedUser = getLoggedUser;
		
		vm.getLoggedUser();
		function showRestaurants(){
			vm.restaurantsSelected = true;
			vm.friendsSelected = false;
			vm.profileSelected = false;
		}
		
		function showFriends(){
			vm.restaurantsSelected = false;
			vm.friendsSelected = true;
			vm.profileSelected = false;			
		}
		
		function showProfile(){
			vm.restaurantsSelected = false;
			vm.friendsSelected = false;
			vm.profileSelected = true;			
		}
		
		function showSelectedPerson(index){
			vm.selectedPerson = vm.friends[index];
		}
		
		function sendFriendRequest(index){
			vm.forRequest = vm.friend[index];
		}
		
		function updateAccount(){
			vm.update = true;
		}
		
		function saveChanges(){
			vm.update = false;
		}
		
		function getLoggedUser(){
			GuestService.getLoggedUser($rootScope.globals.currentUser.email)
			.then(function(user){
				vm.loggedUser = user.data;
			},function(erorrResponse){
				
			}
					);
		}
		
	}
})();