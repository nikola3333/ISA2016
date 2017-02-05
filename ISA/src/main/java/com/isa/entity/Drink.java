package com.isa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


@Entity
public class Drink {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DRINK_ID")
	private Long id;
	
	@Column
	private String name;

	@Column
	private String text;

	@Column
	private Integer price;

	@Column
	private Integer amount;

}
