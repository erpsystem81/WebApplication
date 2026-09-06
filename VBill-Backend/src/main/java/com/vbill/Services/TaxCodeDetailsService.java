package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.TaxCodeDetailsRequestDto;
import com.vbill.DTOS.TaxCodeDetailsResponseDto;

public interface TaxCodeDetailsService {
	TaxCodeDetailsResponseDto save(TaxCodeDetailsRequestDto dto);

    TaxCodeDetailsResponseDto update(Integer id, TaxCodeDetailsRequestDto dto);

    List<TaxCodeDetailsResponseDto> getAll();

    TaxCodeDetailsResponseDto getById(Integer id);

    void delete(Integer id);
}
