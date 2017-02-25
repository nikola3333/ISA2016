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
		vm.searchCondition = "";
		vm.restaurants = [];
		vm.selectedRestaurant = undefined;
		vm.selectedRestaurantIndex = undefined;
		vm.searchRestaurantsCondition = "";
		vm.criterias = [{id : "1", name : "Sort by"},{id:"2",name:"Name"},{id:"3",name:"Type"}]
		vm.sortRestaurantsCriteria = {id : "1", name : "Sort by"}
		
		vm.showRestaurants = showRestaurants;
		vm.showFriends = showFriends;
		vm.showProfile = showProfile;
		vm.showSelectedPerson = showSelectedPerson;
		vm.showSelectedPersonRequest = showSelectedPersonRequest;
		vm.sendFriendRequest = sendFriendRequest;
		vm.updateAccount = updateAccount;
		vm.saveChanges = saveChanges;
		vm.getLoggedUser = getLoggedUser;
		vm.logout = logout;
		//vm.getNoneFriends = getNoneFriends;
		//vm.getFriends = getFriends;
		//vm.getFriendRequests = getFriendRequests;
	//friends
		vm.removeFromFriendsList = removeFromFriendsList;
		vm.acceptFriendRequest = acceptFriendRequest;
		vm.declineFriendRequest = declineFriendRequest;
		vm.searchNoneFriends = searchNoneFriends;
		vm.searchFriends = searchFriends;
		vm.searchFriendRequests = searchFriendRequests;
	//restaurants
		vm.getAllRestaurants = getAllRestaurants;
		vm.setSelectedRestaurant = setSelectedRestaurant;
		vm.searchRestaurants = searchRestaurants;
		vm.sortCriteriaChanged = sortCriteriaChanged;
		vm.reserve = reserve;
 		vm.getLoggedUser();
		
		
		//nalazim logovanog gosta
		function getLoggedUser(){
			GuestService.getLoggedUser()
			.then(function(user){
				vm.loggedUser = user.data;
				vm.update = false;
			},function(httpData){
				vm.loggedUser = undefined;
				console.log(httpData.message);
			});
		}		
		function logout(){
			GuestService.logout()
			.then(function(data){
				$rootScope.globals.currentUser = [];
				$location.path('/')
			},
			function(httpData){
				console.log(httpData.message);
				
			})
		}
		function showRestaurants(){
			vm.restaurantsSelected = true;
			vm.friendsSelected = false;
			vm.profileSelected = false;
        	$location.path('/homePage/restaurants');

		}
		
		function showFriends(){
			vm.restaurantsSelected = false;
			vm.friendsSelected = true;
			vm.profileSelected = false;
        	$location.path('/homePage/friends');
		}
		
		function showProfile(){
			vm.restaurantsSelected = false;
			vm.friendsSelected = false;
			vm.profileSelected = true;		
        	$location.path('/homePage/profile');

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
		/*function getNoneFriends(){
			GuestService.getNoneFriends()
			.then(function(httpData){
				vm.noneFriends = httpData.data;
				vm.getFriends();
			},
			function(data){
				vm.noneFriends = [];
			})
		}*/
		
		//ucitaj sve prijatelje logovanog gost
		/*function getFriends(){
			GuestService.getFriends()
			.then(function(httpData){
				vm.friends = httpData.data;
				vm.getFriendRequests();
			},
			function(httpData){
				console.log(httpData.data.message);
				
			})
		}*/
		
		//ucitaj sve zahteve za prijateljstvo, i one koje je poslao logovani gost, i one koje primio
		/*function getFriendRequests(){
			GuestService.getFriendRequests()
			.then(function(httpData){
				vm.friendRequests = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
				
			})
		}*/
		
		//setuj polja za update acount-a
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
				//vm.getNoneFriends();
				vm.searchNoneFriends();
			},
			function(httpData){
				console.log(httpData.data.message);
				vm.searchNoneFriends();
				
			})
		}
		
		//brisanje iz liste prijatelja		
		function removeFromFriendsList(index){
			GuestService.removeFromFriendsList(vm.friends[index].id)
			.then(function(httpData){
				//vm.getNoneFriends();
				vm.searchNoneFriends();
			},function(httpData){
				console.log(httpData.data.message);
				vm.searchNoneFriends();
			})
		}
		
		//prihvatanje zahteva za prijateljstvo
		function acceptFriendRequest(index){
			GuestService.acceptFriendRequest(vm.friendRequests[index].id)
			.then(function(httpData){
				//vm.getNoneFriends();
				vm.searchNoneFriends();
			},
			function(httpData){
				console.log(httpData.data.message);
				vm.searchNoneFriends();
			})
		}
		
		//odbijanje zahteva za prijateljstvo
		function declineFriendRequest(index){
			GuestService.declineFriendRequest(vm.friendRequests[index].id)
			.then(function(httpData){
				//vm.getNoneFriends();
				vm.searchNoneFriends();
			},
			function(httpData){
				console.log(httpData.data.message);
				vm.searchNoneFriends();

			})
		}
		
		function searchNoneFriends(){
			GuestService.searchNoneFriends(vm.searchCondition)
			.then(function(httpData){
				vm.noneFriends = httpData.data;
				vm.searchFriends();
			},
			function(httpData){
				console.log(httpData.data.message)
			})
		}
		//pronadji sve prijatelje, uz odredjeni uslov
		function searchFriends(){
			GuestService.searchFriends(vm.searchCondition)
			.then(function(httpData){
				vm.friends =httpData.data;
				vm.searchFriendRequests();
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
		function searchFriendRequests(){
			GuestService.searchFriendRequests(vm.searchCondition)
			.then(function(httpData){
				vm.friendRequests = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
		function getAllRestaurants(){
			GuestService.getAllRestaurants(vm.sortRestaurantsCriteria.name)
			.then(function(httpData){
				vm.restaurants = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		function setSelectedRestaurant(index){
			vm.selectedRestaurant = vm.restaurants[index];
			vm.selectedRestaurantIndex = index;			
		}
		function searchRestaurants(){
			if(vm.searchRestaurantsCondition.trim() != "")
				GuestService.searchRestaurants(vm.searchRestaurantsCondition,vm.sortRestaurantsCriteria.name)
				.then(function(httpData){
					vm.restaurants = httpData.data;
				},
				function(httpData){
					console.log(httpData.data.message);
				})
			else{
				vm.getAllRestaurants();
			}
		}
		function sortCriteriaChanged(value){
			vm.sortRestaurantsCriteria = value;
			searchRestaurants();
		}
		function reserve(){
			GuestService.addRestaurantToSession(vm.selectedRestaurant.id)
			.then(function(httpData){
	        	$location.path('/reservation');
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
	}
})();