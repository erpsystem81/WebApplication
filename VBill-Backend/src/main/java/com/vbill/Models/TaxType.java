package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class TaxType {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tax_type_seq")
    @SequenceGenerator(
        name = "tax_type_seq",
        sequenceName = "tax_type_seq",
        allocationSize = 1
    )
    private Integer tax_type_id;

    private String tax_type_name; // GST, VAT, IGST
    private String tax_type_code;
    private Integer is_split_applicable;
    private Integer status;
	public Integer getTax_type_id() {
		return tax_type_id;
	}
	public void setTax_type_id(Integer tax_type_id) {
		this.tax_type_id = tax_type_id;
	}
	public String getTax_type_name() {
		return tax_type_name;
	}
	public void setTax_type_name(String tax_type_name) {
		this.tax_type_name = tax_type_name;
	}
	public String getTax_type_code() {
		return tax_type_code;
	}
	public void setTax_type_code(String tax_type_code) {
		this.tax_type_code = tax_type_code;
	}
	public Integer getIs_split_applicable() {
		return is_split_applicable;
	}
	public void setIs_split_applicable(Integer is_split_applicable) {
		this.is_split_applicable = is_split_applicable;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
}