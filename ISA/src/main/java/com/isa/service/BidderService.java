package com.isa.service;

import java.util.List;

import com.isa.entity.Bidder;


public interface BidderService {

	List<Bidder> findAll();

	Bidder save(Bidder bidder);
    Bidder findOne(Long id);
	Bidder findOneWithMail(String mail);

	void delete(Long id);
}
