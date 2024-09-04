package a107.cardmore.util.api.dto.card;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CardBenefitInfo {
    private String categoryId;
    private String categoryName;
    private Double discountRate;
}
