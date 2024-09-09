package a107.cardmore.domain.card.service;

import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.card.repository.CardRepository;
import a107.cardmore.domain.company.entity.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardModuleService {
    private final CardRepository cardRepository;

    public void saveCard(Company company, String cardNo, Long limitRemaining, Long performanceRemaining){
        cardRepository.save(Card.builder()
                        .company(company)
                        .cardNo(cardNo)
                        .limitRemaining(limitRemaining)
                        .performanceRemaining(performanceRemaining)
                .build());
    }

}
