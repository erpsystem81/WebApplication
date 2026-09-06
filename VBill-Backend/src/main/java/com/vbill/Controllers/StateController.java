package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vbill.DTOS.StateRequestDto;
import com.vbill.DTOS.StateResponseDto;
import com.vbill.Services.StateService;

@RestController
@RequestMapping({"/vbill/api/state", "/vbillpos/api/state"})
@CrossOrigin(origins = "*")
public class StateController {

    @Autowired
    private StateService stateService;

    @PostMapping("/saveState")
    public ResponseEntity<?> saveState(@RequestBody StateRequestDto request) {

        return ResponseEntity.ok(stateService.saveState(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateState(@PathVariable Integer id,
                                         @RequestBody StateRequestDto request) {

        return ResponseEntity.ok(stateService.updateState(id, request));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllStates() {

        return ResponseEntity.ok(stateService.getAllStates());
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getStateById(@PathVariable Integer id) {

        return ResponseEntity.ok(stateService.getStateById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteState(@PathVariable Integer id) {

        stateService.deleteState(id);

        return ResponseEntity.ok("State deleted successfully");
    }
    
    @GetMapping("/country/{countryId}")
    public ResponseEntity<List<StateResponseDto>> getStatesByCountry(
            @PathVariable Integer countryId) {

        return ResponseEntity.ok(
                stateService.getStatesByCountry(countryId)
        );
    }
}