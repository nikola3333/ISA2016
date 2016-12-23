package com.isa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bidder extends User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BIDDER_ID")
	private Long id;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Bidder() {
		super();
	}

	public Bidder(Long id) {
		super();
		this.id = id;
	}
}
