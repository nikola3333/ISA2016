package com.isa.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isa.entity.Drink;
import com.isa.entity.Foodstuffs;
import com.isa.entity.Guest;
import com.isa.entity.GuestOrder;
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

	@Override
	public Reservation addToInvited(Long reservationId, Guest g) {
		//int i = 0;
		Reservation r = reservationRepository.findOne(reservationId);
		
		if(r.getInvitedFriends() == null)
			r.setInvitedFriends(new ArrayList<Guest>());
		if(r.getInvitedFriends().size() == r.getSeatNum()-1 ) throw new IllegalArgumentException("Can't invite more friends");
		r.getInvitedFriends().add(g);

		return reservationRepository.save(r);
	}

	@Override
	public Reservation acceptInvitation(Long reservationId, Guest g) {
		Reservation reservation = reservationRepository.findOne(reservationId);
		Guest guest = null;
		for(Guest gg : reservation.getInvitedFriends()){
			if(gg.getId().equals(g.getId())){
				guest = gg;
			}
		}
		if(guest != null){
			reservation.getGuests().add(guest);
			reservation.getInvitedFriends().remove(guest);
		}
		return reservationRepository.save(reservation);
	}
	
	@Override
	public Reservation declineInvitation(Long reservationId,Guest g){
		Reservation reservation = reservationRepository.findOne(reservationId);
		Guest guest = null;
		for(Guest gg : reservation.getInvitedFriends()){
			if(gg.getId().equals(g.getId())){
				guest = gg;
			}
		}
		if(guest != null)
			reservation.getInvitedFriends().remove(guest);
		return reservationRepository.save(reservation);		
	}

	@Override
	public Reservation addFood(Guest g, Long id, Foodstuffs item) {
		Reservation reservation = reservationRepository.findOne(id);
		if(reservation.getOrders() == null){
			reservation.setOrders(new ArrayList<GuestOrder>());
			GuestOrder order = new GuestOrder(g);
			order.getFoodstuffs().add(item);
			reservation.getOrders().add(order);
		}
			
		else{
			boolean find = false;
			for(GuestOrder o : reservation.getOrders()){
				if(o.getGuest().getId().equals(g.getId())){
					o.getFoodstuffs().add(item);
					find = true;
				}
			}
			if(!find){
				GuestOrder order = new GuestOrder(g);
				order.getFoodstuffs().add(item);
				reservation.getOrders().add(order);
			}
		}
		return reservationRepository.save(reservation);
	}

	@Override
	public Reservation addDrink(Guest g, Long id, Drink item) {
		Reservation reservation = reservationRepository.findOne(id);
		if(reservation.getOrders() == null){
			reservation.setOrders(new ArrayList<GuestOrder>());
			GuestOrder order = new GuestOrder(g);
			order.getDrinks().add(item);
			reservation.getOrders().add(order);
		}
			
		else{
			boolean find = false;
			for(GuestOrder o : reservation.getOrders()){
				if(o.getGuest().getId().equals(g.getId())){
					o.getDrinks().add(item);
					find = true;
				}
			}
			if(!find){
				GuestOrder order = new GuestOrder(g);
				order.getDrinks().add(item);
				reservation.getOrders().add(order);
			}
		}
		return reservationRepository.save(reservation);
	}

}
