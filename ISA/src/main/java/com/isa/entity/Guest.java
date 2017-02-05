package com.isa.entity;

import javax.persistence.Entity;

@Entity
public class Guest extends User {

	private boolean confirmedRegistration;

	public Guest() {
		super();
	}

	public Guest(boolean confirmedRegistration) {
		super();
		this.confirmedRegistration = confirmedRegistration;
	}

	public boolean isConfirmedRegistration() {
		return confirmedRegistration;
	}

	public void setConfirmedRegistration(boolean confirmedRegistration) {
		this.confirmedRegistration = confirmedRegistration;
	}


}
