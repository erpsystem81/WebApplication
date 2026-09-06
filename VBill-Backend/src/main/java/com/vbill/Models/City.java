package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class City {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_seq")
    @SequenceGenerator(
        name = "city_seq",
        sequenceName = "city_seq",
        allocationSize = 1
    )
	private Integer city_id;
	
	private String city_name;
	private Integer is_inactive;
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "country_id_fk", referencedColumnName = "country_id")
	private Country country;
	
	@ManyToOne
	@JoinColumn(name = "state_id_fk", referencedColumnName = "state_id")
	private State state;

	public Integer getCity_id() {
		return city_id;
	}

	public void setCity_id(Integer city_id) {
		this.city_id = city_id;
	}

	public String getCity_name() {
		return city_name;
	}

	public void setCity_name(String city_name) {
		this.city_name = city_name;
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

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}
	
	
} 
