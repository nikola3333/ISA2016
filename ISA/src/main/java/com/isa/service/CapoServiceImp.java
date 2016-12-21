package com.isa.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isa.entity.CapoDiTuttiCappi;
import com.isa.entity.Guest;
import com.isa.repository.CapoRepository;


@Service
@Transactional
public class CapoServiceImp implements CapoService
{

	private CapoRepository repository;
	
	@Autowired
	public CapoServiceImp(final CapoRepository repo) {
		repository = repo;
	}
	
	@Override
	public List<CapoDiTuttiCappi> findAll() {
		return (List<CapoDiTuttiCappi>) repository.findAll();
		
	}

	@Override
	public CapoDiTuttiCappi findByEmail(String email) {
		return repository.findByEmail(email);
	}

	@Override
	public CapoDiTuttiCappi findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public CapoDiTuttiCappi save(CapoDiTuttiCappi capo) {
		return repository.save(capo);
	}

	@Override
	public void delete(CapoDiTuttiCappi capo) {
		repository.delete(capo);
	}

}
