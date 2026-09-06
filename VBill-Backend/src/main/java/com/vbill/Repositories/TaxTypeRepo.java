package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.TaxType;

public interface TaxTypeRepo extends JpaRepository<TaxType, Integer> {

}