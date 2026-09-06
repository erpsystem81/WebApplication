package com.vbill.DTOS;

public class TaxTypeResponseDto {

    private Integer taxTypeId;
    private String taxTypeName;
    private String taxTypeCode;
    private Integer isSplitApplicable;
    private Integer status;

    public Integer getTaxTypeId() {
        return taxTypeId;
    }

    public void setTaxTypeId(Integer taxTypeId) {
        this.taxTypeId = taxTypeId;
    }

    public String getTaxTypeName() {
        return taxTypeName;
    }

    public void setTaxTypeName(String taxTypeName) {
        this.taxTypeName = taxTypeName;
    }

    public String getTaxTypeCode() {
        return taxTypeCode;
    }

    public void setTaxTypeCode(String taxTypeCode) {
        this.taxTypeCode = taxTypeCode;
    }

    public Integer getIsSplitApplicable() {
        return isSplitApplicable;
    }

    public void setIsSplitApplicable(Integer isSplitApplicable) {
        this.isSplitApplicable = isSplitApplicable;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}