package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.LocationRequestDto;
import com.vbill.DTOS.LocationResponseDto;
import com.vbill.Models.City;
import com.vbill.Models.Country;
import com.vbill.Models.Location;
import com.vbill.Models.State;
import com.vbill.Repositories.CityRepo;
import com.vbill.Repositories.CountryRepo;
import com.vbill.Repositories.LocationRepo;
import com.vbill.Repositories.StateRepo;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepo locationRepo;

    @Autowired
    private CountryRepo countryRepo;

    @Autowired
    private StateRepo stateRepo;

    @Autowired
    private CityRepo cityRepo;

    @Override
    public LocationResponseDto saveLocation(LocationRequestDto request) {

        Location location = new Location();

        setLocationData(location, request);

        return mapToResponse(locationRepo.save(location));
    }

    @Override
    public LocationResponseDto updateLocation(Integer id, LocationRequestDto request) {

        Location location = locationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        setLocationData(location, request);

        return mapToResponse(locationRepo.save(location));
    }

    @Override
    public List<LocationResponseDto> getAllLocations() {

        return locationRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LocationResponseDto getLocationById(Integer id) {

        return mapToResponse(locationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found")));
    }

    @Override
    public void deleteLocation(Integer id) {

        locationRepo.deleteById(id);
    }

    private void setLocationData(Location location, LocationRequestDto request) {

        location.setName(request.getName());
        location.setIs_inactive(request.getIsInactive());
        location.setStatus(request.getStatus());
        location.setIs_default_location(request.getIsDefaultLocation());

        Country country = countryRepo.findById(request.getCountryId())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        State state = stateRepo.findById(request.getStateId())
                .orElseThrow(() -> new RuntimeException("State not found"));

        City city = cityRepo.findById(request.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        location.setCountry(country);
        location.setState(state);
        location.setCity(city);

        if (request.getParentLocationId() != null) {

            Location parent = locationRepo.findById(request.getParentLocationId())
                    .orElseThrow(() -> new RuntimeException("Parent Location not found"));

            location.setParentLocation(parent);

        } else {

            location.setParentLocation(null);
        }
    }

    private LocationResponseDto mapToResponse(Location location) {

        LocationResponseDto dto = new LocationResponseDto();

        dto.setLocationId(location.getLocation_id());
        dto.setName(location.getName());
        dto.setIsInactive(location.getIs_inactive());
        dto.setStatus(location.getStatus());
        dto.setIsDefaultLocation(location.getIs_default_location());

        dto.setCountryId(location.getCountry().getCountry_id());
        dto.setCountryName(location.getCountry().getCountry_name());

        dto.setStateId(location.getState().getState_id());
        dto.setStateName(location.getState().getState_name());

        dto.setCityId(location.getCity().getCity_id());
        dto.setCityName(location.getCity().getCity_name());

        if (location.getParentLocation() != null) {
            dto.setParentLocationId(location.getParentLocation().getLocation_id());
            dto.setParentLocationName(location.getParentLocation().getName());
        }

        return dto;
    }
}