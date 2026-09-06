package com.vbill.Models;

import java.math.BigDecimal;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class TaxCodeDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "taxcode_detail_seq")
	@SequenceGenerator(
	        name = "taxcode_detail_seq",
	        sequenceName = "taxcode_detail_seq",
	        allocationSize = 1
	    )	
    private Integer tax_component_id;
	
    private String tax_component; // CGST, SGST, IGST
    private BigDecimal tax_rate;
    private Integer is_inactive;
    private Integer status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "tax_code_id_fk",
        referencedColumnName = "tax_code_id", nullable=false
    )
    private TaxCode taxCode;

	public Integer getTax_component_id() {
		return tax_component_id;
	}

	public void setTax_component_id(Integer tax_component_id) {
		this.tax_component_id = tax_component_id;
	}

	public String getTax_component() {
		return tax_component;
	}

	public void setTax_component(String tax_component) {
		this.tax_component = tax_component;
	}

	public BigDecimal getTax_rate() {
		return tax_rate;
	}

	public void setTax_rate(BigDecimal tax_rate) {
		this.tax_rate = tax_rate;
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

	public TaxCode getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(TaxCode taxCode) {
		this.taxCode = taxCode;
	}
	
	
	
}