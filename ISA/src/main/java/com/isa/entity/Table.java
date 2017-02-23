package com.isa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity (name= "tables")
public class Table {

	
	private Long id;
	private Integer oznakaStola;
	
	
	
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

	public Integer getOznakaStola() {
		return oznakaStola;
	}

	public void setOznakaStola(Integer oznakaStola) {
		this.oznakaStola = oznakaStola;
	}
	
	
}
