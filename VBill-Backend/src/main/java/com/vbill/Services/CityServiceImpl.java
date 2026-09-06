package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.CityRequestDto;
import com.vbill.DTOS.CityResponseDto;
import com.vbill.Models.City;
import com.vbill.Models.Country;
import com.vbill.Models.State;
import com.vbill.Repositories.CityRepo;
import com.vbill.Repositories.CountryRepo;
import com.vbill.Repositories.StateRepo;

@Service
public class CityServiceImpl implements CityService{
	 @Autowired
	    private CityRepo cityRepo;

	    @Autowired
	    private CountryRepo countryRepo;

	    @Autowired
	    private StateRepo stateRepo;

	    @Override
	    public CityResponseDto saveCity(CityRequestDto request) {

	        City city = new City();

	        setCityData(city, request);

	        return mapToResponse(cityRepo.save(city));
	    }

	    @Override
	    public CityResponseDto updateCity(Integer id, CityRequestDto request) {

	        City city = cityRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("City not found"));

	        setCityData(city, request);

	        return mapToResponse(cityRepo.save(city));
	    }

	    @Override
	    public List<CityResponseDto> getAllCities() {

	        return cityRepo.findAll()
	                .stream()
	                .map(this::mapToResponse)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public CityResponseDto getCityById(Integer id) {

	        City city = cityRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("City not found"));

	        return mapToResponse(city);
	    }

	    @Override
	    public void deleteCity(Integer id) {

	        cityRepo.deleteById(id);
	    }

	    private void setCityData(City city, CityRequestDto request) {

	        city.setCity_name(request.getCityName());
	        city.setIs_inactive(request.getIsInactive());
	        city.setStatus(request.getStatus());

	        Country country = countryRepo.findById(request.getCountryId())
	                .orElseThrow(() -> new RuntimeException("Country not found"));

	        State state = stateRepo.findById(request.getStateId())
	                .orElseThrow(() -> new RuntimeException("State not found"));

	        city.setCountry(country);
	        city.setState(state);
	    }

	    private CityResponseDto mapToResponse(City city) {

	        CityResponseDto dto = new CityResponseDto();

	        dto.setCityId(city.getCity_id());
	        dto.setCityName(city.getCity_name());
	        dto.setIsInactive(city.getIs_inactive());
	        dto.setStatus(city.getStatus());

	        dto.setCountryId(city.getCountry().getCountry_id());
	        dto.setCountryName(city.getCountry().getCountry_name());

	        dto.setStateId(city.getState().getState_id());
	        dto.setStateName(city.getState().getState_name());

	        return dto;
	    }
	    
	    @Override
	    public List<CityResponseDto> getCitiesByState(Integer stateId) {

	        return cityRepo.findByStateId(stateId)
	                .stream()
	                .map(this::mapToResponse)
	                .toList();
	    }
}
