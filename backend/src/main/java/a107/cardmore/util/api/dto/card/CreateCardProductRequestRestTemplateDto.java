package a107.cardmore.util.api.dto.card;

import a107.cardmore.util.constant.CardCompany;
import a107.cardmore.util.constant.MerchantCategory;
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

@Getter
@Setter
class CardBenefit{
    private MerchantCategory merchantCategory;
    private String categoryName;
}
