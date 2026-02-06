package com.skynetix.controller;


import com.skynetix.exception.UserException;
import com.skynetix.payload.dto.UserDTO;
import com.skynetix.payload.request.ForgotPasswordRequest;
import com.skynetix.payload.request.LoginDto;
import com.skynetix.payload.request.ResetPasswordRequest;
import com.skynetix.payload.response.ApiResponse;
import com.skynetix.payload.response.ApiResponseBody;

import com.skynetix.payload.response.AuthResponse;

import com.skynetix.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;



    @PostMapping("/signup")
    public ResponseEntity<ApiResponseBody<AuthResponse>> signupHandler(
            @RequestBody @Valid UserDTO req) throws UserException {


        AuthResponse response=authService.signup(req);


        return ResponseEntity.ok(new ApiResponseBody<>(true,
                "User created successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseBody<AuthResponse>> loginHandler(
            @RequestBody LoginDto req) throws UserException {

        AuthResponse response=authService.login(req.getEmail(), req.getPassword());

        return ResponseEntity.ok(new ApiResponseBody<>(
                true,
                "User logged in successfully",
                response));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(
            @RequestBody ForgotPasswordRequest request
    ) throws UserException {

        authService.createPasswordResetToken(request.getEmail());

        ApiResponse res= new ApiResponse(
                "A Reset link was sent to your email."
        );
        return ResponseEntity.ok(res);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestBody ResetPasswordRequest request) {
         authService.resetPassword(request.getToken(), request.getPassword());
        ApiResponse res= new ApiResponse(
                "Password reset successful"
        );
        return ResponseEntity.ok(res);
    }


}
