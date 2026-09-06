package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.LocationRequestDto;
import com.vbill.DTOS.LocationResponseDto;
import com.vbill.Services.LocationService;

@RestController
@RequestMapping({"/vbill/api/locations","/vbillpos/api/locations"}) 
@CrossOrigin("*")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/save")
    public LocationResponseDto save(@RequestBody LocationRequestDto request) {
        return locationService.saveLocation(request);
    }

    @PutMapping("/update/{id}")
    public LocationResponseDto update(@PathVariable Integer id,
                                      @RequestBody LocationRequestDto request) {
        return locationService.updateLocation(id, request);
    }

    @GetMapping("/getall")
    public List<LocationResponseDto> getAll() {
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public LocationResponseDto getById(@PathVariable Integer id) {
        return locationService.getLocationById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        locationService.deleteLocation(id);
        return "Location Deleted Successfully";
    }
}