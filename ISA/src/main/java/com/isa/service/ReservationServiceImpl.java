package com.isa.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isa.entity.Guest;
import com.isa.entity.Reservation;
import com.isa.repository.ReservationRepository;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService{

	@Autowired
	private ReservationRepository reservationRepository;
	
	@Override
	public List<Reservation> findAll() {
		// TODO Auto-generated method stub
		return (List<Reservation>) reservationRepository.findAll();
	}

	@Override
	public Reservation findOne(Long id) {
		// TODO Auto-generated method stub
		return reservationRepository.findOne(id);
	}

	@Override
	public Reservation save(Reservation r,Guest g) {
		if(r.getGuests() == null)
			r.setGuests(new ArrayList<Guest>());
		r.getGuests().add(g);
		return reservationRepository.save(r);
	}

	@Override
	public void delete(Reservation r) {
		// TODO Auto-generated method stub
		reservationRepository.delete(r);
	}

}
