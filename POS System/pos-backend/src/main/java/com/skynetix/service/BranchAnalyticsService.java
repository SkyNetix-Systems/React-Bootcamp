package com.skynetix.service;

import com.skynetix.modal.PaymentSummary;
import com.skynetix.payload.dto.*;

import java.time.LocalDate;
import java.util.List;

public interface BranchAnalyticsService {
    List<DailySalesDTO> getDailySalesChart(Long branchId, int days);
    List<ProductPerformanceDTO> getTopProductsByQuantityWithPercentage(Long branchId);
    List<CashierPerformanceDTO> getTopCashierPerformanceByOrders(Long branchId);
    List<CategorySalesDTO> getCategoryWiseSalesBreakdown(Long branchId,
                                                         LocalDate date);

    BranchDashboardOverviewDTO getBranchOverview(Long branchId);
    List<PaymentSummary> getPaymentMethodBreakdown(Long branchId, LocalDate date);



}
