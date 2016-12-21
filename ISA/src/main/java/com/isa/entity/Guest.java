package com.isa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Guest extends User {

	private boolean confirmedRegistration;
	private Long id;

	public Guest() {
		super();
	}

	public Guest(boolean confirmedRegistration, Long id) {
		super();
		this.confirmedRegistration = confirmedRegistration;
		this.id = id;
	}

	public boolean isConfirmedRegistration() {
		return confirmedRegistration;
	}

	public void setConfirmedRegistration(boolean confirmedRegistration) {
		this.confirmedRegistration = confirmedRegistration;
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
