package com.vbill.Controllers.Authentication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.Authentication.SignupRequestDTO;
import com.vbill.DTOS.Authentication.SignupResponseDTO;
import com.vbill.Services.Authentication.SignupServiceImpl;

@RestController
@RequestMapping({"/vbill/api/authentication", "/vbillpos/api/authentication"})
@CrossOrigin
public class SignupController {

    private final SignupServiceImpl SignupServiceImpl;

    public SignupController(SignupServiceImpl SignupServiceImpl) {

        this.SignupServiceImpl = SignupServiceImpl;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody SignupRequestDTO request) {

        try {

            SignupResponseDTO response =
            		SignupServiceImpl.signup(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (IllegalArgumentException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        java.util.Map.of(
                            "message",
                            ex.getMessage()
                        )
                    );

        } catch (Exception ex) {

            return ResponseEntity
                    .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                        java.util.Map.of(
                            "message",
                            "Unable to create account."
                        )
                    );
        }
    }
    
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUsers() {

        try {

            return ResponseEntity
                    .ok(
                        SignupServiceImpl.getAllUsers()
                    );

        } catch (Exception ex) {

            return ResponseEntity
                    .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                        java.util.Map.of(
                            "message",
                            "Unable to fetch users."
                        )
                    );
        }
    }
}