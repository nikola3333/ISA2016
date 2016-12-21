package com.isa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isa.entity.User;
import com.isa.repository.BartenderRepository;
import com.isa.repository.CookRepository;
import com.isa.repository.GuestRepository;
import com.isa.repository.RestaurantManagerRepository;
import com.isa.repository.SellerRepository;
import com.isa.repository.SystemManagerRepository;
import com.isa.repository.WaiterRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private GuestRepository guestRepository;
	
	@Autowired
	private BartenderRepository bartenderRepository;
	@Autowired
	private CookRepository cookRepository;
	@Autowired
	private RestaurantManagerRepository restaurantManagerRepository;
	@Autowired
	private SellerRepository sellerRepository;
	@Autowired
	private SystemManagerRepository systemManagerRepository;
	@Autowired
	private WaiterRepository waiterRepository;
	
	@Override
	public User findUserByEmail(String email, String password) {
		
		if(bartenderRepository.findByEmail(email) != null && bartenderRepository.findByEmail(email).getPassword().equals(password))
			return bartenderRepository.findByEmail(email);
		
		else if(cookRepository.findByEmail(email) != null && cookRepository.findByEmail(email).getPassword().equals(password))
			return cookRepository.findByEmail(email);
		
		else if(restaurantManagerRepository.findByEmail(email) != null && restaurantManagerRepository.findByEmail(email).getPassword().equals(password))
			return restaurantManagerRepository.findByEmail(email);
		
		else if(sellerRepository.findByEmail(email) != null && sellerRepository.findByEmail(email).getPassword().equals(password))
			return sellerRepository.findByEmail(email);
		
		else if(systemManagerRepository.findByEmail(email) != null && systemManagerRepository.findByEmail(email).getPassword().equals(password))
			return systemManagerRepository.findByEmail(email);
		
		else if(waiterRepository.findByEmail(email) != null && waiterRepository.findByEmail(email).getPassword().equals(password))
			return waiterRepository.findByEmail(email);
		
		else if(guestRepository.findByEmail(email) != null && guestRepository.findByEmail(email).getPassword().equals(password))
			return guestRepository.findByEmail(email);
		
		else return null;
	}

}
