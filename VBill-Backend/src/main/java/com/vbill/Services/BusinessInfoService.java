package com.vbill.Services;

import java.util.List;

import com.vbill.DTOS.BusinessInfoRequestDto;
import com.vbill.DTOS.BusinessInfoResponseDto;

public interface BusinessInfoService {
	BusinessInfoResponseDto saveBusinessInfo(BusinessInfoRequestDto request);

    BusinessInfoResponseDto updateBusinessInfo(Integer id, BusinessInfoRequestDto request);

    BusinessInfoResponseDto getBusinessInfoById(Integer id);

    List<BusinessInfoResponseDto> getAllBusinessInfo();

    String deleteBusinessInfo(Integer id);
}
