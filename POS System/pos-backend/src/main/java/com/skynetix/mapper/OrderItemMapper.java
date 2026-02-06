package com.skynetix.mapper;

import com.skynetix.modal.OrderItem;
import com.skynetix.payload.dto.OrderItemDTO;

public class OrderItemMapper {

    public static OrderItemDTO toDto(OrderItem item) {
        if (item == null) return null;

        return OrderItemDTO.builder()
                .id(item.getId())
                .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .product(item.getProduct() != null ? ProductMapper.toDto(item.getProduct()) : null)
                .build();
    }
}
