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
public class Item {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq")
    @SequenceGenerator(name = "item_seq", sequenceName = "item_sequence", allocationSize = 1)
    private Integer item_id;

    private String item_name;
    private String barcode;
    private Double purchase_price;
    private Double sale_price;
    private Double mrp;
    private String description;
    private Double min_stock;
    private Boolean is_tax_included;
    private Boolean is_batch_enabled;
    private Integer status;
    private Integer is_inactive;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_type_id_fk", referencedColumnName = "item_type_id")
	private ItemType item_type;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "base_unit_id_fk", referencedColumnName = "unit_id")
    private Unit baseUnit;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tax_code_id_fk", referencedColumnName = "tax_code_id")
    private TaxCode taxCode;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id_fk", referencedColumnName = "category_id")
    private ItemCategory category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id_fk", referencedColumnName = "location_id")
    private Location location;

	public Integer getItem_id() {
		return item_id;
	}

	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}

	public String getItem_name() {
		return item_name;
	}

	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getMin_stock() {
		return min_stock;
	}

	public void setMin_stock(Double min_stock) {
		this.min_stock = min_stock;
	}

	public Boolean getIs_tax_included() {
		return is_tax_included;
	}

	public void setIs_tax_included(Boolean is_tax_included) {
		this.is_tax_included = is_tax_included;
	}

	public Boolean getIs_batch_enabled() {
		return is_batch_enabled;
	}

	public void setIs_batch_enabled(Boolean is_batch_enabled) {
		this.is_batch_enabled = is_batch_enabled;
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

	public ItemType getItem_type() {
		return item_type;
	}

	public void setItem_type(ItemType item_type) {
		this.item_type = item_type;
	}

	public Unit getBaseUnit() {
		return baseUnit;
	}

	public void setBaseUnit(Unit baseUnit) {
		this.baseUnit = baseUnit;
	}

	public TaxCode getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(TaxCode taxCode) {
		this.taxCode = taxCode;
	}

	public ItemCategory getCategory() {
		return category;
	}

	public void setCategory(ItemCategory category) {
		this.category = category;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
    
    
}
