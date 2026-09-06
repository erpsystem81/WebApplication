package com.vbill.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.Location;

public interface LocationRepo extends JpaRepository<Location,Integer>{

}
