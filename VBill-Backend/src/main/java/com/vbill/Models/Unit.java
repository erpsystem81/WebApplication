package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "unit_seq")
    @SequenceGenerator(
        name = "unit_seq",
        sequenceName = "unit_sequence",
        allocationSize = 1
    )
    private Integer unit_id;

    private String unit_name;// Kilogram, Gram, Piece
    private String unit_code;// KG, GM, PCS
    private String unit_type;// WEIGHT, QUANTITY, VOLUME
    private Boolean is_base_unit;// true = base unit
    private Double conversion_factor;  
    // How much of BASE unit
    // Example:
    // Gram → 0.001 (1 GM = 0.001 KG)
    // KG → 1
    private Integer decimal_places;
    private Boolean allow_fraction;
    private Integer status;
    private Integer is_inactive;
    
    @ManyToOne
    @JoinColumn(name = "base_unit_id")
    private Unit baseUnit;

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public String getUnit_name() {
		return unit_name;
	}

	public void setUnit_name(String unit_name) {
		this.unit_name = unit_name;
	}

	public String getUnit_code() {
		return unit_code;
	}

	public void setUnit_code(String unit_code) {
		this.unit_code = unit_code;
	}

	public String getUnit_type() {
		return unit_type;
	}

	public void setUnit_type(String unit_type) {
		this.unit_type = unit_type;
	}

	public Boolean getIs_base_unit() {
		return is_base_unit;
	}

	public void setIs_base_unit(Boolean is_base_unit) {
		this.is_base_unit = is_base_unit;
	}

	public Double getConversion_factor() {
		return conversion_factor;
	}

	public void setConversion_factor(Double conversion_factor) {
		this.conversion_factor = conversion_factor;
	}

	public Integer getDecimal_places() {
		return decimal_places;
	}

	public void setDecimal_places(Integer decimal_places) {
		this.decimal_places = decimal_places;
	}

	public Boolean getAllow_fraction() {
		return allow_fraction;
	}

	public void setAllow_fraction(Boolean allow_fraction) {
		this.allow_fraction = allow_fraction;
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

	public Unit getBaseUnit() {
		return baseUnit;
	}

	public void setBaseUnit(Unit baseUnit) {
		this.baseUnit = baseUnit;
	} 
    
    
}
