package com.isa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.isa.entity.Bidder;

public interface BidderRepository extends PagingAndSortingRepository<Bidder,Long> {

	public Bidder findByEmail(String email);
}
