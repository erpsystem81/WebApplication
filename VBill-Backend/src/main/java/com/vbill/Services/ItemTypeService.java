package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.ItemTypeRequestDto;
import com.vbill.DTOS.ItemTypeResponseDto;

public interface ItemTypeService {
	ItemTypeResponseDto saveItemType(ItemTypeRequestDto dto);

    ItemTypeResponseDto updateItemType(Integer id, ItemTypeRequestDto dto);

    ItemTypeResponseDto getItemTypeById(Integer id);

    List<ItemTypeResponseDto> getAllItemTypes();

    void deleteItemType(Integer id);
}
