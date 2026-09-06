package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class State {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "state_seq")
    @SequenceGenerator(
        name = "state_seq",
        sequenceName = "state_seq",
        allocationSize = 1
    )
	private Integer state_id;
	
	private String state_name;
	private String state_code;
	private Integer is_inactive;
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "country_id_fk", referencedColumnName = "country_id")
	private Country country;

	public Integer getState_id() {
		return state_id;
	}

	public void setState_id(Integer state_id) {
		this.state_id = state_id;
	}

	public String getState_name() {
		return state_name;
	}

	public void setState_name(String state_name) {
		this.state_name = state_name;
	}

	public String getState_code() {
		return state_code;
	}

	public void setState_code(String state_code) {
		this.state_code = state_code;
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

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}
	
	
}
