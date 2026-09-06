package com.vbill.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.vbill.DTOS.TaxCodeDetailsRequestDto;
import com.vbill.DTOS.TaxCodeDetailsResponseDto;
import com.vbill.Models.TaxCode;
import com.vbill.Models.TaxCodeDetails;
import com.vbill.Repositories.TaxCodeDetailsRepo;
import com.vbill.Repositories.TaxCodeRepo;

@Service
public class TaxCodeDetailsServiceImpl implements TaxCodeDetailsService{
	private final TaxCodeDetailsRepo repo;
    private final TaxCodeRepo taxCodeRepo;

    public TaxCodeDetailsServiceImpl(
            TaxCodeDetailsRepo repo,
            TaxCodeRepo taxCodeRepo) {

        this.repo = repo;
        this.taxCodeRepo = taxCodeRepo;
    }

    public TaxCodeDetailsResponseDto save(TaxCodeDetailsRequestDto dto) {

        TaxCode taxCode = taxCodeRepo.findById(dto.getTaxCodeId())
                .orElseThrow(() -> new RuntimeException("Tax Code not found"));

        TaxCodeDetails entity = new TaxCodeDetails();

        entity.setTax_component(dto.getTaxComponent());
        entity.setTax_rate(dto.getTaxRate());
        entity.setStatus(dto.getStatus());
        entity.setIs_inactive(dto.getIsInactive());
        entity.setTaxCode(taxCode);

        return convert(repo.save(entity));
    }

    
    public TaxCodeDetailsResponseDto update(Integer id, TaxCodeDetailsRequestDto dto) {

        TaxCodeDetails entity = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        TaxCode taxCode = taxCodeRepo.findById(dto.getTaxCodeId())
                .orElseThrow(() -> new RuntimeException("Tax Code not found"));

        entity.setTax_component(dto.getTaxComponent());
        entity.setTax_rate(dto.getTaxRate());
        entity.setStatus(dto.getStatus());
        entity.setIs_inactive(dto.getIsInactive());
        entity.setTaxCode(taxCode);

        return convert(repo.save(entity));
    }

    public List<TaxCodeDetailsResponseDto> getAll() {

        return repo.findAll()
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    public TaxCodeDetailsResponseDto getById(Integer id) {

        return convert(
                repo.findById(id)
                        .orElseThrow(() -> new RuntimeException("Record not found"))
        );
    }

    public void delete(Integer id) {

        repo.deleteById(id);

    }

    private TaxCodeDetailsResponseDto convert(TaxCodeDetails entity) {

        TaxCodeDetailsResponseDto dto = new TaxCodeDetailsResponseDto();

        dto.setTaxComponentId(entity.getTax_component_id());
        dto.setTaxComponent(entity.getTax_component());
        dto.setTaxRate(entity.getTax_rate());

        dto.setStatus(entity.getStatus());
        dto.setIsInactive(entity.getIs_inactive());

        if (entity.getTaxCode() != null) {

            dto.setTaxCodeId(entity.getTaxCode().getTax_code_id());

            // change this if your TaxCode entity uses another getter
            dto.setTaxCodeName(entity.getTaxCode().getTax_code_name());

        }

        return dto;
    }
}
