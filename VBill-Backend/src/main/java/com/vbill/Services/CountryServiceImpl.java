package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.CountryRequestDto;
import com.vbill.DTOS.CountryResponseDto;
import com.vbill.Models.Country;
import com.vbill.Repositories.CountryRepo;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepo countryRepo;

    @Override
    public CountryResponseDto saveCountry(CountryRequestDto request) {

        Country country = new Country();

        setCountryData(country, request);

        return mapToResponse(countryRepo.save(country));
    }

    @Override
    public CountryResponseDto updateCountry(Integer id, CountryRequestDto request) {

        Country country = countryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));

        setCountryData(country, request);

        return mapToResponse(countryRepo.save(country));
    }

    @Override
    public List<CountryResponseDto> getAllCountries() {

        return countryRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CountryResponseDto getCountryById(Integer id) {

        Country country = countryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));

        return mapToResponse(country);
    }

    @Override
    public void deleteCountry(Integer id) {

        countryRepo.deleteById(id);
    }

    private void setCountryData(Country country, CountryRequestDto request) {

        country.setCountry_name(request.getCountryName());
        country.setPhone_code(request.getPhoneCode());
        country.setIs_inactive(request.getIsInactive());
        country.setStatus(request.getStatus());
    }

    private CountryResponseDto mapToResponse(Country country) {

        CountryResponseDto dto = new CountryResponseDto();

        dto.setCountryId(country.getCountry_id());
        dto.setCountryName(country.getCountry_name());
        dto.setPhoneCode(country.getPhone_code());
        dto.setIsInactive(country.getIs_inactive());
        dto.setStatus(country.getStatus());

        return dto;
    }
}