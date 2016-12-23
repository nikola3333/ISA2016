package com.isa.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.isa.entity.CapoDiTuttiCapi;
import com.isa.entity.Guest;

public interface CapoService {

	List<CapoDiTuttiCapi> findAll();
	
	public CapoDiTuttiCapi findByEmail(String email);
	
	public CapoDiTuttiCapi findById(Long id);
	
	public CapoDiTuttiCapi save(CapoDiTuttiCapi guest);
	
	public void delete(CapoDiTuttiCapi guest);
}
