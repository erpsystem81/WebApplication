package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vbill.DTOS.CityRequestDto;
import com.vbill.DTOS.CityResponseDto;
import com.vbill.Services.CityService;

@RestController
@RequestMapping({"/vbill/api/city", "/vbillpos/api/city"})
@CrossOrigin(origins = "*")
public class CityController {

    @Autowired
    private CityService cityService;

    @PostMapping("/saveCity")
    public ResponseEntity<?> saveCity(@RequestBody CityRequestDto request) {

        return ResponseEntity.ok(cityService.saveCity(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCity(@PathVariable Integer id,
                                        @RequestBody CityRequestDto request) {

        return ResponseEntity.ok(cityService.updateCity(id, request));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllCities() {

        return ResponseEntity.ok(cityService.getAllCities());
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getCityById(@PathVariable Integer id) {

        return ResponseEntity.ok(cityService.getCityById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Integer id) {

        cityService.deleteCity(id);

        return ResponseEntity.ok("City deleted successfully");
    }
    
    @GetMapping("/state/{stateId}")
    public ResponseEntity<List<CityResponseDto>> getCitiesByState(
            @PathVariable Integer stateId) {

        return ResponseEntity.ok(cityService.getCitiesByState(stateId));
    }

}
