package com.isa.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.isa.entity.CapoDiTuttiCappi;
import com.isa.entity.Guest;

public interface CapoService {

	List<CapoDiTuttiCappi> findAll();
	
	public CapoDiTuttiCappi findByEmail(String email);
	
	public CapoDiTuttiCappi findById(Long id);
	
	public CapoDiTuttiCappi save(CapoDiTuttiCappi guest);
	
	public void delete(CapoDiTuttiCappi guest);
}
