package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.StateRequestDto;
import com.vbill.DTOS.StateResponseDto;

public interface StateService {

    StateResponseDto saveState(StateRequestDto request);

    StateResponseDto updateState(Integer id, StateRequestDto request);

    List<StateResponseDto> getAllStates();

    StateResponseDto getStateById(Integer id);

    void deleteState(Integer id);
    List<StateResponseDto> getStatesByCountry(Integer countryId);

}