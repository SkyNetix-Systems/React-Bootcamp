package com.skynetix.payload.StoreAnalysis;

import com.skynetix.payload.dto.BranchDTO;
import com.skynetix.payload.dto.ProductDTO;
import com.skynetix.payload.dto.RefundDTO;
import com.skynetix.payload.dto.UserDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StoreAlertDTO {
    private List<ProductDTO> lowStockAlerts;
    private List<BranchDTO> noSalesToday;
    private List<RefundDTO> refundSpikeAlerts;
    private List<UserDTO> inactiveCashiers;
}

