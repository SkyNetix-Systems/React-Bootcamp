package com.skynetix.payload.dto;

import com.skynetix.domain.StoreStatus;
import com.skynetix.modal.StoreContact;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class StoreDTO {
    private Long id;
    private String brand;
    private Long storeAdminId;
    private UserDTO storeAdmin;
    private String storeType;
    private StoreStatus status;
    private String description;
    private StoreContact contact;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
