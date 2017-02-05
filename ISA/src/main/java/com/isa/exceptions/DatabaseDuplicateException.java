package com.isa.exceptions;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

public class DatabaseDuplicateException extends MySQLIntegrityConstraintViolationException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DatabaseDuplicateException() {
		super("User with entered username already exists");
	}
	
}
