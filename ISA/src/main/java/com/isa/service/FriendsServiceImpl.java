package com.isa.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isa.entity.Friends;
import com.isa.entity.Guest;
import com.isa.exceptions.DatabaseDuplicateException;
import com.isa.exceptions.ExpiredRequestException;
import com.isa.exceptions.UserNotFoundException;
import com.isa.repository.FriendsRepository;
import com.isa.repository.GuestRepository;

@Service
@Transactional
public class FriendsServiceImpl implements FriendsService{

	@Autowired
	FriendsRepository friendsRepository;
	@Autowired
	GuestRepository guestRepository;
	
	@Override
	public List<Guest> getUsersFriends(String userEmail) {
		ArrayList<Friends> f = new ArrayList<>( friendsRepository.findUsersFriends(userEmail));
		ArrayList<Guest> friends = new ArrayList<>();
		for(Friends ff : f){
			if(ff.getRequestResponder().getEmail().equals(userEmail)){
				friends.add(ff.getRequestSender());
			}
			else{
				friends.add(ff.getRequestResponder());
			}
		}
		return friends;
	}

	@Override
	public Friends sendRequest(Long requestSenderId, Long requestRecieverId) {
		
		Guest requestSender = guestRepository.findOne(requestSenderId);
		Guest requestReciever = guestRepository.findOne(requestRecieverId);
		
		if(requestReciever == null) throw new UserNotFoundException(""+requestRecieverId);
		if(requestSender == null) throw new UserNotFoundException(""+requestSenderId);
		if(friendsRepository.findFriendship(requestSenderId, requestRecieverId).size() >0 ) throw new DatabaseDuplicateException("Connection already exists");
		return friendsRepository.save(new Friends(requestSender, requestReciever, false));
	}

	@Override
	public Friends confirmFriendship(Long friendsId) {
		// TODO Auto-generated method stub
		Friends f = friendsRepository.findOne(friendsId);
		if(f == null) throw new ExpiredRequestException("Request cancelled");
		f.setConfirmedFriendship(true);
		return friendsRepository.save(f);
	}

	@Override
	public void removeFromFriendsList(Long id,Long friendId) {
		Friends friends = friendsRepository.findFriendship(id, friendId).get(0);
		if(friends == null) throw new IllegalArgumentException("Friendship doesn't exist");
		friendsRepository.delete(friends);
	}

	@Override
	public List<Friends> getFriendRequests(String email) {
		// TODO Auto-generated method stub
		return friendsRepository.findUserFriendRequests(email);
	}

	@Override
	public void declineFriendRequest(Long id) {
		if(friendsRepository.findOne(id) == null) throw new IllegalArgumentException("Friendship doesn't exist");
		friendsRepository.delete(id);
	}

	@Override
	public List<Guest> searchUsersFriends(Long id, String condition) {

		ArrayList<Friends> f = new ArrayList<>( friendsRepository.findUsersFriends(id,condition));
		ArrayList<Guest> friends = new ArrayList<>();
		for(Friends ff : f){
			if(ff.getRequestResponder().getId().equals(id)){
				friends.add(ff.getRequestSender());
			}
			else{
				friends.add(ff.getRequestResponder());
			}
		}
		return friends;
	}

	@Override
	public List<Friends> searchFriendRequests(Long id, String condition) {

		String conditions [] =condition.split(" ");
		
		if(conditions.length == 1)
			return friendsRepository.findUserFriendRequests(id, condition+"%");
		else
			return new ArrayList<Friends>();
	}
	
}
