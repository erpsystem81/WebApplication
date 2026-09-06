package com.vbill.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.CountryRequestDto;
import com.vbill.Services.CountryService;

@RestController
@RequestMapping({"/vbill/api/country", "/vbillpos/api/country"})
@CrossOrigin(origins = "*")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @PostMapping("/saveCountry")
    public ResponseEntity<?> saveCountry(@RequestBody CountryRequestDto request) {

        return ResponseEntity.ok(countryService.saveCountry(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCountry(@PathVariable Integer id,
                                           @RequestBody CountryRequestDto request) {

        return ResponseEntity.ok(countryService.updateCountry(id, request));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllCountries() {

        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getCountryById(@PathVariable Integer id) {

        return ResponseEntity.ok(countryService.getCountryById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCountry(@PathVariable Integer id) {

        countryService.deleteCountry(id);

        return ResponseEntity.ok("Country deleted successfully");
    }
}