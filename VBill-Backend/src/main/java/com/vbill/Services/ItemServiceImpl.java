package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.ItemRequestDto;
import com.vbill.DTOS.ItemResponseDto;
import com.vbill.Models.Item;
import com.vbill.Models.ItemCategory;
import com.vbill.Models.ItemType;
import com.vbill.Models.Location;
import com.vbill.Models.TaxCode;
import com.vbill.Models.Unit;
import com.vbill.Repositories.ItemCategoryRepo;
import com.vbill.Repositories.ItemRepo;
import com.vbill.Repositories.ItemTypeRepo;
import com.vbill.Repositories.LocationRepo;
import com.vbill.Repositories.TaxCodeRepo;
import com.vbill.Repositories.UnitRepo;

@Service
public class ItemServiceImpl implements ItemService {
	@Autowired
    private ItemRepo itemRepository;

    @Autowired
    private ItemTypeRepo itemTypeRepository;

    @Autowired
    private UnitRepo unitRepository;

    @Autowired
    private TaxCodeRepo taxCodeRepository;

    @Autowired
    private ItemCategoryRepo categoryRepository;

    @Autowired
    private LocationRepo locationRepository;

    @Override
    public ItemResponseDto saveItem(ItemRequestDto dto) {

        Item item = new Item();

        mapDtoToEntity(dto, item);

        return mapToResponse(itemRepository.save(item));
    }

    @Override
    public ItemResponseDto updateItem(Integer id, ItemRequestDto dto) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        mapDtoToEntity(dto, item);

        return mapToResponse(itemRepository.save(item));
    }

    @Override
    public void deleteItem(Integer id) {

        itemRepository.deleteById(id);
    }

    @Override
    public ItemResponseDto getItemById(Integer id) {

        return mapToResponse(itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found")));
    }

    @Override
    public List<ItemResponseDto> getAllItems() {

        return itemRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private void mapDtoToEntity(ItemRequestDto dto, Item item) {

        item.setItem_name(dto.getItemName());
        item.setBarcode(dto.getBarcode());
        item.setPurchase_price(dto.getPurchasePrice());
        item.setSale_price(dto.getSalePrice());
        item.setMrp(dto.getMrp());
        item.setDescription(dto.getDescription());
        item.setMin_stock(dto.getMinStock());
        item.setIs_tax_included(dto.getIsTaxIncluded());
        item.setIs_batch_enabled(dto.getIsBatchEnabled());
        item.setStatus(dto.getStatus());
        item.setIs_inactive(dto.getIsInactive());

        ItemType itemType = itemTypeRepository.findById(dto.getItemTypeId()).orElse(null);
        Unit unit = unitRepository.findById(dto.getBaseUnitId()).orElse(null);
        TaxCode taxCode = taxCodeRepository.findById(dto.getTaxCodeId()).orElse(null);
        ItemCategory category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
        Location location = locationRepository.findById(dto.getLocationId()).orElse(null);

        item.setItem_type(itemType);
        item.setBaseUnit(unit);
        item.setTaxCode(taxCode);
        item.setCategory(category);
        item.setLocation(location);
    }

    private ItemResponseDto mapToResponse(Item item) {

        ItemResponseDto dto = new ItemResponseDto();

        dto.setItemId(item.getItem_id());
        dto.setItemName(item.getItem_name());
        dto.setBarcode(item.getBarcode());
        dto.setPurchasePrice(item.getPurchase_price());
        dto.setSalePrice(item.getSale_price());
        dto.setMrp(item.getMrp());
        dto.setDescription(item.getDescription());
        dto.setMinStock(item.getMin_stock());
        dto.setIsTaxIncluded(item.getIs_tax_included());
        dto.setIsBatchEnabled(item.getIs_batch_enabled());
        dto.setStatus(item.getStatus());
        dto.setIsInactive(item.getIs_inactive());

        if (item.getItem_type() != null) {
            dto.setItemTypeId(item.getItem_type().getItem_type_id());
            dto.setItemTypeName(item.getItem_type().getItem_type());
        }

        if (item.getBaseUnit() != null) {
            dto.setBaseUnitId(item.getBaseUnit().getUnit_id());
            dto.setBaseUnitName(item.getBaseUnit().getUnit_name());
        }

        if (item.getTaxCode() != null) {
            dto.setTaxCodeId(item.getTaxCode().getTax_code_id());
            dto.setTaxCodeName(item.getTaxCode().getTax_code_name());
        }

        if (item.getCategory() != null) {
            dto.setCategoryId(item.getCategory().getCategory_id());
            dto.setCategoryName(item.getCategory().getCategory_name());
        }

        if (item.getLocation() != null) {
            dto.setLocationId(item.getLocation().getLocation_id());
            dto.setLocationName(item.getLocation().getName());
        }

        return dto;
    }
}
