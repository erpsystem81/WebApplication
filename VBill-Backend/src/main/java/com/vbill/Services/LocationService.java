package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.LocationRequestDto;
import com.vbill.DTOS.LocationResponseDto;

public interface LocationService {
	 LocationResponseDto saveLocation(LocationRequestDto request);

	    LocationResponseDto updateLocation(Integer id, LocationRequestDto request);

	    List<LocationResponseDto> getAllLocations();

	    LocationResponseDto getLocationById(Integer id);

	    void deleteLocation(Integer id);
}
