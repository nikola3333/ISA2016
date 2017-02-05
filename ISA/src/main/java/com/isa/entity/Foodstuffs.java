package com.isa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Foodstuffs {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "FOODSTUFFS_ID")
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
