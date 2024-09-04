package a107.cardmore.util.api.dto.card;

import lombok.Getter;
import lombok.Setter;
//import a107.cardmore.util.api.dto.card.CardBenefitInfo;

import java.util.List;

@Getter
@Setter
public class CardProductResponseRestTemplateDto {
    private String cardUniqueNo;
    private String cardIssuerCode;
    private String cardIssuerName;
    private String cardName;
    private String cardTypeCode;
    private String cardTypeName;
    private Long baselinePerformance;
    private Long maxBenefitLimit;
    private String cardDescription;
    private List<CardBenefitInfo> cardBenefitInfo;
}