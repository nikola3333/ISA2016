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

import com.isa.entity.Reservation;
import com.isa.entity.Table;
import com.isa.repository.TableRepository;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

	
	@Autowired
	private TableRepository tableRepository;
	@Autowired
	HttpSession session;
	
	@RequestMapping(value = "/{tableId}" , method = RequestMethod.GET)
	public boolean checkIfReserved(@PathVariable Long tableId){
		Date reservationTime = (Date)session.getAttribute("reservationTime");
		Date stayTime = (Date) session.getAttribute("stayTime");
		Table t = tableRepository.findOne(tableId);
		boolean status = false;
		for(Reservation r : t.getReservations()){
			if((r.getDate().before(reservationTime) && r.getStay().before(reservationTime))
					|| (r.getDate().after(reservationTime) && r.getStay().after(reservationTime) && r.getDate().after(stayTime))){
				continue;
			}
			else{
				status =  true;
			}
		}
		return status;
	}
	
	@RequestMapping(method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
	public Date sendDate(@RequestBody ArrayList<Date> dates){
		Calendar cal = Calendar.getInstance();
		cal.setTime(dates.get(0));
		Calendar timeC = Calendar.getInstance();
		timeC.setTime(dates.get(1));
		
		timeC.set(cal.get(Calendar.YEAR),cal.get(Calendar.MONTH), cal.get(Calendar.DATE));
		System.out.println("DATUM I VREME : " + cal.getTime().toString());
		System.out.println("TRAJANJE : " + timeC.getTime().toString());
		session.setAttribute("reservationTime", dates.get(0));
		session.setAttribute("stayTime", timeC.getTime());
		
		return timeC.getTime();
		
	}
}
