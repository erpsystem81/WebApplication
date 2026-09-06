package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.BusinessInfo;

public interface BusinessInfoRepo extends JpaRepository<BusinessInfo,Integer> {

}
