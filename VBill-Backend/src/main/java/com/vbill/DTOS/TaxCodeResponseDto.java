package com.vbill.DTOS;

public class TaxCodeResponseDto {

    private Integer taxCodeId;
    private String taxCodeName;
    private String taxCodeRate;
    private String taxType;
    private Integer status;
    private Integer isInactive;

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

    public String getTaxCodeRate() {
        return taxCodeRate;
    }

    public void setTaxCodeRate(String taxCodeRate) {
        this.taxCodeRate = taxCodeRate;
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

	public String getTaxType() {
		return taxType;
	}

	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
    
    
    
}