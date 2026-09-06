package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.ItemRequestDto;
import com.vbill.DTOS.ItemResponseDto;
import com.vbill.Services.ItemService;

@RestController
@RequestMapping({"/vbill/api/item","/vbillpos/api/item"})
@CrossOrigin("*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/saveItem")
    public ItemResponseDto saveItem(@RequestBody ItemRequestDto dto) {
        return itemService.saveItem(dto);
    }

    @PutMapping("/update/{id}")
    public ItemResponseDto updateItem(@PathVariable Integer id,
                                      @RequestBody ItemRequestDto dto) {
        return itemService.updateItem(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable Integer id) {

        itemService.deleteItem(id);

        return "Item deleted successfully.";
    }

    @GetMapping("/getById/{id}")
    public ItemResponseDto getById(@PathVariable Integer id) {
        return itemService.getItemById(id);
    }

    @GetMapping("/getall")
    public List<ItemResponseDto> getAllItems() {
        return itemService.getAllItems();
    }
}