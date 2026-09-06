package com.vbill.Controllers.Authentication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.Authentication.LoginRequestDTO;
import com.vbill.DTOS.Authentication.LoginResponseDTO;
import com.vbill.Services.Authentication.LoginService;

@RestController
@RequestMapping({
    "/vbill/api/authentication",
    "/vbillpos/api/authentication"
})
@CrossOrigin
public class LoginController {

    private final LoginService loginService;

    public LoginController(
            LoginService loginService) {

        this.loginService =
                loginService;
    }

    // ─────────────────────────────────────────────
    // LOGIN
    // ─────────────────────────────────────────────

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDTO request) {

        try {

            LoginResponseDTO response =
                    loginService.login(request);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);

        }
        catch (IllegalArgumentException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        java.util.Map.of(
                            "success",
                            false,

                            "message",
                            ex.getMessage()
                        )
                    );
        }
        catch (Exception ex) {

            ex.printStackTrace();

            return ResponseEntity
                    .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                        java.util.Map.of(
                            "success",
                            false,

                            "message",
                            "Unable to process login."
                        )
                    );
        }
    }
}