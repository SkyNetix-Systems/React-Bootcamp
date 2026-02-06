package com.skynetix.service;


import com.skynetix.domain.UserRole;
import com.skynetix.exception.UserException;
import com.skynetix.modal.User;

import java.util.List;
import java.util.Set;
//import com.skynetix.payload.request.UpdateUserDto;


public interface UserService {
	User getUserByEmail(String email) throws UserException;
	User getUserFromJwtToken(String jwt) throws UserException;
	User getUserById(Long id) throws UserException;
	Set<User> getUserByRole(UserRole role) throws UserException;
	List<User> getUsers() throws UserException;
	User getCurrentUser() throws UserException;



//	User updateUser(UpdateUserDto updateData, User user);
//	String sendForgotPasswordOtp(String email) throws UserException, MessagingException;
//	User verifyForgotPasswordOtp(String otp, String updatedPassword) throws Exception;
}
