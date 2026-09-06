package com.vbill.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vbill.DTOS.BusinessInfoRequestDto;
import com.vbill.DTOS.BusinessInfoResponseDto;
import com.vbill.Services.BusinessInfoService;

@RestController
@RequestMapping({"/vbill/api/business", "/vbillpos/api/business"})
@CrossOrigin(origins="*")
public class BusinessInfoController {
	@Autowired
    private BusinessInfoService businessInfoService;

    // Save
    @PostMapping("/save")
    public BusinessInfoResponseDto saveBusinessInfo(@RequestBody BusinessInfoRequestDto request) {
        return businessInfoService.saveBusinessInfo(request);
    }

    // Update
    @PutMapping("/update/{id}")
    public BusinessInfoResponseDto updateBusinessInfo(
            @PathVariable Integer id,
            @RequestBody BusinessInfoRequestDto request) {

        return businessInfoService.updateBusinessInfo(id, request);
    }

    // Get By Id
    @GetMapping("/{id}")
    public BusinessInfoResponseDto getBusinessInfoById(@PathVariable Integer id) {
        return businessInfoService.getBusinessInfoById(id);
    }

    // Get All
    @GetMapping("/getAll")
    public List<BusinessInfoResponseDto> getAllBusinessInfo() {
        return businessInfoService.getAllBusinessInfo();
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String deleteBusinessInfo(@PathVariable Integer id) {
        return businessInfoService.deleteBusinessInfo(id);
    }
}
