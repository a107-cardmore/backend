package a107.cardmore.domain.card.service;

import a107.cardmore.domain.card.dto.CompanyCardListResponseDto;
import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.service.CompanyModuleService;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.CardProductResponseRestTemplateDto;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CardService {
    private final RestTemplateUtil restTemplateUtil;
    private final UserModuleService userModuleService;
    private final CompanyModuleService companyModuleService;
    private final CardModuleService cardModuleService;

    public List<CompanyCardListResponseDto> getUserAllCardInfo(String email){
        User user  = userModuleService.getUserByEmail(email);
        List<CardResponseRestTemplateDto> myCards = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());
        List<CardProductResponseRestTemplateDto> cards = restTemplateUtil.inquireCreditCardList();

        // myCards와 Card Repository update
        updateUserCards(myCards, cardModuleService.findCardByUser(user));

        // 카드사 정보 list로 만들어 놓기
        List<Card> userCards = cardModuleService.findCardByUser(user);
        List<CompanyCardListResponseDto> companyCards = new ArrayList<>();

        for(Company company : companyModuleService.findUserCompanies(user)){
            CompanyCardListResponseDto companyCard = new CompanyCardListResponseDto();

            // 같은 카드사 카드 정보 저장
            List<Card> userCompanyCards = userCards.stream()
                    .filter(userCard -> userCard.getCompany().equals(company))
                    .collect(Collectors.toList());

            companyCard.addCards(company, userCompanyCards, cards);
            companyCards.add(companyCard);
        }
        return companyCards;
    }

    private void updateUserCards(List<CardResponseRestTemplateDto> myCards, List<Card> userCards){
        System.out.println("userCards : " +  userCards.toString());
        System.out.println("myCards : " +  myCards.toString());

        List<String> existingCardNos = userCards.stream()
                .map(Card::getCardNo)
                .collect(Collectors.toList());

        myCards.stream()
                .filter(myCard -> !existingCardNos.contains(myCard.getCardNo()))
                .forEach(myCard -> {
                    // userCards에서 myCard의 cardNo와 같은 값을 가진 Company 찾기
                    Company company = userCards.stream()
                            .filter(userCard -> userCard.getCardNo().equals(myCard.getCardNo()))
                            .map(Card::getCompany)
                            .findFirst()
                            .orElse(null); // 해당 cardNo에 맞는 회사가 없으면 null 반환

                    if (company != null) {
                        System.out.println("in:" + myCard.getCardNo());
                        cardModuleService.saveCard(company, myCard);
                    }
                });
    }
}
