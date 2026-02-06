package com.skynetix.service;

import com.skynetix.exception.UserException;
import com.skynetix.payload.dto.UserDTO;
import com.skynetix.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse login(String username, String password) throws UserException;
    AuthResponse signup(UserDTO req) throws UserException;

    void createPasswordResetToken(String email) throws UserException;
    void resetPassword(String token, String newPassword);
}
