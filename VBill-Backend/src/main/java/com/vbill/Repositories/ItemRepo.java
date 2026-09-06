package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.Item;

public interface ItemRepo extends JpaRepository<Item,Integer>{

}
