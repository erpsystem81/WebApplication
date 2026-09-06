package com.vbill.Services.Authentication;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.vbill.Config.JwtService;
import com.vbill.DTOS.Authentication.LoginRequestDTO;
import com.vbill.DTOS.Authentication.LoginResponseDTO;
import com.vbill.Models.Authentication.UserAccount;
import com.vbill.Repositories.Authentication.UserAccountRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class LoginServiceImpl
        implements LoginService {

	private final UserAccountRepo userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final Map<String, String> otpStore =
            new ConcurrentHashMap<>();

    public LoginServiceImpl(
            UserAccountRepo userAccountRepository,
            PasswordEncoder passwordEncoder,JwtService jwtService) {

        this.userAccountRepository =
                userAccountRepository;

        this.passwordEncoder =
                passwordEncoder;
        this.jwtService =
                jwtService;
    }


    // ─────────────────────────────────────────────
    // LOGIN
    // ─────────────────────────────────────────────

    @Override
    public LoginResponseDTO login(
            LoginRequestDTO request) {

        if (request == null) {

            throw new IllegalArgumentException(
                    "Login request is required."
            );
        }

        String loginType =
                request.getLoginType();

        if (loginType == null ||
                loginType.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Login type is required."
            );
        }

        loginType =
                loginType.trim().toUpperCase();

        // ─────────────────────────────────────
        // EMAIL + PASSWORD
        // ─────────────────────────────────────

        if ("EMAIL".equals(loginType)) {

            return loginWithEmail(request);
        }

        // ─────────────────────────────────────
        // MOBILE + OTP
        // ─────────────────────────────────────

        if ("MOBILE".equals(loginType)) {

            return loginWithMobile(request);
        }

        throw new IllegalArgumentException(
                "Invalid login type. Use EMAIL or MOBILE."
        );
    }

    // ─────────────────────────────────────────────
    // EMAIL LOGIN
    // ─────────────────────────────────────────────

    private LoginResponseDTO loginWithEmail(
            LoginRequestDTO request) {

        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required."
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().isEmpty()) {

            throw new IllegalArgumentException(
                    "Password is required."
            );
        }

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        Optional<UserAccount> optionalUser =
                userAccountRepository
                        .findByEmail(email);

        if (optionalUser.isEmpty()) {

            throw new IllegalArgumentException(
                    "Invalid email or password."
            );
        }

        UserAccount user =
                optionalUser.get();

        if (!Boolean.TRUE.equals(
                user.getIsActive())) {

            throw new IllegalArgumentException(
                    "Your account is inactive."
            );
        }

     // ─────────────────────────────────────
     // PASSWORD CHECK
     // ─────────────────────────────────────

     if (!passwordEncoder.matches(
             request.getPassword(),
             user.getPassword())) {

         throw new IllegalArgumentException(
                 "Invalid email or password."
         );
     }

        return createLoginResponse(
                user,
                "Email login successful.",
                "EMAIL"
        );
    }

    // ─────────────────────────────────────────────
    // MOBILE LOGIN
    // ─────────────────────────────────────────────

    private LoginResponseDTO loginWithMobile(
            LoginRequestDTO request) {

        if (request.getMobileNumber() == null ||
                request.getMobileNumber()
                        .trim()
                        .isEmpty()) {

            throw new IllegalArgumentException(
                    "Mobile number is required."
            );
        }

        String mobileNumber =
                request.getMobileNumber()
                        .trim();

        Optional<UserAccount> optionalUser =
                userAccountRepository
                        .findByMobileNumber(
                                mobileNumber
                        );

        if (optionalUser.isEmpty()) {

            throw new IllegalArgumentException(
                    "Mobile number is not registered."
            );
        }

        UserAccount user =
                optionalUser.get();

        // ─────────────────────────────────────
        // ACTIVE CHECK
        // ─────────────────────────────────────

        if (!Boolean.TRUE.equals(
                user.getIsActive())) {

            throw new IllegalArgumentException(
                    "Your account is inactive."
            );
        }

        /*
         * If OTP is provided,
         * verify it.
         */
        if (request.getOtp() != null &&
                !request.getOtp()
                        .trim()
                        .isEmpty()) {

            return verifyMobileOTP(
                    user,
                    request.getOtp()
            );
        }

        /*
         * Otherwise generate OTP.
         */
        return sendMobileOTP(
                user
        );
    }

    // ─────────────────────────────────────────────
    // SEND OTP
    // ─────────────────────────────────────────────

    private LoginResponseDTO sendMobileOTP(
            UserAccount user) {

        String otp =
                generateOTP();

        otpStore.put(
                user.getMobileNumber(),
                otp
        );

        /*
         * TEMPORARY
         *
         * For development/testing only.
         * Later this OTP will be sent through
         * SMS service.
         */
        System.out.println(
                "OTP for "
                + user.getMobileNumber()
                + " = "
                + otp
        );

        LoginResponseDTO response =
                new LoginResponseDTO(
                        true,
                        "OTP sent successfully."
                );

        response.setLoginType("MOBILE");

        response.setUserAccountId(
                user.getUserAccountId()
        );

        response.setMobileNumber(
                user.getMobileNumber()
        );

        return response;
    }

    // ─────────────────────────────────────────────
    // VERIFY OTP
    // ─────────────────────────────────────────────

    private LoginResponseDTO verifyMobileOTP(
            UserAccount user,
            String otp) {

        String storedOTP =
                otpStore.get(
                        user.getMobileNumber()
                );

        if (storedOTP == null) {

            throw new IllegalArgumentException(
                    "OTP expired or not found. Please request a new OTP."
            );
        }

        if (!storedOTP.equals(
                otp.trim())) {

            throw new IllegalArgumentException(
                    "Invalid OTP."
            );
        }

        /*
         * OTP successfully verified.
         *
         * Remove it so it cannot be reused.
         */
        otpStore.remove(
                user.getMobileNumber()
        );

        return createLoginResponse(
                user,
                "Mobile login successful.",
                "MOBILE"
        );
    }

    // ─────────────────────────────────────────────
    // GENERATE OTP
    // ─────────────────────────────────────────────

    private String generateOTP() {

        SecureRandom random =
                new SecureRandom();

        int otp =
                100000 +
                random.nextInt(900000);

        return String.valueOf(otp);
    }

    // ─────────────────────────────────────────────
    // LOGIN RESPONSE
    // ─────────────────────────────────────────────

    private LoginResponseDTO createLoginResponse(
            UserAccount user,
            String message,
            String loginType) {

        LoginResponseDTO response =
                new LoginResponseDTO(
                        true,
                        message
                );

        response.setUserAccountId(
                user.getUserAccountId()
        );

        response.setFirstName(
                user.getFirstName()
        );

        response.setLastName(
                user.getLastName()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setMobileNumber(
                user.getMobileNumber()
        );

        response.setLoginType(
                loginType
        );

        // =========================================
        // GENERATE JWT TOKEN
        // =========================================

        String token = jwtService.generateToken(
                user.getUserAccountId(),
                user.getEmail()
        );

        response.setToken(token);

        return response;
    }
}