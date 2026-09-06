package com.vbill.DTOS;

public class ItemResponseDto {

    private Integer itemId;
    private String itemName;
    private String barcode;
    private Double purchasePrice;
    private Double salePrice;
    private Double mrp;
    private String description;
    private Double minStock;
    private Boolean isTaxIncluded;
    private Boolean isBatchEnabled;
    private Integer status;
    private Integer isInactive;

    private Integer itemTypeId;
    private String itemTypeName;

    private Integer baseUnitId;
    private String baseUnitName;

    private Integer taxCodeId;
    private String taxCodeName;

    private Integer categoryId;
    private String categoryName;

    private Integer locationId;
    private String locationName;
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
	public Double getPurchasePrice() {
		return purchasePrice;
	}
	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Double getMrp() {
		return mrp;
	}
	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getMinStock() {
		return minStock;
	}
	public void setMinStock(Double minStock) {
		this.minStock = minStock;
	}
	public Boolean getIsTaxIncluded() {
		return isTaxIncluded;
	}
	public void setIsTaxIncluded(Boolean isTaxIncluded) {
		this.isTaxIncluded = isTaxIncluded;
	}
	public Boolean getIsBatchEnabled() {
		return isBatchEnabled;
	}
	public void setIsBatchEnabled(Boolean isBatchEnabled) {
		this.isBatchEnabled = isBatchEnabled;
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
	public Integer getItemTypeId() {
		return itemTypeId;
	}
	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}
	public String getItemTypeName() {
		return itemTypeName;
	}
	public void setItemTypeName(String itemTypeName) {
		this.itemTypeName = itemTypeName;
	}
	public Integer getBaseUnitId() {
		return baseUnitId;
	}
	public void setBaseUnitId(Integer baseUnitId) {
		this.baseUnitId = baseUnitId;
	}
	public String getBaseUnitName() {
		return baseUnitName;
	}
	public void setBaseUnitName(String baseUnitName) {
		this.baseUnitName = baseUnitName;
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
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Integer getLocationId() {
		return locationId;
	}
	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
	}
	public String getLocationName() {
		return locationName;
	}
	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

    // Generate Getters & Setters
    
}