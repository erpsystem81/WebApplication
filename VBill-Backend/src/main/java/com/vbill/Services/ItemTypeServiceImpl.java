package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.ItemTypeRequestDto;
import com.vbill.DTOS.ItemTypeResponseDto;
import com.vbill.Models.ItemType;
import com.vbill.Repositories.ItemTypeRepo;

@Service
public class ItemTypeServiceImpl implements ItemTypeService {

    @Autowired
    private ItemTypeRepo repository;

    @Override
    public ItemTypeResponseDto saveItemType(ItemTypeRequestDto dto) {

        ItemType itemType = new ItemType();

        itemType.setItem_type(dto.getItemTypeName());
        itemType.setStatus(dto.getStatus());
        itemType.setIs_inactive(dto.getIsInactive());

        repository.save(itemType);

        return convert(itemType);
    }

    @Override
    public ItemTypeResponseDto updateItemType(Integer id, ItemTypeRequestDto dto) {

        ItemType itemType = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item Type not found"));

        itemType.setItem_type(dto.getItemTypeName());
        itemType.setStatus(dto.getStatus());
        itemType.setIs_inactive(dto.getIsInactive());

        repository.save(itemType);

        return convert(itemType);
    }

    @Override
    public ItemTypeResponseDto getItemTypeById(Integer id) {

        ItemType itemType = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item Type not found"));

        return convert(itemType);
    }

    @Override
    public List<ItemTypeResponseDto> getAllItemTypes() {

        return repository.findAll()
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItemType(Integer id) {

        ItemType itemType = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item Type not found"));

        repository.delete(itemType);
    }

    private ItemTypeResponseDto convert(ItemType itemType) {

        ItemTypeResponseDto dto = new ItemTypeResponseDto();

        dto.setItem_type_id(itemType.getItem_type_id());
        dto.setItem_type(itemType.getItem_type());
        dto.setStatus(itemType.getStatus());
        dto.setIs_inactive(itemType.getIs_inactive());

        return dto;
    }
}