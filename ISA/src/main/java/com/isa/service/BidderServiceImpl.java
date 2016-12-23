package com.isa.service;

import java.util.List;

import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isa.entity.Bidder;
import com.isa.repository.BidderRepository;



@Service
public class BidderServiceImpl implements BidderService {

	private final BidderRepository repository;
	@Autowired
	public BidderServiceImpl(final BidderRepository repository) {
		this.repository = repository;
	}

	public List<Bidder> findAll() {
		return Lists.newArrayList(repository.findAll());
	}

	@Override
	public Bidder save(Bidder bidder) {
		return repository.save(bidder);
	}

	@Override
	public Bidder findOne(Long id) {
		return repository.findOne(id);
	}

	@Override
	public void delete(Long id) {
		repository.delete(id);
	}

	@Override
	public Bidder findOneWithMail(String mail) {
		// TODO Auto-generated method stub
		return null;
	}
//OSTAVITI OVAKO, NE MOZE DA SE IZBACI ,DORADI POSLE
	
}
