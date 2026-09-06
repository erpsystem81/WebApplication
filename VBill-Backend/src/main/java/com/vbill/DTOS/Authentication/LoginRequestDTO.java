package com.vbill.DTOS.Authentication;

public class LoginRequestDTO {

    private String loginType;

    private String email;

    private String mobileNumber;

    private String password;

    private String otp;

    // ─────────────────────────────────────────────
    // GETTERS AND SETTERS
    // ─────────────────────────────────────────────

    public String getLoginType() {
        return loginType;
    }

    public void setLoginType(String loginType) {
        this.loginType = loginType;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}