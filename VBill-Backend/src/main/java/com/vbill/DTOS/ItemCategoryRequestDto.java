package com.vbill.DTOS;

public class ItemCategoryRequestDto {

    private String categoryName;
    private Integer parentCategoryId;
    private Integer status;
    private Integer isInactive;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(Integer parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
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