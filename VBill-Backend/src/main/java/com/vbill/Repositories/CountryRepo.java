package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.Country;

public interface CountryRepo extends JpaRepository<Country,Integer>{

}
