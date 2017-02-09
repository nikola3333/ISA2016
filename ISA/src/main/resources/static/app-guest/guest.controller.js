(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('GuestController',GuestController);
	
	GuestController.$inject = ['$location','$rootScope','GuestService','AuthenticationService','$timeout'];
	
	function GuestController($location,$rootScope,GuestService,AuthenticationService,$timeout){
		var vm = this;
		vm.restaurantsSelected = false;
		vm.friendsSelected = false;
		vm.profileSelected = false;
		vm.selectedPerson = undefined;
		vm.update = false;
		vm.loggedUser = undefined;//logovani korisnik
		vm.successUpdate = false;
		vm.noneFriends =[];//lista osoba koje nisu u listi prijatelja
		vm.friends = [];
		vm.friendRequests = [];
		
		vm.showRestaurants = showRestaurants;
		vm.showFriends = showFriends;
		vm.showProfile = showProfile;
		vm.showSelectedPerson = showSelectedPerson;
		vm.showSelectedPersonRequest = showSelectedPersonRequest;
		vm.sendFriendRequest = sendFriendRequest;
		vm.updateAccount = updateAccount;
		vm.saveChanges = saveChanges;
		vm.getLoggedUser = getLoggedUser;
		vm.getNoneFriends = getNoneFriends;
		vm.getFriends = getFriends;
		vm.getFriendRequests = getFriendRequests;
		vm.removeFromFriendsList = removeFromFriendsList;
		vm.acceptFriendRequest = acceptFriendRequest;
		vm.declineFriendRequest = declineFriendRequest;
		vm.getLoggedUser();
		
		
		//nalazim logovanog gosta, radi izmene podataka
		function getLoggedUser(){
			GuestService.getLoggedUser()
			.then(function(user){
				vm.loggedUser = user.data;
			},function(erorrResponse){
				vm.loggedUser = undefined;
			});
		}		
		
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
		
		function showSelectedPerson(person){
			vm.selectedPerson = person;
		}
		
		function showSelectedPersonRequest(index){
			if(vm.friendRequests[index].requestSender.id == vm.loggedUser.id)
				vm.selectedPerson = vm.friendRequests[index].requestResponder;
			else
				vm.selectedPerson = vm.friendRequests[index].requestSender;
		}		
		
		//sve goste koji nisu u listi prijatelja
		function getNoneFriends(){
			GuestService.getNoneFriends()
			.then(function(httpData){
				vm.noneFriends = httpData.data;
				vm.getFriends();
			},
			function(data){
				vm.noneFriends = [];
			})
		}
		
		function getFriends(){
			GuestService.getFriends()
			.then(function(httpData){
				vm.friends = httpData.data;
				vm.getFriendRequests();
			},
			function(httpData){
				console.log(httpData.data.message);
				
			})
		}
		
		function getFriendRequests(){
			GuestService.getFriendRequests()
			.then(function(httpData){
				vm.friendRequests = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
				
			})
		}
		
		
		function updateAccount(){
			vm.update = true;
		}
		//izmeni podatke o logovanom korisniku
		function saveChanges(){
			vm.update = false;
			GuestService.updateGuest(vm.loggedUser)
			.then(function(response){
				vm.successUpdate = true; 
		         $timeout(function () { vm.successUpdate = false; }, 3000); 
				AuthenticationService.setCredentials(vm.loggedUser.email,vm.loggedUser.password);
			},
			function(errorResponse){
				vm.successUpdate = false;
			})
		}
		//posalji zahtev za prijateljstvo
		function sendFriendRequest(index){
			GuestService.sendFriendRequest(vm.loggedUser.id,vm.noneFriends[index].id)
			.then(function(httpData){
				vm.selectedPerson = {};
				vm.getNoneFriends();
			},
			function(httpData){
				console.log(httpData.data.message);
				
			})
		}
		
				
		function removeFromFriendsList(index){
			GuestService.removeFromFriendsList(vm.friends[index].id)
			.then(function(httpData){
				vm.getNoneFriends();
			},function(httpData){
				console.log(httpData.data.message);
				
			})
		}
		
		function acceptFriendRequest(index){
			GuestService.acceptFriendRequest(vm.friendRequests[index].id)
			.then(function(httpData){
				vm.getNoneFriends();
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
		function declineFriendRequest(index){
			GuestService.declineFriendRequest(vm.friendRequests[index].id)
			.then(function(httpData){
				vm.getNoneFriends();
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
	}
})();