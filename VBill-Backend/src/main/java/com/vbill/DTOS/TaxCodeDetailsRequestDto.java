package com.vbill.DTOS;

import java.math.BigDecimal;

public class TaxCodeDetailsRequestDto {

    private String taxComponent;
    private BigDecimal taxRate;
    private Integer taxCodeId;
    private Integer status;
    private Integer isInactive;

    public String getTaxComponent() {
        return taxComponent;
    }

    public void setTaxComponent(String taxComponent) {
        this.taxComponent = taxComponent;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public Integer getTaxCodeId() {
        return taxCodeId;
    }

    public void setTaxCodeId(Integer taxCodeId) {
        this.taxCodeId = taxCodeId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getIsInactive() {
        return isInactive;
    }

    public void setIsInactive(Integer isInactive) {
        this.isInactive = isInactive;
    }
}