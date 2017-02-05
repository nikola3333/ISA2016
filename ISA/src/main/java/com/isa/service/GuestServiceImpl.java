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

			return guestRepository.findByEmail(email);
	}



	@Override
	public Guest save(Guest guest) {
		return guestRepository.save(guest);
	}

	@Override
	public void delete(Guest guest) {	
		guestRepository.delete(guest.getId());
	}

	@Override
	public Guest findOne(Long id) {
		// TODO Auto-generated method stub
		return guestRepository.findOne(id);
	}

	@Override
	public void confirmRegistration(Long id) {
		Guest g = guestRepository.findOne(id);
		g.setConfirmedRegistration(true);
		guestRepository.save(g);
	}

}
