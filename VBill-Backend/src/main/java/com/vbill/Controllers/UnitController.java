package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.UnitRequestDto;
import com.vbill.DTOS.UnitResponseDto;
import com.vbill.Services.UnitService;

@RestController
@RequestMapping({"/vbill/api/units","/vbillpos/api/units"})
@CrossOrigin("*")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @PostMapping("/saveUnit")
    public UnitResponseDto saveUnit(@RequestBody UnitRequestDto request) {
        return unitService.saveUnit(request);
    }

    @PutMapping("/update/{id}")
    public UnitResponseDto update(@PathVariable Integer id,
                                  @RequestBody UnitRequestDto request) {
        return unitService.updateUnit(id, request);
    }

    @GetMapping("/getall")
    public List<UnitResponseDto> getAll() {
        return unitService.getAllUnits();
    }

    @GetMapping("/{id}")
    public UnitResponseDto getById(@PathVariable Integer id) {
        return unitService.getUnitById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        unitService.deleteUnit(id);
        return "Unit Deleted Successfully";
    }
}