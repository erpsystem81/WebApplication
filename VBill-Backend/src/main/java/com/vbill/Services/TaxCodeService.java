package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.TaxCodeRequestDto;
import com.vbill.DTOS.TaxCodeResponseDto;

public interface TaxCodeService {

    TaxCodeResponseDto saveTaxCode(TaxCodeRequestDto dto);

    TaxCodeResponseDto updateTaxCode(Integer id, TaxCodeRequestDto dto);

    void deleteTaxCode(Integer id);

    TaxCodeResponseDto getTaxCodeById(Integer id);

    List<TaxCodeResponseDto> getAllTaxCodes();
}