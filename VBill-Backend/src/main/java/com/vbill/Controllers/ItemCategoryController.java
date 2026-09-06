package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.ItemCategoryRequestDto;
import com.vbill.DTOS.ItemCategoryResponseDto;
import com.vbill.Services.ItemCategoryService;

@RestController
@RequestMapping({"/vbill/api/itemCategory","/vbillpos/api/itemCategory"})
@CrossOrigin("*")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryService service;

    @PostMapping("/saveItemCategory")
    public ItemCategoryResponseDto saveItemCategory(
            @RequestBody ItemCategoryRequestDto dto) {

        return service.create(dto);

    }

    @PutMapping("/update/{id}")
    public ItemCategoryResponseDto update(
            @PathVariable Integer id,
            @RequestBody ItemCategoryRequestDto dto) {

        return service.update(id, dto);

    }

    @DeleteMapping("/delete/{id}")
    public void delete(
            @PathVariable Integer id) {

        service.delete(id);

    }

    @GetMapping("/getall")
    public List<ItemCategoryResponseDto> getall() {

        return service.getAll();

    }

    @GetMapping("/{id}")
    public ItemCategoryResponseDto getById(
            @PathVariable Integer id) {

        return service.getById(id);

    }

}