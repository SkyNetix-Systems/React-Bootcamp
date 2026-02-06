package com.skynetix.service;



import com.skynetix.payload.AdminAnalysis.DashboardSummaryDTO;
import com.skynetix.payload.AdminAnalysis.StoreRegistrationStatDTO;
import com.skynetix.payload.AdminAnalysis.StoreStatusDistributionDTO;


import java.util.List;

public interface AdminDashboardService {

    DashboardSummaryDTO getDashboardSummary();

    List<StoreRegistrationStatDTO> getLast7DayRegistrationStats();

    StoreStatusDistributionDTO getStoreStatusDistribution();
}
