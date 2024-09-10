package a107.cardmore.util.recommend;

import a107.cardmore.domain.bank.service.BankModuleService;
import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.card.repository.CardRepository;
import a107.cardmore.domain.card.service.CardModuleService;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.repository.UserRepository;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.CardBenefitsInfo;
import a107.cardmore.util.api.dto.card.CardProductResponseRestTemplateDto;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final RestTemplateUtil restTemplateUtil;
    private final CardModuleService cardModuleService;
    private final CardRepository cardRepository;
    private final BankModuleService bankModuleService;
    private final UserModuleService userModuleService;
    private final UserRepository userRepository;

    public Map<MapRequestDto, List<CardProductResponseRestTemplateDto>> discountCardRecommend(List<MapRequestDto> mapRequestDto, Long userId) {
        User user = userRepository.findById(userId).orElse(null);   //Todo: moduleService로 바꾸기
        List<CardResponseRestTemplateDto> userCardList = restTemplateUtil.inquireSignUpCreditCardList(
            user.getUserKey()); //유저의 카드 목록
        List<CardProductResponseRestTemplateDto> userCardListInfo = getUserCardListInfo(
            userCardList, userId); //혜택까지 담긴 유저의 카드 목록

        Map<MapRequestDto, List<CardProductResponseRestTemplateDto>> placeWithCard = new HashMap<>();

// 카드별 할인율 계산
        for (MapRequestDto place : mapRequestDto) {
            Map<CardProductResponseRestTemplateDto, Double> discountRate = new HashMap<>();

            for (CardProductResponseRestTemplateDto card : userCardListInfo) {
                List<CardBenefitsInfo> cardBenefitsInfo = card.getCardBenefitsInfo();

                for (CardBenefitsInfo benefitsInfo : cardBenefitsInfo) {
                    if (benefitsInfo.getCategoryId().equals(place.getMerchantCategory().getValue())) {
                        discountRate.put(card, benefitsInfo.getDiscountRate());
                    }
                }
            }

            // discountRate에서 상위 3개의 카드 추출
            List<CardProductResponseRestTemplateDto> topCards = discountRate.entrySet().stream()
                .sorted(Map.Entry.<CardProductResponseRestTemplateDto, Double>comparingByValue().reversed())
                .limit(3) // 상위 3개
                .map(Map.Entry::getKey) // 카드만 추출
                .collect(Collectors.toList());

            // 상위 3개의 카드를 placeWithCard에 넣기 (3개가 안되면 있는 만큼)
            placeWithCard.put(place, topCards);
        }


        // discountRate를 DiscountRate(Double) 기준으로 내림차순 정렬 후 상위 3개 추출
        return placeWithCard;
    }


    /**
     * 유저의 모든 카드목록중 선택한 카드를 카드 상품과 매핑하여 리턴해주는 메서드
     * @param userCardList : 금융 API에 저장되어있는 유저의 카드 목록
     * @return isSelected가 true인 카드들을 카드 상품과 매핑하여 혜택정보까지 담은 list를 리턴
     */
    public List<CardProductResponseRestTemplateDto> getUserCardListInfo(List<CardResponseRestTemplateDto> userCardList, Long userId){
        // userId로 조회한 카드 리스트
        List<Card> userOwnedCards = cardRepository.findCardsByUserId(userId);   //TODO: moduleService로 교체

        // userOwnedCards의 cardNo와 userCardList의 cardUniqueNo가 일치하는 userCardList만 필터링 + 한도가 남아있는
        List<CardResponseRestTemplateDto> filteredUserCardList = userCardList.stream()
            .filter(userCard -> userOwnedCards.stream()
                .anyMatch(ownedCard -> ownedCard.getCardNo().equals(userCard.getCardUniqueNo())))
            .toList();

        //모든 카드목록 조회
        List<CardProductResponseRestTemplateDto> creditCardList = restTemplateUtil.inquireCreditCardList();

        return creditCardList.stream()
            .filter(creditCard -> userCardList.stream()
                .anyMatch(userCard -> userCard.getCardUniqueNo().equals(creditCard.getCardUniqueNo())))
            .collect(Collectors.toList());
    }
}
