package a107.cardmore.domain.discount.service;

import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.discount.dto.DiscountDetailDto;
import a107.cardmore.domain.discount.dto.DiscountDto;
import a107.cardmore.domain.discount.entity.Discount;
import a107.cardmore.domain.discount.repository.DiscountRepository;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.global.exception.BadRequestException;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiscountService {
    private final DiscountRepository discountRepository;
    private final UserModuleService userModuleService;
    private final RestTemplateUtil restTemplateUtil;

    public Long getTotalDiscountPrice(String email) {
        User user = userModuleService.getUserByEmail(email);
        return discountRepository.totalUserDiscountPrice(user, LocalDate.now().getYear(), LocalDate.now().getMonthValue());
    }

    public List<DiscountDetailDto> getTotalDiscountCardData(String email, Integer year, Integer month) {
        User user = userModuleService.getUserByEmail(email);

        List<Object[]> discounts = discountRepository.findAllByUserIdAndYearAndMonth(user.getId(),year, month);
        List<DiscountDetailDto> discountDtos = new ArrayList<>();
        List<CardResponseRestTemplateDto> cardResponseInfos = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());

        for(Object[] discount : discounts) {
            String merchantCategory = (String) discount[0];
            Card card = (Card) discount[1];
            Long totalPrice = (Long) discount[2];
            String cardName = cardResponseInfos.stream().filter(cardResponseInfo -> cardResponseInfo.getCardNo().equals(card.getCardNo())).findFirst().map(CardResponseRestTemplateDto::getCardName)
                    .orElseThrow(() -> new BadRequestException("카드 이름을 찾을 수 없습니다."));

            discountDtos.add(DiscountDetailDto.builder()
                            .cardId(card.getCardNo())
                            .cardName(cardName)
                            .merchantCategory(merchantCategory)
                            .colorTitle(card.getColorTitle())
                            .colorBackground(card.getColorBackground())
                            .price(totalPrice)
                    .build());
        }

        return discountDtos;
    }
}