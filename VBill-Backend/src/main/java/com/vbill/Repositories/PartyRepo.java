package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.Party;

public interface PartyRepo extends JpaRepository<Party,Integer>{

}
