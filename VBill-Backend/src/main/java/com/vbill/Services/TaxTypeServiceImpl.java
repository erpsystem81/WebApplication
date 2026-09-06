package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.vbill.DTOS.TaxTypeRequestDto;
import com.vbill.DTOS.TaxTypeResponseDto;
import com.vbill.Models.TaxType;
import com.vbill.Repositories.TaxTypeRepo;

@Service
public class TaxTypeServiceImpl implements TaxTypeService{
	private final TaxTypeRepo repo;

    public TaxTypeServiceImpl(TaxTypeRepo repo) {
        this.repo = repo;
    }

    public TaxTypeResponseDto save(TaxTypeRequestDto dto) {

        TaxType entity = new TaxType();

        entity.setTax_type_name(dto.getTaxTypeName());
        entity.setTax_type_code(dto.getTaxTypeCode());
        entity.setIs_split_applicable(dto.getIsSplitApplicable());
        entity.setStatus(dto.getStatus());

        return convert(repo.save(entity));
    }

    public TaxTypeResponseDto update(Integer id, TaxTypeRequestDto dto) {

        TaxType entity = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tax Type not found"));

        entity.setTax_type_name(dto.getTaxTypeName());
        entity.setTax_type_code(dto.getTaxTypeCode());
        entity.setIs_split_applicable(dto.getIsSplitApplicable());
        entity.setStatus(dto.getStatus());

        return convert(repo.save(entity));
    }

    public List<TaxTypeResponseDto> getAll() {

        return repo.findAll()
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    
    public TaxTypeResponseDto getById(Integer id) {

        return convert(
                repo.findById(id)
                        .orElseThrow(() -> new RuntimeException("Tax Type not found"))
        );
    }

    public void delete(Integer id) {

        repo.deleteById(id);

    }

    private TaxTypeResponseDto convert(TaxType entity) {

        TaxTypeResponseDto dto = new TaxTypeResponseDto();

        dto.setTaxTypeId(entity.getTax_type_id());
        dto.setTaxTypeName(entity.getTax_type_name());
        dto.setTaxTypeCode(entity.getTax_type_code());
        dto.setIsSplitApplicable(entity.getIs_split_applicable());
        dto.setStatus(entity.getStatus());

        return dto;
    }
}
