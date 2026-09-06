package com.vbill.Models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_seq")
    @SequenceGenerator(
        name = "location_seq",
        sequenceName = "location_seq",
        allocationSize = 1
    )
	private Integer location_id;
	
	private String name;
	private Integer is_inactive;
	private Integer status;
	private Boolean is_default_location;
	
	@ManyToOne
    @JoinColumn(name = "parent_location_id")
    private Location parentLocation;

    @OneToMany(mappedBy = "parentLocation")
    private List<Location> subLocations;
    
	@ManyToOne
	@JoinColumn(name = "city_id_fk", referencedColumnName = "city_id")
	private City city;
	
	@ManyToOne
	@JoinColumn(name = "state_id_fk", referencedColumnName = "state_id")
	private State state;
	
	@ManyToOne
	@JoinColumn(name = "country_id_fk", referencedColumnName = "country_id")
	private Country country;

	public Integer getLocation_id() {
		return location_id;
	}

	public void setLocation_id(Integer location_id) {
		this.location_id = location_id;
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

	public Boolean getIs_default_location() {
		return is_default_location;
	}

	public void setIs_default_location(Boolean is_default_location) {
		this.is_default_location = is_default_location;
	}

	public Location getParentLocation() {
		return parentLocation;
	}

	public void setParentLocation(Location parentLocation) {
		this.parentLocation = parentLocation;
	}

	public List<Location> getSubLocations() {
		return subLocations;
	}

	public void setSubLocations(List<Location> subLocations) {
		this.subLocations = subLocations;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}
	
	
}
