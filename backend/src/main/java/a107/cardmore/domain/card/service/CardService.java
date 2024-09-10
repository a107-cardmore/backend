package a107.cardmore.domain.card.service;

import a107.cardmore.domain.card.dto.CardResponseDto;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CardService {
    private final RestTemplateUtil restTemplateUtil;
    private final UserModuleService userModuleService;

    public List<CardResponseDto> getUserAllCardInfo(String email){
        User user  = userModuleService.getUserByEmail(email);
        List<CardResponseRestTemplateDto> cardResponseInfos = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());

        List<CardResponseDto> cardResponseDtos = new ArrayList<>();

        // 카드 정보 저장
        for(CardResponseRestTemplateDto cardResponseRestTemplateDto : cardResponseInfos){
            restTemplateUtil.inquireCreditCardList();
            CardResponseDto cardResponseDto = new CardResponseDto();
            cardResponseDtos.add(cardResponseDto);
        }



        return null;
    }

}
