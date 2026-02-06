package com.skynetix.service.impl;

import com.skynetix.domain.OrderStatus;
import com.skynetix.exception.ResourceNotFoundException;
import com.skynetix.exception.UserException;
import com.skynetix.modal.Branch;
import com.skynetix.modal.Order;
import com.skynetix.modal.Refund;
import com.skynetix.modal.User;
import com.skynetix.payload.dto.RefundDTO;
import com.skynetix.repository.BranchRepository;
import com.skynetix.repository.OrderRepository;
import com.skynetix.repository.RefundRepository;
import com.skynetix.service.RefundService;
import com.skynetix.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

    private final RefundRepository refundRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final BranchRepository branchRepository;

    @Override
    @Transactional
    public Refund createRefund(RefundDTO refundDTO) throws UserException, ResourceNotFoundException {
        User currentCashier = userService.getCurrentUser();

        Order order = orderRepository.findById(refundDTO.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        Branch branch=branchRepository.findById(refundDTO.getBranchId()).orElseThrow(
                ()-> new EntityNotFoundException("branch not found")
        );

        Refund refund = new Refund();
        refund.setOrder(order);
        refund.setCashier(currentCashier);
        refund.setReason(refundDTO.getReason());
        refund.setAmount(order.getTotalAmount());
        refund.setCreatedAt(LocalDateTime.now());
        refund.setBranch(branch);


        Refund savedRefund=refundRepository.save(refund);
        order.setStatus(OrderStatus.REFUNDED);
        orderRepository.save(order);
        return savedRefund;
    }

    @Override
    public List<Refund> getAllRefunds() {
        return refundRepository.findAll();
    }

    @Override
    public List<Refund> getRefundsByCashier(Long cashierId) {
        return refundRepository.findByCashierId(cashierId);
    }

    @Override
    public List<Refund> getRefundsByShiftReport(Long shiftReportId) {
        return refundRepository.findByShiftReportId(shiftReportId);
    }

    @Override
    public List<Refund> getRefundsByCashierAndDateRange(Long cashierId, LocalDateTime from, LocalDateTime to) {
        return refundRepository.findByCashierIdAndCreatedAtBetween(cashierId, from, to);
    }

    @Override
    public List<Refund> getRefundsByBranch(Long branchId) {
        List<Refund> refunds= refundRepository.findByBranchId(branchId);
        return refunds;
    }

    @Override
    public Refund getRefundById(Long id) throws ResourceNotFoundException {
        return refundRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Refund not found"));
    }

    @Override
    public void deleteRefund(Long refundId) throws ResourceNotFoundException {
        if (!refundRepository.existsById(refundId)) {
            throw new ResourceNotFoundException("Refund not found");
        }
        refundRepository.deleteById(refundId);
    }


}
