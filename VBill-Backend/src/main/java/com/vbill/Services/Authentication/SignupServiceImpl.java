package com.vbill.Services.Authentication;


import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.Authentication.SignupRequestDTO;
import com.vbill.DTOS.Authentication.SignupResponseDTO;
import com.vbill.Models.Authentication.UserAccount;
import com.vbill.Repositories.Authentication.UserAccountRepo;

@Service
public class SignupServiceImpl implements SignupService {

    private final UserAccountRepo userAccountRepository;

    private final PasswordEncoder passwordEncoder;

    public SignupServiceImpl(
            UserAccountRepo userAccountRepository,
            PasswordEncoder passwordEncoder) {

        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SignupResponseDTO signup(
            SignupRequestDTO request) {

        // ─────────────────────────────────────
        // BASIC VALIDATION
        // ─────────────────────────────────────

        if (request == null) {
            throw new IllegalArgumentException(
                    "Signup request cannot be empty."
            );
        }

        if (isBlank(request.getFirstName())) {
            throw new IllegalArgumentException(
                    "First name is required."
            );
        }

        if (isBlank(request.getLastName())) {
            throw new IllegalArgumentException(
                    "Last name is required."
            );
        }

        if (isBlank(request.getEmail())) {
            throw new IllegalArgumentException(
                    "Email is required."
            );
        }

        if (isBlank(request.getMobileNumber())) {
            throw new IllegalArgumentException(
                    "Mobile number is required."
            );
        }

        if (isBlank(request.getPassword())) {
            throw new IllegalArgumentException(
                    "Password is required."
            );
        }

        if (isBlank(request.getConfirmPassword())) {
            throw new IllegalArgumentException(
                    "Confirm password is required."
            );
        }

        // ─────────────────────────────────────
        // NORMALIZE DATA
        // ─────────────────────────────────────

        String firstName =
                request.getFirstName().trim();

        String lastName =
                request.getLastName().trim();

        String email =
                request.getEmail().trim().toLowerCase();

        String mobileNumber =
                request.getMobileNumber()
                        .replaceAll("\\s+", "");

        String password =
                request.getPassword();

        String confirmPassword =
                request.getConfirmPassword();

        // ─────────────────────────────────────
        // EMAIL VALIDATION
        // ─────────────────────────────────────

        if (!email.matches(
                "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {

            throw new IllegalArgumentException(
                    "Enter a valid email address."
            );
        }

        // ─────────────────────────────────────
        // MOBILE VALIDATION
        // ─────────────────────────────────────

        if (!mobileNumber.matches("\\d{10}")) {

            throw new IllegalArgumentException(
                    "Enter a valid 10 digit mobile number."
            );
        }

        // ─────────────────────────────────────
        // PASSWORD VALIDATION
        // ─────────────────────────────────────

        if (password.length() < 8) {

            throw new IllegalArgumentException(
                    "Password must be at least 8 characters."
            );
        }

        // ─────────────────────────────────────
        // CONFIRM PASSWORD
        // ─────────────────────────────────────

        if (!password.equals(confirmPassword)) {

            throw new IllegalArgumentException(
                    "Passwords do not match."
            );
        }

        // ─────────────────────────────────────
        // DUPLICATE EMAIL
        // ─────────────────────────────────────

        if (userAccountRepository.existsByEmail(email)) {

            throw new IllegalArgumentException(
                    "Email address is already registered."
            );
        }

        // ─────────────────────────────────────
        // DUPLICATE MOBILE
        // ─────────────────────────────────────

        if (userAccountRepository
                .existsByMobileNumber(mobileNumber)) {

            throw new IllegalArgumentException(
                    "Mobile number is already registered."
            );
        }

        // ─────────────────────────────────────
        // CREATE USER
        // ─────────────────────────────────────

        UserAccount user =
                new UserAccount();

        user.setFirstName(firstName);

        user.setLastName(lastName);

        user.setEmail(email);

        user.setMobileNumber(mobileNumber);

        /*
         * NEVER save plain-text password.
         */
        user.setPassword(
                passwordEncoder.encode(password)
        );

        user.setIsActive(true);

        UserAccount savedUser =
                userAccountRepository.save(user);

        // ─────────────────────────────────────
        // RESPONSE
        // ─────────────────────────────────────

        SignupResponseDTO response =
                new SignupResponseDTO();

        response.setUserAccountId(
                savedUser.getUserAccountId()
        );

        response.setFirstName(
                savedUser.getFirstName()
        );

        response.setLastName(
                savedUser.getLastName()
        );

        response.setEmail(
                savedUser.getEmail()
        );

        response.setMobileNumber(
                savedUser.getMobileNumber()
        );

        response.setMessage(
                "Account created successfully."
        );

        return response;
    }

    // ─────────────────────────────────────────
    // HELPER
    // ─────────────────────────────────────────

    private boolean isBlank(String value) {

        return value == null ||
               value.trim().isEmpty();
    }
    
    public List<SignupResponseDTO> getAllUsers() {

        return userAccountRepository
                .findAll()
                .stream()
                .map(user -> {

                    SignupResponseDTO dto =
                            new SignupResponseDTO();

                    dto.setUserAccountId(user.getUserAccountId());
                    dto.setFirstName(user.getFirstName());
                    dto.setLastName(user.getLastName());
                    dto.setEmail(user.getEmail());
                    dto.setMobileNumber(user.getMobileNumber());
                    dto.setMessage("Login Successful");

                    return dto;

                })
                .toList();
    }
}