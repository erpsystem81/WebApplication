package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.ItemCategoryRequestDto;
import com.vbill.DTOS.ItemCategoryResponseDto;

public interface ItemCategoryService {
	ItemCategoryResponseDto create(ItemCategoryRequestDto dto);

    ItemCategoryResponseDto update(Integer id, ItemCategoryRequestDto dto);

    void delete(Integer id);

    List<ItemCategoryResponseDto> getAll();

    ItemCategoryResponseDto getById(Integer id);

}
