(function(){
	'use strict'
	
	angular
	.module('app')
	.factory("GuestService",GuestService);
	
	GuestService.$inject = ['$http'];
	
	function GuestService($http){
		
		var service = {};
		service.getLoggedUser = getLoggedUser;
		service.updateGuest = updateGuest;
		service.getNoneFriends = getNoneFriends;
		service.getFriends = getFriends;
		service.sendFriendRequest = sendFriendRequest;
		service.removeFromFriendsList = removeFromFriendsList;
		service.getFriendRequests = getFriendRequests;
		service.acceptFriendRequest = acceptFriendRequest;
		service.declineFriendRequest = declineFriendRequest;
		return service;
		
		function getLoggedUser(){
            return $http.get('/guests/user');
		}
		
		function updateGuest(user){
			return $http.post('/guests',user);
		}
		
		function getNoneFriends(){
			return $http.get('/guests/none');
		}
		
		function getFriends(){
			return $http.get('/friends')
		}
		
		function getFriendRequests(){
			return $http.get('/friends/requests');
		}
		
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
	}
})();