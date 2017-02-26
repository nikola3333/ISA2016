package com.isa.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.isa.entity.Guest;
import com.isa.entity.Reservation;
import com.isa.entity.Restaurant;
import com.isa.entity.Table;
import com.isa.entity.User;
import com.isa.repository.RestaurantRepository;
import com.isa.service.MessageService;
import com.isa.service.ReservationService;
import com.isa.service.TableService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

	@Autowired
	private ReservationService reservationService;
	@Autowired
	private TableService tableService;
	@Autowired
	private RestaurantRepository restaurantService;
	@Autowired
	HttpSession session;
	@Autowired
	private MessageService messageService;
	
	@RequestMapping(value = "/{tableId}" , method = RequestMethod.GET)
	public boolean checkIfReserved(@PathVariable Long tableId){
		Date reservationTime = (Date)session.getAttribute("reservationTime");
		Date stayTime = (Date) session.getAttribute("stayTime");
		
		return tableService.checkIfReserved(tableId, reservationTime, stayTime);
	}
	
	@RequestMapping(value = "/date",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
	public Date sendDate(@RequestBody ArrayList<Date> dates){
		Calendar cal = Calendar.getInstance();
		cal.setTime(dates.get(0));
		Calendar timeC = Calendar.getInstance();
		timeC.setTime(dates.get(1));
		timeC.set(cal.get(Calendar.YEAR),cal.get(Calendar.MONTH), cal.get(Calendar.DATE));
		session.setAttribute("reservationTime", dates.get(0));
		session.setAttribute("stayTime", timeC.getTime());
		return timeC.getTime();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Reservation confirmReservation(@RequestBody ArrayList<Table> tables){
		Long restaurantId = (Long) session.getAttribute("restaurant");
		Restaurant restaurant = restaurantService.findOne(restaurantId);
		Guest g = (Guest) session.getAttribute("user");
		Date reservationTime = (Date) session.getAttribute("reservationTime");
		Date stayTime = (Date) session.getAttribute("stayTime");
		
		Reservation r = new Reservation(restaurant, reservationTime, stayTime);
		Reservation rr = reservationService.save(r,g);

		
		for(Table t : tables){
			t.getReservations().add(rr);
			tableService.save(t);
		}
		return rr;
	}
	
	@RequestMapping(value = "/friend/{reservationId}",method = RequestMethod.POST)
	public void inviteFriend(@RequestBody Guest g,@PathVariable Long reservationId){
		User user = (User) session.getAttribute("user");
		messageService.sendInvitation(user, g, reservationId);
	}
}
