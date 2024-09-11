package a107.cardmore.domain.card.service;

import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.card.repository.CardRepository;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.repository.CompanyRepository;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.global.exception.BadRequestException;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<Card> findCardsByUser(User user){
        List<Company> companies = companyRepository.findAllByUser(user);
        return companies.stream().flatMap(company -> cardRepository.findAllByCompany(company).stream()).collect(Collectors.toList());
    }

    public Card findCardById(Long id){
        return cardRepository.findById(id).orElseThrow(() -> new BadRequestException("Card not found"));
    }
}
