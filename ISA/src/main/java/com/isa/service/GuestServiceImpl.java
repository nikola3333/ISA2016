package com.isa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isa.entity.Guest;
import com.isa.repository.GuestRepository;

@Service
@Transactional
public class GuestServiceImpl implements GuestService{
	
	@Autowired
	private GuestRepository guestRepository;

	@Override
	public List<Guest> findAll() {
		
		return (List<Guest>) guestRepository.findAll();
	}

	@Override
	public Guest findByEmail(String email) {
		// TODO Auto-generated method stub
		Guest guest = guestRepository.findByEmail(email);
		if(guest != null)
			return guest;
		else 
			return null;
	}

	@Override
	public Guest findById(Long id) {
		// TODO Auto-generated method stub
		return guestRepository.findById(id);
	}

	@Override
	public Guest save(Guest guest) {
		// TODO Auto-generated method stub
		return guestRepository.save(guest);
	}

	@Override
	public void delete(Guest guest) {
		guestRepository.delete(guest);
	}

}
