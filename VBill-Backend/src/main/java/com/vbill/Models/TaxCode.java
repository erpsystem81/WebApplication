package com.vbill.Models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class TaxCode {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "taxcode_seq")
    @SequenceGenerator(
        name = "taxcode_seq",
        sequenceName = "taxcode_seq",
        allocationSize = 1
    )	
	private Integer tax_code_id;
	
	private String tax_code_name;
	private String tax_code_rate;
	private String taxType;
	private Integer is_inactive;
	private Integer status;
	@OneToMany(
		    mappedBy = "taxCode",
		    cascade = CascadeType.ALL,
		    orphanRemoval = true
		)
		private List<TaxCodeDetails> taxDetails;
	public Integer getTax_code_id() {
		return tax_code_id;
	}
	public void setTax_code_id(Integer tax_code_id) {
		this.tax_code_id = tax_code_id;
	}
	public String getTax_code_name() {
		return tax_code_name;
	}
	public void setTax_code_name(String tax_code_name) {
		this.tax_code_name = tax_code_name;
	}
	public String getTax_code_rate() {
		return tax_code_rate;
	}
	public void setTax_code_rate(String tax_code_rate) {
		this.tax_code_rate = tax_code_rate;
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
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public List<TaxCodeDetails> getTaxDetails() {
		return taxDetails;
	}
	public void setTaxDetails(List<TaxCodeDetails> taxDetails) {
		this.taxDetails = taxDetails;
	}
	
	
	
}
