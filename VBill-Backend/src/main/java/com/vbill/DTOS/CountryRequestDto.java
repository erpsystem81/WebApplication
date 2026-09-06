package com.vbill.DTOS;

public class CountryRequestDto {

    private String countryName;
    private String phoneCode;
    private Integer isInactive;
    private Integer status;

    public CountryRequestDto() {
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getPhoneCode() {
        return phoneCode;
    }

    public void setPhoneCode(String phoneCode) {
        this.phoneCode = phoneCode;
    }

    public Integer getIsInactive() {
        return isInactive;
    }

    public void setIsInactive(Integer isInactive) {
        this.isInactive = isInactive;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}