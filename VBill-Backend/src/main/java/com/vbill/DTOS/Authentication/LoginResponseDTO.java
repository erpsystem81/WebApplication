package com.vbill.DTOS.Authentication;

public class LoginResponseDTO {

    private boolean success;

    private String message;

    private Long userAccountId;

    private String firstName;

    private String lastName;

    private String email;

    private String mobileNumber;

    private String loginType;

    private String token;


    // ─────────────────────────────────────────────
    // CONSTRUCTORS
    // ─────────────────────────────────────────────

    public LoginResponseDTO() {

    }

    public LoginResponseDTO(
            boolean success,
            String message) {

        this.success = success;
        this.message = message;
    }


    // ─────────────────────────────────────────────
    // GETTERS AND SETTERS
    // ─────────────────────────────────────────────

    public boolean isSuccess() {

        return success;
    }

    public void setSuccess(boolean success) {

        this.success = success;
    }

    public String getMessage() {

        return message;
    }

    public void setMessage(String message) {

        this.message = message;
    }

    public Long getUserAccountId() {

        return userAccountId;
    }

    public void setUserAccountId(Long userAccountId) {

        this.userAccountId = userAccountId;
    }

    public String getFirstName() {

        return firstName;
    }

    public void setFirstName(String firstName) {

        this.firstName = firstName;
    }

    public String getLastName() {

        return lastName;
    }

    public void setLastName(String lastName) {

        this.lastName = lastName;
    }

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getMobileNumber() {

        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {

        this.mobileNumber = mobileNumber;
    }

    public String getLoginType() {

        return loginType;
    }

    public void setLoginType(String loginType) {

        this.loginType = loginType;
    }

    public String getToken() {

        return token;
    }

    public void setToken(String token) {

        this.token = token;
    }
}