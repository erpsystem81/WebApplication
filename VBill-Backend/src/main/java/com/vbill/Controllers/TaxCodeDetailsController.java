package com.vbill.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vbill.Services.TaxCodeDetailsService;
import com.vbill.DTOS.TaxCodeDetailsRequestDto;
import com.vbill.DTOS.TaxCodeDetailsResponseDto;

@RestController
@RequestMapping({"/vbill/api/taxCodeDetails","/vbillpos/api/taxCodeDetails"})
@CrossOrigin("*")
public class TaxCodeDetailsController {

    private final TaxCodeDetailsService service;

    public TaxCodeDetailsController(TaxCodeDetailsService service) {
        this.service = service;
    }

    @PostMapping("/saveTaxCodeDetails")
    public ResponseEntity<TaxCodeDetailsResponseDto> saveTaxCodeDetails(
            @RequestBody TaxCodeDetailsRequestDto dto) {

        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TaxCodeDetailsResponseDto> update(
            @PathVariable Integer id,
            @RequestBody TaxCodeDetailsRequestDto dto) {

        return ResponseEntity.ok(service.update(id, dto));
    }

    @GetMapping("/getall")
    public ResponseEntity<List<TaxCodeDetailsResponseDto>> getall() {

        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaxCodeDetailsResponseDto> getById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Integer id) {

        service.delete(id);

        return ResponseEntity.ok("Deleted Successfully");
    }
}