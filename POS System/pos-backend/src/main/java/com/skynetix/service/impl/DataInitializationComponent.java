package com.skynetix.service.impl;

import com.skynetix.domain.UserRole;
import com.skynetix.modal.User;
import com.skynetix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;



    @Override
    public void run(String... args) {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminUsername = "codewithskynetix@gmail.com";

        if (userRepository.findByEmail(adminUsername)==null) {
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("codewithskynetix"));
            adminUser.setFullName("skynetix");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(UserRole.ROLE_ADMIN);

            User admin=userRepository.save(adminUser);
        }
    }
}
