package com.isa.service;

import java.util.List;

import com.isa.entity.Guest;
import com.isa.entity.Reservation;

public interface ReservationService {

	public List<Reservation> findAll();
	public Reservation findOne(Long id);
	public Reservation save(Reservation r,Guest g);
	public void delete(Reservation r);
	public Reservation addToInvited(Long reservationId, Guest g);
	public Reservation acceptInvitation(Long reservationId,Guest g);
	public Reservation declineInvitation(Long reservationId,Guest g);
}
