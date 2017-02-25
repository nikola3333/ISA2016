package com.isa.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

@Entity (name= "tables")
public class Table {

	
	private Long id;
	private Integer oznakaStola;
	private List<Reservation> reservations;
	
	
	public Table() {
		super();
	}

	public Table(Integer oznakaStola) {
		super();
		this.oznakaStola = oznakaStola;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TABLE_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@OneToMany
	@JoinTable(
			name = "TABLE_RESERVATIONS",
			joinColumns = @JoinColumn(name = "TABLE_ID"),
			inverseJoinColumns = @JoinColumn(name = "RESERVATION_ID"))
	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public Integer getOznakaStola() {
		return oznakaStola;
	}

	public void setOznakaStola(Integer oznakaStola) {
		this.oznakaStola = oznakaStola;
	}
	
	
}
