package com.skynetix.service;

import com.skynetix.domain.UserRole;
import com.skynetix.modal.User;
import com.skynetix.payload.dto.UserDTO;

import java.util.List;

public interface EmployeeService {
    UserDTO createStoreEmployee(UserDTO employee, Long storeId) throws Exception;
    User createBranchEmployee(User employee, Long branchId) throws Exception;
    User updateEmployee(Long employeeId, User employeeDetails) throws Exception;
    void deleteEmployee(Long employeeId) throws Exception;
    User findEmployeeById(Long employeeId) throws Exception;
    List<User> findStoreEmployees(Long storeId, UserRole role) throws Exception;
    List<User> findBranchEmployees(Long branchId, UserRole role) throws Exception;
}