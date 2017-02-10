package com.isa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.isa.entity.Guest;

public interface GuestRepository extends CrudRepository<Guest, Long>{
	
	@Query("select g from Guest g where g.email = :email")
	public Guest findByEmail(@Param("email")String email);
	
	
/*	@Query("select g from Guest g where g.id not in(select f.requestResponder from Friends f where f.requestSender  in(select g from Guest g where g.id  = :id) ) and"
			+ " g.id not in(select f.requestSender from Friends f where f.requestResponder in(select g from Guest g where g.id = :id) )")*/
	
	@Query("select g from Guest g where g.id not in(select f.requestResponder.id from Friends f where f.requestSender.id  = :id ) and"
			+ " g.id not in(select f.requestSender.id from Friends f where f.requestResponder.id  = :id)")
	public List<Guest> findNoneFriends(@Param("id")Long id);
	
/*	@Query("select g from Guest g where"
			+ "(g.id not in (select f.requestResponder from Friends f where f.requestSender  in(select g from Guest g where g.id  = :id)) and"
			+ "  g.id not in(select f.requestSender from Friends f where f.requestResponder in(select g from Guest g where g.id = :id))) and"
			+ "(g.firstName like :condition or g.lastName like :condition)")*/
	
	@Query("select g from Guest g where"
			+ "(g.id not in (select f.requestResponder.id from Friends f where f.requestSender.id = :id) and"
			+ "  g.id not in(select f.requestSender.id from Friends f where f.requestResponder.id = :id)) and"
			+ "(g.firstName like :condition or g.lastName like :condition)")	
	public List<Guest> findNoneFriends(@Param("id")Long id,@Param("condition")String condition);

	
}
