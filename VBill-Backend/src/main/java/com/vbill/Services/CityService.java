package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.CityRequestDto;
import com.vbill.DTOS.CityResponseDto;

public interface CityService {
	CityResponseDto saveCity(CityRequestDto request);

    CityResponseDto updateCity(Integer id, CityRequestDto request);

    List<CityResponseDto> getAllCities();

    CityResponseDto getCityById(Integer id);

    void deleteCity(Integer id);

    List<CityResponseDto> getCitiesByState(Integer stateId);
}
