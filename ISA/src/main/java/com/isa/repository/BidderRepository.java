package com.isa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isa.entity.Bidder;


public interface BidderRepository extends PagingAndSortingRepository<Bidder,Long> {

	
	@Query("select bd from Seller bd where bd.email = :email")
	public Bidder findByEmail(@Param("email")String email);
}
