package com.skynetix.payload.dto;


import com.skynetix.domain.PaymentGateway;
import com.skynetix.domain.PaymentStatus;
import com.skynetix.domain.SubscriptionStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {

    private Long id;
    private Long storeId;
    private String storeName;
    private String planName;
    private LocalDate startDate;
    private LocalDate endDate;
    private SubscriptionStatus status;
    private PaymentStatus paymentStatus;
    private PaymentGateway paymentGateway;
    private String transactionId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
