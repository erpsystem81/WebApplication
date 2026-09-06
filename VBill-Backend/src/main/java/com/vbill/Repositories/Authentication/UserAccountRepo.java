package com.vbill.Repositories.Authentication;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.Authentication.UserAccount;

public interface UserAccountRepo extends JpaRepository<UserAccount, Long> {

    boolean existsByEmail(String email);

    boolean existsByMobileNumber(String mobileNumber);
    
    Optional<UserAccount> findByEmail(String email);

    Optional<UserAccount> findByMobileNumber(String mobileNumber);

    Optional<UserAccount> findByEmailAndIsActive(
            String email,
            Boolean isActive
    );

    Optional<UserAccount> findByMobileNumberAndIsActive(
            String mobileNumber,
            Boolean isActive
    );
}
