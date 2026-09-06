package com.vbill.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vbill.Services.TaxTypeService;
import com.vbill.DTOS.TaxTypeRequestDto;
import com.vbill.DTOS.TaxTypeResponseDto;

@RestController
@RequestMapping({"/vbill/api/taxTypes","/vbillpos/api/taxTypes"})
@CrossOrigin("*")
public class TaxTypeController {

    private final TaxTypeService service;

    public TaxTypeController(TaxTypeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TaxTypeResponseDto> save(
            @RequestBody TaxTypeRequestDto dto) {

        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaxTypeResponseDto> update(
            @PathVariable Integer id,
            @RequestBody TaxTypeRequestDto dto) {

        return ResponseEntity.ok(service.update(id, dto));
    }

    @GetMapping
    public ResponseEntity<List<TaxTypeResponseDto>> getAll() {

        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaxTypeResponseDto> getById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Integer id) {

        service.delete(id);

        return ResponseEntity.ok("Tax Type Deleted Successfully");
    }
}