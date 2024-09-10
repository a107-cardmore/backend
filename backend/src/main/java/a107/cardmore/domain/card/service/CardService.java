package a107.cardmore.domain.card.service;

import a107.cardmore.domain.card.dto.CompanyCardListResponseDto;
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

    public List<CompanyCardListResponseDto> getUserAllCardInfo(String email){
        User user  = userModuleService.getUserByEmail(email);
        List<CardResponseRestTemplateDto> cardResponseInfos = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());

        List<CompanyCardListResponseDto> companyCardListResponseDtos = new ArrayList<>();

        // 카드 정보 저장
        for(CardResponseRestTemplateDto cardResponseRestTemplateDto : cardResponseInfos){
            restTemplateUtil.inquireCreditCardList();
            CompanyCardListResponseDto companyCardListResponseDto = new CompanyCardListResponseDto();
            companyCardListResponseDtos.add(companyCardListResponseDto);
        }



        return null;
    }

}
