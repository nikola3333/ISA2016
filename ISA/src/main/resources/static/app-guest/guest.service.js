(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("GuestService",GuestService);
	
	GuestService.$inject = ['$http'];
	
	function GuestService($http){
		
		var service = {};
		service.getLoggedUser = getLoggedUser;
		service.logout = logout;
		service.updateGuest = updateGuest;
		//service.getNoneFriends = getNoneFriends;
		//service.getFriends = getFriends;
		//service.getFriendRequests = getFriendRequests;
		service.sendFriendRequest = sendFriendRequest;
		service.removeFromFriendsList = removeFromFriendsList;
		service.acceptFriendRequest = acceptFriendRequest;
		service.declineFriendRequest = declineFriendRequest;
		service.searchNoneFriends = searchNoneFriends;
		service.searchFriends = searchFriends;
		service.searchFriendRequests = searchFriendRequests;
		return service;
		
		function getLoggedUser(){
            return $http.get('/guests/user');
		}
		
		function logout(){
			return $http.delete('/guests/user');
		}
		
		function updateGuest(user){
			return $http.post('/guests',user);
		}
		
		/*function getNoneFriends(){
			return $http.get('/guests/none');
		}*/
		
		/*function getFriends(){
			return $http.get('/friends')
		}*/
		
		/*function getFriendRequests(){
			return $http.get('/friends/requests');
		}*/
		
		function sendFriendRequest(senderId,recieverId){
			return $http.put("/friends/sender/"+senderId+"/reciever/"+recieverId);
		}
		
		function removeFromFriendsList(id){
			return $http.delete("/friends/friend/"+id);
		}
		function acceptFriendRequest(id){
			return $http.post("/friends",id);
		}
		
		function declineFriendRequest(id){
			return $http.delete("/friends/"+id);
		}
		
		function searchNoneFriends(condition){
			return $http.get("/guests/none/"+condition);
		}
		
		function searchFriends(condition){
			return $http.get("/friends/"+condition);
		}
		
		function searchFriendRequests(condition){
			return $http.get("/friends/requests/"+condition);
		}
	}
})();