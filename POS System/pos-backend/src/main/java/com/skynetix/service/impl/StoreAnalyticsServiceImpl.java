package com.skynetix.service.impl;

import com.skynetix.domain.UserRole;
import com.skynetix.modal.Order;
import com.skynetix.modal.User;
import com.skynetix.payload.StoreAnalysis.*;
import com.skynetix.payload.dto.UserDTO;
import com.skynetix.repository.*;
import com.skynetix.service.StoreAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreAnalyticsServiceImpl implements StoreAnalyticsService {

    private final BranchRepository branchRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final RefundRepository refundRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Override
    public StoreOverviewDTO getStoreOverview(Long storeAdminId) {
        List<UserRole> roles = new ArrayList<>();
        roles.add(UserRole.ROLE_STORE_MANAGER);
        roles.add(UserRole.ROLE_CUSTOMER);
        roles.add(UserRole.ROLE_BRANCH_CASHIER);
        roles.add(UserRole.ROLE_BRANCH_MANAGER);

        return StoreOverviewDTO.builder()
                .totalBranches(branchRepository.countByStoreAdminId(storeAdminId))
                .totalSales(orderRepository.sumTotalSalesByStoreAdmin(storeAdminId).orElse(0.0))
                .totalOrders(orderRepository.countByStoreAdminId(storeAdminId))
                .totalEmployees(userRepository.countByStoreAdminIdAndRoles(storeAdminId, roles))
                .totalCustomers(customerRepository.countByStoreAdminId(storeAdminId))
                .totalRefunds(refundRepository.countByStoreAdminId(storeAdminId))
                .totalProducts(productRepository.countByStoreAdminId(storeAdminId))
                // .topBranchName(branchRepository.findTopBranchBySales(storeAdminId))
                .build();
    }

    @Override
    public TimeSeriesDataDTO getSalesTrends(Long storeAdminId, String period) {
        return null; // TODO
    }

    @Override
    public List<TimeSeriesPointDTO> getMonthlySalesGraph(Long storeAdminId) {
        LocalDateTime end = LocalDateTime.now();
        LocalDateTime start = end.minusDays(365);

        List<Order> orders = orderRepository.findAllByStoreAdminAndCreatedAtBetween(storeAdminId, start, end);

        Map<YearMonth, Double> grouped = orders.stream()
                .collect(Collectors.groupingBy(
                        order -> YearMonth.from(order.getCreatedAt()),
                        Collectors.summingDouble(order ->
                                order.getTotalAmount() != null ? order.getTotalAmount().doubleValue() : 0.0
                        )
                ));

        return grouped.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> new TimeSeriesPointDTO(
                        entry.getKey().atDay(1).atStartOfDay(),
                        entry.getValue()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<TimeSeriesPointDTO> getDailySalesGraph(Long storeAdminId) {
        LocalDateTime end = LocalDateTime.now();
        LocalDateTime start = end.minusDays(6);
        return orderRepository.getDailySales(storeAdminId, start, end);
    }

    @Override
    public List<CategorySalesDTO> getSalesByCategory(Long storeAdminId) {
        return productRepository.getSalesGroupedByCategory(storeAdminId);
    }

    @Override
    public List<PaymentInsightDTO> getSalesByPaymentMethod(Long storeAdminId) {
        return orderRepository.getSalesByPaymentMethod(storeAdminId);
    }

    @Override
    public List<BranchSalesDTO> getSalesByBranch(Long storeAdminId) {
        return orderRepository.getSalesByBranch(storeAdminId);
    }

    @Override
    public List<PaymentInsightDTO> getPaymentBreakdown(Long storeAdminId) {
        return orderRepository.getSalesByPaymentMethod(storeAdminId);
    }

    @Override
    public BranchPerformanceDTO getBranchPerformance(Long storeAdminId) {
        return BranchPerformanceDTO.builder()
                .branchSales(orderRepository.getSalesByBranch(storeAdminId))
                .newBranchesThisMonth(branchRepository.countNewBranchesThisMonth(storeAdminId))
                // .topBranch(branchRepository.findTopBranchBySales(storeAdminId))
                .build();
    }

    @Override
    public StoreAlertDTO getStoreAlerts(Long storeAdminId) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        List<UserDTO> inactiveCashiers = userRepository
                .findInactiveCashiers(storeAdminId, sevenDaysAgo, UserRole.ROLE_BRANCH_CASHIER)
                .stream()
                .map(this::toUserDTO)
                .toList();

        return StoreAlertDTO.builder()
                .lowStockAlerts(productRepository.findLowStockProducts(storeAdminId))
                .noSalesToday(branchRepository.findBranchesWithNoSalesToday(storeAdminId))
                .refundSpikeAlerts(refundRepository.findRefundSpikes(storeAdminId))
                .inactiveCashiers(inactiveCashiers)
                .build();
    }

    // 🔁 Entity -> DTO mapper aligned with your UserDTO
    private UserDTO toUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName(), // adjust if different in your User entity
                user.getRole(),
                user.getBranch() != null ? user.getBranch().getName() : null,
                user.getLastLogin() // or getLastActiveAt() if your field name differs
        );
    }
}
