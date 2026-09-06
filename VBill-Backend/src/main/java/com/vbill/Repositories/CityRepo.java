package com.vbill.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vbill.Models.City;

public interface CityRepo extends JpaRepository<City,Integer>{
	@Query("SELECT c FROM City c WHERE c.state.state_id = :stateId")
    List<City> findByStateId(@Param("stateId") Integer stateId);
}
