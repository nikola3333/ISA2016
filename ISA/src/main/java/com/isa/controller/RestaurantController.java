package com.isa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.isa.entity.Restaurant;
import com.isa.service.RestaurantService;

@RestController
@RequestMapping(value = "/restaurants")
public class RestaurantController {

	@Autowired
	private RestaurantService restaurantService;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Restaurant> findAll(){
		return restaurantService.findAll();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Restaurant findOnde(@PathVariable Long id){
		return restaurantService.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Restaurant save(@RequestBody Restaurant r){
		return restaurantService.save(r);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestBody Restaurant r){
		restaurantService.delete(r);
	}
}
