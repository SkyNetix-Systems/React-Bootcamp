package com.skynetix.repository;

import com.skynetix.domain.UserRole;
import com.skynetix.modal.User;

import com.skynetix.payload.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);
	Set<User> findByRole(UserRole role);
	List<User> findByBranchId(Long branchId);
	List<User>findByStoreId(Long storeId);
	List<User> findByStoreAndRoleIn(com.skynetix.modal.Store store, List<UserRole> roles);
	List<User> findByBranchAndRoleIn(com.skynetix.modal.Branch branch, List<UserRole> roles);

//	analysis
@Query("""
        SELECT COUNT(u)
        FROM User u
        WHERE u.id IN (
            SELECT s.storeAdmin.id FROM Store s WHERE s.storeAdmin.id = :storeAdminId
        )
        AND u.role IN (:roles)
    """)
int countByStoreAdminIdAndRoles(@Param("storeAdminId") Long storeAdminId,
								@Param("roles") List<UserRole> roles);

	@Query("""
    SELECT u
    FROM User u
    WHERE u.store.id = :storeAdminId
      AND u.role = :role
      AND u.lastLogin < :since
""")
	List<User> findInactiveCashiers(
			@Param("storeAdminId") Long storeAdminId,
			@Param("since") LocalDateTime since,
			@Param("role") UserRole role
	);




// WHERE u.lastLogin < :cutoffDate
//	@Query("""
//        SELECT u.fullName
//        FROM User u
//        Where u.branch.store.storeAdmin.id=:storeAdminId
//        AND u.role = com.skynetixetix.domain.UserRole.ROLE_BRANCH_CASHIER
//    """)
//	List<String> findInactiveCashiers(@Param("storeAdminId") Long storeAdminId,
//									  @Param("cutoffDate") LocalDateTime cutoffDate
//									  );


//	@Query("""
//    SELECT u FROM User u
//    WHERE u.store.id = :storeAdminId
//    AND u.role = 'ROLE_BRANCH_CASHIER'
//    AND (u.updatedAt IS NULL OR u.updatedAt < :cutoffDate)
//    """)
//	List<User> findInactiveCashiers(@Param("storeAdminId") Long storeAdminId,
//									@Param("cutoffDate") LocalDateTime cutoffDate);

}
