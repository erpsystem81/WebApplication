package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.TaxCode;

public interface TaxCodeRepo extends JpaRepository<TaxCode,Integer>{

}
