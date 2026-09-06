package com.vbill.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "business_info")
public class BusinessInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "business_info_seq")
	@SequenceGenerator(
	    name = "business_info_seq",
	    sequenceName = "business_info_seq",
	    allocationSize = 1
	)
	private Integer company_info_id;
	private String name;
	private String owner_first_name;
	private String owner_last_name;
	private String tax_id;
	private String phone_no;
	private String alt_phone_no;
	private String email;
	private String address;
	private String zip_code;
	private String terms_and_conditions;
	
	  // Store image as BYTEA
    @Lob
    @Column(name = "BusinessLogo")
    private byte[] businessLogo;

	
	@ManyToOne
	@JoinColumn(name = "city_id_fk", referencedColumnName = "city_id")
	private City city;
	
	@ManyToOne
	@JoinColumn(name = "state_id_fk", referencedColumnName = "state_id")
	private State state;
	
	@ManyToOne
	@JoinColumn(name = "country_id_fk", referencedColumnName = "country_id")
	private Country country;

	public Integer getCompany_info_id() {
		return company_info_id;
	}

	public void setCompany_info_id(Integer company_info_id) {
		this.company_info_id = company_info_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOwner_first_name() {
		return owner_first_name;
	}

	public void setOwner_first_name(String owner_first_name) {
		this.owner_first_name = owner_first_name;
	}

	public String getOwner_last_name() {
		return owner_last_name;
	}

	public void setOwner_last_name(String owner_last_name) {
		this.owner_last_name = owner_last_name;
	}

	public String getTax_id() {
		return tax_id;
	}

	public void setTax_id(String tax_id) {
		this.tax_id = tax_id;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZip_code() {
		return zip_code;
	}

	public void setZip_code(String zip_code) {
		this.zip_code = zip_code;
	}

	public String getTerms_and_conditions() {
		return terms_and_conditions;
	}

	public void setTerms_and_conditions(String terms_and_conditions) {
		this.terms_and_conditions = terms_and_conditions;
	}

	public byte[] getBusinessLogo() {
		return businessLogo;
	}

	public void setBusinessLogo(byte[] businessLogo) {
		this.businessLogo = businessLogo;
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
