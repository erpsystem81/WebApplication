package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class CustomFieldValue {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cust_field_val_seq")
    @SequenceGenerator(
        name = "cust_field_val_seq",
        sequenceName = "cust_field_val_seq",
        allocationSize = 1
    )
	private Integer cust_field_val_id;
	private String name;
	private Integer is_inactive;
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "cust_field_id_fk", referencedColumnName = "cust_field_id")
	private CustomField cust_field;

	public Integer getCust_field_val_id() {
		return cust_field_val_id;
	}

	public void setCust_field_val_id(Integer cust_field_val_id) {
		this.cust_field_val_id = cust_field_val_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public CustomField getCust_field() {
		return cust_field;
	}

	public void setCust_field(CustomField cust_field) {
		this.cust_field = cust_field;
	}
	
	
}
