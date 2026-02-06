package com.skynetix.service;

import com.skynetix.exception.PaymentException;
import com.skynetix.exception.UserException;
import com.skynetix.payload.dto.PaymentDTO;
import com.skynetix.payload.request.PaymentInitiateRequest;
import com.skynetix.payload.request.PaymentVerifyRequest;
import com.skynetix.payload.response.PaymentInitiateResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentService {
    /**
     * Initiate a new payment (creates order with payment gateway)
     */
    PaymentInitiateResponse initiatePayment(PaymentInitiateRequest request) throws PaymentException;

    /**
     * Verify payment after gateway callback
     */
    PaymentDTO verifyPayment(PaymentVerifyRequest request) throws PaymentException;


    /**
     * Get all payments (admin)
     */
    Page<PaymentDTO> getAllPayments(Pageable pageable) throws UserException;




}
