package com.vbill.DTOS;

import java.math.BigDecimal;

public class TaxCodeDetailsResponseDto {

    private Integer taxComponentId;
    private String taxComponent;
    private BigDecimal taxRate;

    private Integer taxCodeId;
    private String taxCodeName;

    private Integer status;
    private Integer isInactive;

    public Integer getTaxComponentId() {
        return taxComponentId;
    }

    public void setTaxComponentId(Integer taxComponentId) {
        this.taxComponentId = taxComponentId;
    }

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

    public String getTaxCodeName() {
        return taxCodeName;
    }

    public void setTaxCodeName(String taxCodeName) {
        this.taxCodeName = taxCodeName;
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