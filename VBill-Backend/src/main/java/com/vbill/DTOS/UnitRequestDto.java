package com.vbill.DTOS;

public class UnitRequestDto {

    private String unitName;
    private String unitCode;
    private String unitType;

    private Boolean isBaseUnit;

    private Double conversionFactor;

    private Integer decimalPlaces;

    private Boolean allowFraction;

    private Integer status;

    private Integer isInactive;

    private Integer baseUnitId;

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getUnitType() {
        return unitType;
    }

    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }

    public Boolean getIsBaseUnit() {
        return isBaseUnit;
    }

    public void setIsBaseUnit(Boolean isBaseUnit) {
        this.isBaseUnit = isBaseUnit;
    }

    public Double getConversionFactor() {
        return conversionFactor;
    }

    public void setConversionFactor(Double conversionFactor) {
        this.conversionFactor = conversionFactor;
    }

    public Integer getDecimalPlaces() {
        return decimalPlaces;
    }

    public void setDecimalPlaces(Integer decimalPlaces) {
        this.decimalPlaces = decimalPlaces;
    }

    public Boolean getAllowFraction() {
        return allowFraction;
    }

    public void setAllowFraction(Boolean allowFraction) {
        this.allowFraction = allowFraction;
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

    public Integer getBaseUnitId() {
        return baseUnitId;
    }

    public void setBaseUnitId(Integer baseUnitId) {
        this.baseUnitId = baseUnitId;
    }
}