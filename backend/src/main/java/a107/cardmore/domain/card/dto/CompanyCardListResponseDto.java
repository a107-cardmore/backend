package a107.cardmore.domain.card.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyCardListResponseDto {
    private String companyId;
    private String companyName;
    private Boolean isSelected;

//    private List<CardResponseDto> cards;
}
