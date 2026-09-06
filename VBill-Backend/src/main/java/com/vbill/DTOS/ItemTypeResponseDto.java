package com.vbill.DTOS;

public class ItemTypeResponseDto {

    private Integer item_type_id;
    private String item_type;
    private Integer status;
    private Integer is_inactive;

    public Integer getItem_type_id() {
        return item_type_id;
    }

    public void setItem_type_id(Integer item_type_id) {
        this.item_type_id = item_type_id;
    }

    public String getItem_type() {
        return item_type;
    }

    public void setItem_type(String item_type) {
        this.item_type = item_type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getIs_inactive() {
        return is_inactive;
    }

    public void setIs_inactive(Integer is_inactive) {
        this.is_inactive = is_inactive;
    }
}