package a107.cardmore.domain.card.service;

import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.card.repository.CardRepository;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.repository.CompanyRepository;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardModuleService {
    private final CardRepository cardRepository;
    private final CompanyRepository companyRepository;

    public void saveCard(Company company, CardResponseRestTemplateDto cardResponseInfo){
        cardRepository.save(Card.builder()
                        .company(company)
                        .cardNo(cardResponseInfo.getCardNo())
                        .cardUniqueNo(cardResponseInfo.getCardUniqueNo())
                        .limitRemaining(cardResponseInfo.getMaxBenefitLimit())
                        .performanceRemaining(cardResponseInfo.getBaselinePerformance())
                .build());
    }

    public List<Card> findCardByUser(User user){
        List<Company> companies = companyRepository.findAllByUser(user);
        List<Card> myCards = new ArrayList<>();
        for(Company company : companies){
            myCards.addAll(cardRepository.findAllByCompany(company));
        }
        return myCards;
    }

}
