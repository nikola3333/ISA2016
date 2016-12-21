package com.isa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Waiter extends User{
	
	private Long id;

	
	
	public Waiter() {
		super();
	}

	public Waiter(Long id) {
		super();
		this.id = id;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
