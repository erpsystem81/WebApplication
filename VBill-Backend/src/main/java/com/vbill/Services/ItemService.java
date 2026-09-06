package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.ItemRequestDto;
import com.vbill.DTOS.ItemResponseDto;

public interface ItemService {
	 ItemResponseDto saveItem(ItemRequestDto dto);

	    ItemResponseDto updateItem(Integer id, ItemRequestDto dto);

	    void deleteItem(Integer id);

	    ItemResponseDto getItemById(Integer id);

	    List<ItemResponseDto> getAllItems();
}
