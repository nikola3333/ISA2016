package com.isa.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.isa.entity.User;

@Service
public class MessageService {

	@Autowired
	JavaMailSender javaMailSender;

	public void sendMessage(User user){
		SimpleMailMessage mail = new SimpleMailMessage();//spring.mail.properties.mail.smtp.ssl.trust = smtp.gmail.com
		mail.setTo(user.getEmail());
		mail.setFrom("restaurant.reservation.team@gmail.com");
		mail.setSubject("Activation link");
		Random rand = new Random();
		int  n = rand.nextInt(10000) + 99999;
		String code = Integer.toString(n);
		String idString = Long.toString(user.getId());
		code += idString;
		mail.setText("Please click on link to confirm your registration: http://localhost:8080/guests/confirmation/" + code);//od prvih pet cifara random br, ostale id quest-a
		javaMailSender.send(mail);
	}
}
