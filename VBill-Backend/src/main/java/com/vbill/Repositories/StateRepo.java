package com.vbill.Repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vbill.Models.State;

public interface StateRepo extends JpaRepository<State,Integer>{
	@Query("SELECT s FROM State s WHERE s.country.country_id = :countryId")
    List<State> findByCountryId(@Param("countryId") Integer countryId);
}
