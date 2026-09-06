package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.UnitRequestDto;
import com.vbill.DTOS.UnitResponseDto;
import com.vbill.Models.Unit;
import com.vbill.Repositories.UnitRepo;

@Service
public class UnitServiceImpl implements UnitService{
	@Autowired
    private UnitRepo unitRepo;

    @Override
    public UnitResponseDto saveUnit(UnitRequestDto request) {

        Unit unit = new Unit();

        setUnitData(unit, request);

        return mapToResponse(unitRepo.save(unit));
    }

    @Override
    public UnitResponseDto updateUnit(Integer id, UnitRequestDto request) {

        Unit unit = unitRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        setUnitData(unit, request);

        return mapToResponse(unitRepo.save(unit));
    }

    @Override
    public List<UnitResponseDto> getAllUnits() {

        return unitRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UnitResponseDto getUnitById(Integer id) {

        Unit unit = unitRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        return mapToResponse(unit);
    }

    @Override
    public void deleteUnit(Integer id) {

        unitRepo.deleteById(id);
    }

    private void setUnitData(Unit unit, UnitRequestDto request) {

        unit.setUnit_name(request.getUnitName());
        unit.setUnit_code(request.getUnitCode());
        unit.setUnit_type(request.getUnitType());

        unit.setIs_base_unit(request.getIsBaseUnit());
        unit.setConversion_factor(request.getConversionFactor());
        unit.setDecimal_places(request.getDecimalPlaces());
        unit.setAllow_fraction(request.getAllowFraction());
        unit.setStatus(request.getStatus());
        unit.setIs_inactive(request.getIsInactive());

        if (Boolean.TRUE.equals(request.getIsBaseUnit())) {

            unit.setBaseUnit(null);

        } else {

            if (request.getBaseUnitId() == null) {
                throw new RuntimeException("Base Unit is required.");
            }

            Unit baseUnit = unitRepo.findById(request.getBaseUnitId())
                    .orElseThrow(() -> new RuntimeException("Base Unit not found"));

            unit.setBaseUnit(baseUnit);
        }
    }

    private UnitResponseDto mapToResponse(Unit unit) {

        UnitResponseDto dto = new UnitResponseDto();

        dto.setUnitId(unit.getUnit_id());
        dto.setUnitName(unit.getUnit_name());
        dto.setUnitCode(unit.getUnit_code());
        dto.setUnitType(unit.getUnit_type());

        dto.setIsBaseUnit(unit.getIs_base_unit());
        dto.setConversionFactor(unit.getConversion_factor());
        dto.setDecimalPlaces(unit.getDecimal_places());
        dto.setAllowFraction(unit.getAllow_fraction());
        dto.setStatus(unit.getStatus());
        dto.setIsInactive(unit.getIs_inactive());

        if (unit.getBaseUnit() != null) {
            dto.setBaseUnitId(unit.getBaseUnit().getUnit_id());
            dto.setBaseUnitName(unit.getBaseUnit().getUnit_name());
        }

        return dto;
    }
}
