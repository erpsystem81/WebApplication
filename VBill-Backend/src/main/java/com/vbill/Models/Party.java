package com.vbill.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Party {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "party_seq")
    @SequenceGenerator(
        name = "party_seq",
        sequenceName = "party_seq",
        allocationSize = 1
    )
	private Integer party_id;
	
	private String first_name;
	private String last_name;
	private String company;
	private String phone_no;
	private String alt_phone_no;
	private String email;
	private String tax_id;
	private String address;
	private Integer is_inactive;
	private Integer status;
	private String zip_code;
	
	@ManyToOne
	@JoinColumn(name = "party_type_id_fk", referencedColumnName = "party_type_id")
	private PartyType party_type;
	
	@ManyToOne
	@JoinColumn(name = "city_id_fk", referencedColumnName = "city_id")
	private City city;
	
	@ManyToOne
	@JoinColumn(name = "state_id_fk", referencedColumnName = "state_id")
	private State state;
	
	@ManyToOne
	@JoinColumn(name = "country_id_fk", referencedColumnName = "country_id")
	private Country country;

	public Integer getParty_id() {
		return party_id;
	}

	public void setParty_id(Integer party_id) {
		this.party_id = party_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}

	public String getAlt_phone_no() {
		return alt_phone_no;
	}

	public void setAlt_phone_no(String alt_phone_no) {
		this.alt_phone_no = alt_phone_no;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTax_id() {
		return tax_id;
	}

	public void setTax_id(String tax_id) {
		this.tax_id = tax_id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public String getZip_code() {
		return zip_code;
	}

	public void setZip_code(String zip_code) {
		this.zip_code = zip_code;
	}

	public PartyType getParty_type() {
		return party_type;
	}

	public void setParty_type(PartyType party_type) {
		this.party_type = party_type;
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
