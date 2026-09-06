package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.TaxCodeRequestDto;
import com.vbill.DTOS.TaxCodeResponseDto;
import com.vbill.Models.TaxCode;
import com.vbill.Repositories.TaxCodeRepo;

@Service
public class TaxCodeServiceImpl implements TaxCodeService {

    @Autowired
    private TaxCodeRepo repository;

    @Override
    public TaxCodeResponseDto saveTaxCode(TaxCodeRequestDto dto) {

        TaxCode tax = new TaxCode();

        tax.setTax_code_name(dto.getTaxCodeName());
        tax.setTax_code_rate(dto.getTaxCodeRate());
        tax.setTaxType(dto.getTaxType());
        tax.setStatus(dto.getStatus());
        tax.setIs_inactive(dto.getIsInactive());

        return convertToDto(repository.save(tax));
    }

    @Override
    public TaxCodeResponseDto updateTaxCode(Integer id, TaxCodeRequestDto dto) {

        TaxCode tax = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tax Code not found"));

        tax.setTax_code_name(dto.getTaxCodeName());
        tax.setTax_code_rate(dto.getTaxCodeRate());
        tax.setTaxType(dto.getTaxType());
        tax.setStatus(dto.getStatus());
        tax.setIs_inactive(dto.getIsInactive());

        return convertToDto(repository.save(tax));
    }

    @Override
    public void deleteTaxCode(Integer id) {

        repository.deleteById(id);
    }

    @Override
    public TaxCodeResponseDto getTaxCodeById(Integer id) {

        TaxCode tax = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tax Code not found"));

        return convertToDto(tax);
    }

    @Override
    public List<TaxCodeResponseDto> getAllTaxCodes() {

        return repository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private TaxCodeResponseDto convertToDto(TaxCode tax) {

        TaxCodeResponseDto dto = new TaxCodeResponseDto();

        dto.setTaxCodeId(tax.getTax_code_id());
        dto.setTaxCodeName(tax.getTax_code_name());
        dto.setTaxCodeRate(tax.getTax_code_rate());
        dto.setTaxType(tax.getTaxType());
        dto.setStatus(tax.getStatus());
        dto.setIsInactive(tax.getIs_inactive());

        return dto;
    }
}