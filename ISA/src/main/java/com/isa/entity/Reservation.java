package com.isa.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Reservation {

	private Long id;
	private Restaurant restaurant;
	private List<Guest> guests;
	private Date date;
	private Double stay;
	
	
	public Reservation() {
		super();
	}

	public Reservation(Restaurant restaurant, Date date, Double stay) {
		super();
		this.restaurant = restaurant;
		this.date = date;
		this.stay = stay;
	}

	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn(name ="RESTAURANT_ID")
	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	@ManyToMany
	@JoinTable(name = "RESERVATION_GUEST",
		joinColumns = 
			@JoinColumn(name = "RESERVATION_ID"),
		inverseJoinColumns =
			@JoinColumn(name = "GUEST_ID")
			)
	public List<Guest> getGuests() {
		return guests;
	}

	public void setGuests(List<Guest> guests) {
		this.guests = guests;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getStay() {
		return stay;
	}

	public void setStay(Double stay) {
		this.stay = stay;
	}
	
	
	
	
}
