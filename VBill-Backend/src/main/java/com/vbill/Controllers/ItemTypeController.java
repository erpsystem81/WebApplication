package com.vbill.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.ItemTypeRequestDto;
import com.vbill.DTOS.ItemTypeResponseDto;
import com.vbill.Services.ItemTypeService;

@RestController
@RequestMapping({"/vbill/api/itemType", "/vbillpos/api/itemType"})
@CrossOrigin("*")
public class ItemTypeController {

    private final ItemTypeService service;

    public ItemTypeController(ItemTypeService service) {
        this.service = service;
    }

    @PostMapping("/saveItemType")
    public ResponseEntity<ItemTypeResponseDto> saveItemType(
            @RequestBody ItemTypeRequestDto dto) {

        return ResponseEntity.ok(service.saveItemType(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ItemTypeResponseDto> update(
            @PathVariable Integer id,
            @RequestBody ItemTypeRequestDto dto) {

        return ResponseEntity.ok(service.updateItemType(id, dto));
    }

    @GetMapping("/getall")
    public ResponseEntity<List<ItemTypeResponseDto>> getAll() {

        return ResponseEntity.ok(service.getAllItemTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemTypeResponseDto> getById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(service.getItemTypeById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Integer id) {

        service.deleteItemType(id);

        return ResponseEntity.ok("Deleted Successfully");
    }
}