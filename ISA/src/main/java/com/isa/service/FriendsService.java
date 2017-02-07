package com.isa.service;

import java.util.List;

import com.isa.entity.Friends;

public interface FriendsService {

	public List<Friends> getUsersFriends(String userEmail);
	public Friends sendRequest(Long requestSenderId,Long requestRecieverId);
	public Friends confirmFriendship(Long friendsId);
	
}
