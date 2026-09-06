package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.UnitRequestDto;
import com.vbill.DTOS.UnitResponseDto;

public interface UnitService {
	UnitResponseDto saveUnit(UnitRequestDto request);

    UnitResponseDto updateUnit(Integer id, UnitRequestDto request);

    List<UnitResponseDto> getAllUnits();

    UnitResponseDto getUnitById(Integer id);

    void deleteUnit(Integer id);

}	
