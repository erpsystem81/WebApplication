package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.StateRequestDto;
import com.vbill.DTOS.StateResponseDto;
import com.vbill.Models.Country;
import com.vbill.Models.State;
import com.vbill.Repositories.CountryRepo;
import com.vbill.Repositories.StateRepo;

@Service
public class StateServiceImpl implements StateService {

    @Autowired
    private StateRepo stateRepo;

    @Autowired
    private CountryRepo countryRepo;

    @Override
    public StateResponseDto saveState(StateRequestDto request) {

        State state = new State();

        setStateData(state, request);

        return mapToResponse(stateRepo.save(state));
    }

    @Override
    public StateResponseDto updateState(Integer id, StateRequestDto request) {

        State state = stateRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("State not found"));

        setStateData(state, request);

        return mapToResponse(stateRepo.save(state));
    }

    @Override
    public List<StateResponseDto> getAllStates() {

        return stateRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public StateResponseDto getStateById(Integer id) {

        State state = stateRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("State not found"));

        return mapToResponse(state);
    }

    @Override
    public void deleteState(Integer id) {

        stateRepo.deleteById(id);
    }

    private void setStateData(State state, StateRequestDto request) {

        state.setState_name(request.getStateName());
        state.setState_code(request.getStateCode());
        state.setIs_inactive(request.getIsInactive());
        state.setStatus(request.getStatus());

        Country country = countryRepo.findById(request.getCountryId())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        state.setCountry(country);
    }

    private StateResponseDto mapToResponse(State state) {

        StateResponseDto dto = new StateResponseDto();

        dto.setStateId(state.getState_id());
        dto.setStateName(state.getState_name());
        dto.setStateCode(state.getState_code());
        dto.setIsInactive(state.getIs_inactive());
        dto.setStatus(state.getStatus());

        dto.setCountryId(state.getCountry().getCountry_id());
        dto.setCountryName(state.getCountry().getCountry_name());

        return dto;
    }
    
    @Override
    public List<StateResponseDto> getStatesByCountry(Integer countryId) {

        List<State> states = stateRepo.findByCountryId(countryId);

        return states.stream().map(this::mapToResponse).toList();
    }
}