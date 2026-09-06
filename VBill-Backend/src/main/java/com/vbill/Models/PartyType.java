package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class PartyType {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "party_type_seq")
    @SequenceGenerator(
        name = "party_type_seq",
        sequenceName = "party_type_seq",
        allocationSize = 1
    )
	private Integer party_type_id;
	
	private String name;
	private Integer is_inactive;
	private Integer status;
	public Integer getParty_type_id() {
		return party_type_id;
	}
	public void setParty_type_id(Integer party_type_id) {
		this.party_type_id = party_type_id;
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
	
	
}
