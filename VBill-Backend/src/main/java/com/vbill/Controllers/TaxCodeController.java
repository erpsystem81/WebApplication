package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.TaxCodeRequestDto;
import com.vbill.DTOS.TaxCodeResponseDto;
import com.vbill.Services.TaxCodeService;

@RestController
@RequestMapping({"/vbill/api/taxCode","/vbillpos/api/taxCode"})
@CrossOrigin("*")
public class TaxCodeController {

    @Autowired
    private TaxCodeService service;

    @PostMapping("/saveTaxCode")
    public TaxCodeResponseDto saveTaxCode(@RequestBody TaxCodeRequestDto dto) {

        return service.saveTaxCode(dto);
    }

    @PutMapping("/update/{id}")
    public TaxCodeResponseDto updateTaxCode(
            @PathVariable Integer id,
            @RequestBody TaxCodeRequestDto dto) {

        return service.updateTaxCode(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTaxCode(@PathVariable Integer id) {

        service.deleteTaxCode(id);
    }

    @GetMapping("/getById/{id}")
    public TaxCodeResponseDto getTaxCodeById(@PathVariable Integer id) {

        return service.getTaxCodeById(id);
    }

    @GetMapping("/getall")
    public List<TaxCodeResponseDto> getAllTaxCodes() {

        return service.getAllTaxCodes();
    }
}