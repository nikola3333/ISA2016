package com.isa.service;

import java.util.List;

import com.isa.entity.Table;

public interface TableService {
	
	public List<Table> findAll();
	public Table findOne(Long id);
	public Table save(Table t);
	public void delete(Table t);
}
