package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.CountryRequestDto;
import com.vbill.DTOS.CountryResponseDto;

public interface CountryService {

    CountryResponseDto saveCountry(CountryRequestDto request);

    CountryResponseDto updateCountry(Integer id, CountryRequestDto request);

    List<CountryResponseDto> getAllCountries();

    CountryResponseDto getCountryById(Integer id);

    void deleteCountry(Integer id);

}