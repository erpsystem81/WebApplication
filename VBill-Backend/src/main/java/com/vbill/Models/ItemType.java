package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class ItemType {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_type_seq")
    @SequenceGenerator(
        name = "item_type_seq",
        sequenceName = "item_type_seq",
        allocationSize = 1
    )		
	private Integer item_type_id;
	
	private String item_type;
	private Integer is_inactive;
	private Integer status;
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
	public Integer getIs_inactive() {
		return is_inactive;
	}
	public void setIs_inactive(Integer is_inactive) {
		this.is_inactive = is_inactive;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
}
