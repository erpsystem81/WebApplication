package com.vbill.Models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class ItemCategory {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_category_seq")
    @SequenceGenerator(
        name = "item_category_seq",
        sequenceName = "item_category_seq",
        allocationSize = 1
    )
	private Integer category_id;
	
	private String  category_name;
	private Integer is_inactive;
	private Integer status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private ItemCategory parent;

    @OneToMany(mappedBy = "parent")
    private List<ItemCategory> subCategories;

	public Integer getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Integer category_id) {
		this.category_id = category_id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
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

	public ItemCategory getParent() {
		return parent;
	}

	public void setParent(ItemCategory parent) {
		this.parent = parent;
	}

	public List<ItemCategory> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(List<ItemCategory> subCategories) {
		this.subCategories = subCategories;
	}
    
    
}
