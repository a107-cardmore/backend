package a107.cardmore.domain.card.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class SelectedResponseDto {
    private List<SelectedInfo> companiesSelectedInfos;
    private List<SelectedInfo> cardsSelectedInfos;
}
