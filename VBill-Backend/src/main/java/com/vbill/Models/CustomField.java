package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class CustomField {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cust_field_seq")
    @SequenceGenerator(
        name = "cust_field_seq",
        sequenceName = "cust_field_seq",
        allocationSize = 1
    )
	private Integer cust_field_id;
	
	private String name;
	private Integer is_inactive;
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "cust_field_type_id_fk", referencedColumnName = "cust_field_type_id")
	private CustomFieldType cust_field_type;

	public Integer getCust_field_id() {
		return cust_field_id;
	}

	public void setCust_field_id(Integer cust_field_id) {
		this.cust_field_id = cust_field_id;
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

	public CustomFieldType getCust_field_type() {
		return cust_field_type;
	}

	public void setCust_field_type(CustomFieldType cust_field_type) {
		this.cust_field_type = cust_field_type;
	}
	
	
}
