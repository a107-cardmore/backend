package a107.cardmore.domain.company.dto;

import a107.cardmore.domain.card.dto.SelectedInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateCompanyRequestDto {
    Long id;
    Boolean isSelected;
}
