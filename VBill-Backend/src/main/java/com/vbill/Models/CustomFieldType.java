package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class CustomFieldType {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cust_field_type_seq")
    @SequenceGenerator(
        name = "cust_field_type_seq",
        sequenceName = "cust_field_type_seq",
        allocationSize = 1
    )
	private Integer cust_field_type_id;
	
	private String name;
	private String is_inactive;
	private String status;
	public Integer getCust_field_type_id() {
		return cust_field_type_id;
	}
	public void setCust_field_type_id(Integer cust_field_type_id) {
		this.cust_field_type_id = cust_field_type_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIs_inactive() {
		return is_inactive;
	}
	public void setIs_inactive(String is_inactive) {
		this.is_inactive = is_inactive;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
