package com.vbill.Services;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbill.DTOS.BusinessInfoRequestDto;
import com.vbill.DTOS.BusinessInfoResponseDto;
import com.vbill.Models.BusinessInfo;
import com.vbill.Models.City;
import com.vbill.Models.Country;
import com.vbill.Models.State;
import com.vbill.Repositories.BusinessInfoRepo;
import com.vbill.Repositories.CityRepo;
import com.vbill.Repositories.CountryRepo;
import com.vbill.Repositories.StateRepo;

@Service
public class BusinessInfoServiceImpl implements BusinessInfoService{
	@Autowired
    private BusinessInfoRepo businessInfoRepo;

    @Autowired
    private CityRepo cityRepo;

    @Autowired
    private StateRepo stateRepo;

    @Autowired
    private CountryRepo countryRepo;

    @Override
    public BusinessInfoResponseDto saveBusinessInfo(BusinessInfoRequestDto request) {

        BusinessInfo business = new BusinessInfo();

        setBusinessData(business, request);

        business = businessInfoRepo.save(business);

        return convertToResponse(business);
    }

    @Override
    public BusinessInfoResponseDto updateBusinessInfo(Integer id, BusinessInfoRequestDto request) {

        BusinessInfo business = businessInfoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Business Info not found"));

        setBusinessData(business, request);

        business = businessInfoRepo.save(business);

        return convertToResponse(business);
    }

    @Override
    public BusinessInfoResponseDto getBusinessInfoById(Integer id) {

        BusinessInfo business = businessInfoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Business Info not found"));

        return convertToResponse(business);
    }

    @Override
    public List<BusinessInfoResponseDto> getAllBusinessInfo() {

        return businessInfoRepo.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public String deleteBusinessInfo(Integer id) {

        BusinessInfo business = businessInfoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Business Info not found"));

        businessInfoRepo.delete(business);

        return "Business Info Deleted Successfully";
    }

    //============================================

    private void setBusinessData(BusinessInfo business, BusinessInfoRequestDto request) {

        business.setName(request.getName());
        business.setOwner_first_name(request.getOwnerFirstName());
        business.setOwner_last_name(request.getOwnerLastName());
        business.setTax_id(request.getTaxId());
        business.setPhone_no(request.getPhoneNo());
        business.setAlt_phone_no(request.getAltPhoneNo());
        business.setEmail(request.getEmail());
        business.setAddress(request.getAddress());
        business.setZip_code(request.getZipCode());
        business.setTerms_and_conditions(request.getTermsAndConditions());

        // Convert Base64 String to byte[]
        if (request.getBusinessLogo() != null && !request.getBusinessLogo().isBlank()) {
            business.setBusinessLogo(
                    Base64.getDecoder().decode(request.getBusinessLogo()));
        }

        City city = cityRepo.findById(request.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        State state = stateRepo.findById(request.getStateId())
                .orElseThrow(() -> new RuntimeException("State not found"));

        Country country = countryRepo.findById(request.getCountryId())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        business.setCity(city);
        business.setState(state);
        business.setCountry(country);
    }

    //============================================

    private BusinessInfoResponseDto convertToResponse(BusinessInfo business) {

        BusinessInfoResponseDto response = new BusinessInfoResponseDto();

        response.setCompanyInfoId(business.getCompany_info_id());
        response.setName(business.getName());
        response.setOwnerFirstName(business.getOwner_first_name());
        response.setOwnerLastName(business.getOwner_last_name());
        response.setTaxId(business.getTax_id());
        response.setPhoneNo(business.getPhone_no());
        response.setAltPhoneNo(business.getAlt_phone_no());
        response.setEmail(business.getEmail());
        response.setAddress(business.getAddress());
        response.setZipCode(business.getZip_code());
        response.setTermsAndConditions(business.getTerms_and_conditions());

        if (business.getBusinessLogo() != null) {
            response.setBusinessLogo(Base64.getEncoder().encodeToString(business.getBusinessLogo()));
        }

        response.setCityId(business.getCity().getCity_id());
        response.setCityName(business.getCity().getCity_name());

        response.setStateId(business.getState().getState_id());
        response.setStateName(business.getState().getState_name());

        response.setCountryId(business.getCountry().getCountry_id());
        response.setCountryName(business.getCountry().getCountry_name());

        return response;
    }

}
