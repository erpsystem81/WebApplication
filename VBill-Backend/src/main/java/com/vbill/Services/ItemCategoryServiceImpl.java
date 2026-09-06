package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.ItemCategoryRequestDto;
import com.vbill.DTOS.ItemCategoryResponseDto;
import com.vbill.Models.ItemCategory;
import com.vbill.Repositories.ItemCategoryRepo;

@Service
public class ItemCategoryServiceImpl implements ItemCategoryService{
	 @Autowired
	    private ItemCategoryRepo itemCategoryRepo;

	    @Override
	    public ItemCategoryResponseDto create(ItemCategoryRequestDto dto) {

	        ItemCategory category = new ItemCategory();

	        category.setCategory_name(dto.getCategoryName());
	        category.setStatus(dto.getStatus());
	        category.setIs_inactive(dto.getIsInactive());

	        if (dto.getParentCategoryId() != null) {

	            ItemCategory parent = itemCategoryRepo.findById(dto.getParentCategoryId())
	                    .orElseThrow(() -> new RuntimeException("Parent Category not found"));

	            category.setParent(parent);
	        }

	        itemCategoryRepo.save(category);

	        return map(category);
	    }

	    @Override
	    public ItemCategoryResponseDto update(Integer id, ItemCategoryRequestDto dto) {

	        ItemCategory category = itemCategoryRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Category not found"));

	        category.setCategory_name(dto.getCategoryName());
	        category.setStatus(dto.getStatus());
	        category.setIs_inactive(dto.getIsInactive());

	        if (dto.getParentCategoryId() != null) {

	            ItemCategory parent = itemCategoryRepo.findById(dto.getParentCategoryId())
	                    .orElseThrow(() -> new RuntimeException("Parent Category not found"));

	            category.setParent(parent);

	        } else {

	            category.setParent(null);

	        }

	        itemCategoryRepo.save(category);

	        return map(category);
	    }

	    @Override
	    public void delete(Integer id) {

	    	itemCategoryRepo.deleteById(id);

	    }

	    @Override
	    public List<ItemCategoryResponseDto> getAll() {

	        return itemCategoryRepo.findAll()
	                .stream()
	                .map(this::map)
	                .collect(Collectors.toList());

	    }

	    @Override
	    public ItemCategoryResponseDto getById(Integer id) {

	        ItemCategory category = itemCategoryRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Category not found"));

	        return map(category);
	    }

	    private ItemCategoryResponseDto map(ItemCategory category) {

	        ItemCategoryResponseDto dto = new ItemCategoryResponseDto();

	        dto.setCategoryId(category.getCategory_id());

	        dto.setCategoryName(category.getCategory_name());

	        dto.setStatus(category.getStatus());

	        dto.setIsInactive(category.getIs_inactive());

	        if (category.getParent() != null) {

	            dto.setParentCategoryId(category.getParent().getCategory_id());

	            dto.setParentCategoryName(category.getParent().getCategory_name());

	        }

	        return dto;
	    }
}
