package com.isa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.isa.entity.Guest;
import com.isa.service.GuestService;

@RestController
@RequestMapping("/guests")
public class GuestController {

	@Autowired
	private GuestService guestService;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Guest> findAll(){
		return guestService.findAll();
	}
	

	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Guest findById(@PathVariable("id")Long id){
		return guestService.findById(id);
	}
}
