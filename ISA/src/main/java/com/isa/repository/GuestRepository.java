package com.isa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.isa.entity.Guest;

public interface GuestRepository extends CrudRepository<Guest, Long>{
	
	@Query("select g from Guest g where g.email = :email")
	public Guest findByEmail(@Param("email")String email);
	


}
