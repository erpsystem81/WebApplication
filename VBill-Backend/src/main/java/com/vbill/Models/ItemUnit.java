package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class ItemUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_unit_seq")
    @SequenceGenerator(name = "item_unit_seq", sequenceName = "item_unit_seq", allocationSize = 1)
    private Integer item_unit_id;

    private Double purchase_price;
    private Double sale_price;
    private Double mrp;
    private Boolean is_default;
    private Integer status;
    private Double conversion_factor;   // Example: Box = 10 (means 1 box = 10 base units)
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id_fk")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id_fk")
    private Unit unit;

	public Integer getItem_unit_id() {
		return item_unit_id;
	}

	public void setItem_unit_id(Integer item_unit_id) {
		this.item_unit_id = item_unit_id;
	}

	public Double getPurchase_price() {
		return purchase_price;
	}

	public void setPurchase_price(Double purchase_price) {
		this.purchase_price = purchase_price;
	}

	public Double getSale_price() {
		return sale_price;
	}

	public void setSale_price(Double sale_price) {
		this.sale_price = sale_price;
	}

	public Double getMrp() {
		return mrp;
	}

	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}

	public Boolean getIs_default() {
		return is_default;
	}

	public void setIs_default(Boolean is_default) {
		this.is_default = is_default;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Double getConversion_factor() {
		return conversion_factor;
	}

	public void setConversion_factor(Double conversion_factor) {
		this.conversion_factor = conversion_factor;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
	}
    
    
}