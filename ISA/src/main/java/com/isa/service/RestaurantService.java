package com.isa.service;

import java.util.List;

import com.isa.entity.Restaurant;

public interface RestaurantService {

	public List<Restaurant> findAll();
	public Restaurant findOne(Long id);
	public Restaurant save(Restaurant r);
	
	public void delete(Restaurant r);
	
}
