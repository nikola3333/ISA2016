package com.isa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isa.entity.Friends;
import com.isa.entity.Guest;
import com.isa.exceptions.DatabaseDuplicateException;
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
	public List<Friends> getUsersFriends(String userEmail) {
		return friendsRepository.findUsersFriends(userEmail);
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
		f.setConfirmedFriendship(true);
		return friendsRepository.save(f);
	}
}