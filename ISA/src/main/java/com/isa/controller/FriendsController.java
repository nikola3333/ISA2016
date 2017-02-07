package com.isa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.isa.entity.Friends;
import com.isa.service.FriendsService;

@RestController
@RequestMapping("/friends")
public class FriendsController {

	@Autowired
	private FriendsService friendsService;
	
	@RequestMapping(method = RequestMethod.POST)
	public List<Friends> findUsersFriends(@RequestBody String userEmail){
		return friendsService.getUsersFriends(userEmail);
	}
	
	
	@RequestMapping(value = "/sender/{requestSenderId}/reciever/{requestRecieverId}",method = RequestMethod.PUT)
	public Friends sendRequest(@PathVariable Long requestSenderId,@PathVariable Long requestRecieverId){
		return friendsService.sendRequest(requestSenderId, requestRecieverId);
	}
	
	@RequestMapping(value = "/{id}",method = RequestMethod.POST)
	public Friends confirmFriendship(@PathVariable Long id){
		return friendsService.confirmFriendship(id);
	}
	
}
