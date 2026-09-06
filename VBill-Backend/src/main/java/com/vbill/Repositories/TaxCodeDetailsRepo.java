package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vbill.Models.TaxCodeDetails;

public interface TaxCodeDetailsRepo extends JpaRepository<TaxCodeDetails, Integer> {

}