package com.skynetix.service;

import com.skynetix.domain.PaymentGateway;
import com.skynetix.domain.PaymentStatus;
import com.skynetix.domain.SubscriptionStatus;
import com.skynetix.exception.PaymentException;
import com.skynetix.modal.Subscription;
import com.skynetix.payload.response.PaymentInitiateResponse;

import java.util.List;

public interface SubscriptionService {

    // 🆕 Create a new subscription for a store
    PaymentInitiateResponse createSubscription(Long storeId,
                                               Long planId,
                                               PaymentGateway gateway,
                                               String transactionId
    ) throws PaymentException;

    // 🔄 Upgrade the current active subscription
    PaymentInitiateResponse upgradeSubscription(Long storeId,
                                     Long planId,
                                     PaymentGateway gateway, String transactionId) throws PaymentException;

    // ✅ Activate subscription (after payment success)
    Subscription activateSubscription(Long subscriptionId);

    // 🚫 Cancel a subscription manually
    Subscription cancelSubscription(Long subscriptionId);

    // ⏳ Expire subscriptions that passed end date
    void expirePastSubscriptions();

    // 🧾 Update payment status (after webhook or manual)
    Subscription updatePaymentStatus(Long subscriptionId, PaymentStatus status);

    // 📋 🔍 Get all or filtered subscriptions of a store (if status provided)
    List<Subscription> getSubscriptionsByStore(Long storeId, SubscriptionStatus status); // combine active + history

    // 📦 📍 Get all or filtered subscriptions (for admin)
    List<Subscription> getAllSubscriptions(SubscriptionStatus status); // null status = all

    // 📅 Get subscriptions expiring in next X days
    List<Subscription> getExpiringSubscriptionsWithin(int days);

    // 📈 Count subscriptions by status
    Long countByStatus(SubscriptionStatus status);
}
