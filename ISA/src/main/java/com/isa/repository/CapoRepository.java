package com.isa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.isa.entity.CapoDiTuttiCappi;

@Repository
public interface CapoRepository extends PagingAndSortingRepository<CapoDiTuttiCappi,Long>{

	public CapoDiTuttiCappi findByEmail(String email);
}
