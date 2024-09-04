package a107.cardmore.domain.bank.dto;

import a107.cardmore.util.constant.CardCompany;
import a107.cardmore.util.constant.MerchantCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateCardProductRequestDto {
    private CardCompany cardCompany;
    private String cardName;
    private Long baseLinePerformance;
    private Long maxBenefitLimit;
    private String cardDescription;
    private List<CardBenefit> cardBenefits;
}