package a107.cardmore.util.api.dto.card;

import a107.cardmore.domain.bank.dto.CardBenefit;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateCardProductRequestRestTemplateDto {
    private String cardIssuerCode;
    private String cardName;
    private Long baseLinePerformance;
    private Long maxBenefitLimit;
    private String cardDescription;
    private List<CardBenefit> cardBenefits;
}
