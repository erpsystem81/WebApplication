package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.TaxTypeRequestDto;
import com.vbill.DTOS.TaxTypeResponseDto;

public interface TaxTypeService {
	 TaxTypeResponseDto save(TaxTypeRequestDto dto);

	    TaxTypeResponseDto update(Integer id, TaxTypeRequestDto dto);

	    List<TaxTypeResponseDto> getAll();

	    TaxTypeResponseDto getById(Integer id);

	    void delete(Integer id);
}
