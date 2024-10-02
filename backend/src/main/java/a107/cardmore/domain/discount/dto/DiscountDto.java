package a107.cardmore.domain.discount.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiscountDto {
    private List<DiscountDetailDto> REFUELING;
    private List<DiscountDetailDto> MARKET;
    private List<DiscountDetailDto> TRAFFIC;
    private List<DiscountDetailDto> FOREIGN;
    private List<DiscountDetailDto> LIFE;
}
