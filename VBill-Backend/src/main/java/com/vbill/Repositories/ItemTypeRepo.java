package com.vbill.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbill.Models.ItemType;

public interface ItemTypeRepo extends JpaRepository<ItemType,Integer> {

}
