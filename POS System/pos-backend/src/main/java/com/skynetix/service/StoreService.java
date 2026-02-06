package com.skynetix.service;


import com.skynetix.domain.StoreStatus;
import com.skynetix.exception.ResourceNotFoundException;
import com.skynetix.exception.UserException;
import com.skynetix.modal.Store;
import com.skynetix.modal.User;
import com.skynetix.payload.dto.StoreDTO;
import com.skynetix.payload.dto.UserDTO;

import java.util.List;

public interface StoreService {
    StoreDTO createStore(StoreDTO storeDto, User user);
    StoreDTO getStoreById(Long id) throws ResourceNotFoundException;
    List<StoreDTO> getAllStores(StoreStatus status);
    Store getStoreByAdminId() throws UserException;
    StoreDTO getStoreByEmployee() throws UserException;
    StoreDTO updateStore(Long id, StoreDTO storeDto) throws ResourceNotFoundException, UserException;
    void deleteStore() throws ResourceNotFoundException, UserException;
    UserDTO addEmployee(Long id, UserDTO userDto) throws UserException;
    List<UserDTO> getEmployeesByStore(Long storeId) throws UserException;

    StoreDTO moderateStore(Long storeId, StoreStatus action) throws ResourceNotFoundException;

}

