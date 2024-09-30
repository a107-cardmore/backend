package a107.cardmore.util.recommend;

import a107.cardmore.domain.bank.service.BankModuleService;
import a107.cardmore.domain.card.dto.CardBenefitResponseDto;
import a107.cardmore.domain.card.dto.CardResponseDto;
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
import a107.cardmore.util.api.dto.card.InquireBillingStatementsRequestRestTemplateDto;
import a107.cardmore.util.api.dto.card.InquireBillingStatementsResponseRestTemplateDto;
import a107.cardmore.util.api.dto.card.InquireCreditCardTransactionListRequestRestTemplateDto;
import a107.cardmore.util.api.dto.card.InquireCreditCardTransactionListResponseRestTemplateDto;
import a107.cardmore.util.api.dto.card.Transaction;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private static final Logger log = LoggerFactory.getLogger(RecommendService.class);
    private final RestTemplateUtil restTemplateUtil;
    private final CardModuleService cardModuleService;
    private final CardRepository cardRepository;
    private final BankModuleService bankModuleService;
    private final UserModuleService userModuleService;
    private final UserRepository userRepository;

    public List<MapResponseDto> discountCardRecommend(List<MapRequestDto> mapRequestDtoList, Long userId) {
        User user = userRepository.findById(userId).orElse(null);   //Todo: moduleService로 바꾸기
        List<CardResponseRestTemplateDto> userCardList = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey()); //유저의 카드 목록
        List<CardResponseDto> userCardListInfo = getUserCardListInfo(userCardList, userId); //혜택까지 담긴 유저의 카드 목록

        List<MapResponseDto> placeWithCard = new ArrayList<>();

        // 카드별 할인율 계산
        for (MapRequestDto place : mapRequestDtoList) {
            Map<CardResponseDto, Double> discountRate = new HashMap<>();

            for (CardResponseDto card : userCardListInfo) {
                List<CardBenefitResponseDto> cardBenefitsInfo = card.getCardBenefits();

                for (CardBenefitResponseDto benefitsInfo : cardBenefitsInfo) {
                    if (benefitsInfo.getCategoryId().equals(place.getMerchantCategory().getValue())) {
                        discountRate.put(card, benefitsInfo.getDiscountRate());
                    }
                }
            }

            // discountRate 정렬
            List<CardResponseDto> topCards = discountRate.entrySet().stream()
                .sorted(Map.Entry.<CardResponseDto, Double>comparingByValue().reversed())
                .map(Map.Entry::getKey) // 카드만 추출
                .collect(Collectors.toList());

            // MapResponseDto로 매핑
            MapResponseDto mapResponseDto = MapResponseDto.builder()
                .name(place.getName())
                .merchantCategory(place.getMerchantCategory())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .build();

            if (!topCards.isEmpty()) {
                CardResponseDto topCard = topCards.get(0); // 상위 첫 번째 카드

                // topCard의 혜택 정보를 돌면서 일치하는 카테고리를 찾음
                topCard.getCardBenefits().stream()
                    .filter(benefitsInfo -> benefitsInfo.getCategoryId().equals(place.getMerchantCategory().getValue()))
                    .findFirst() // 일치하는 첫 번째 혜택 정보 찾기
                    .ifPresent(benefitsInfo -> {
                        // merchantCategory와 discountRate를 합친 문자열 생성
                        String discountRateString = benefitsInfo.getMerchantCategory() + " " + benefitsInfo.getDiscountRate().intValue() + "%";
                        // mapResponseDto에 discountDescription 설정
                        mapResponseDto.setDiscountRate(discountRateString);
                    });

                // 각 카드를 복사해서 새로운 리스트에 저장
                List<CardResponseDto> updatedCards = new ArrayList<>();
                for (CardResponseDto card : topCards) {
                    StringBuilder descriptionBuilder = new StringBuilder();

                    List<CardBenefitResponseDto> benefits = new ArrayList<>(card.getCardBenefits());

                    // 먼저 place.merchantCategory와 일치하는 혜택을 추가
                    benefits.stream()
                        .filter(benefitsInfo -> benefitsInfo.getCategoryId()
                            .equals(place.getMerchantCategory().getValue()))
                        .findFirst()
                        .ifPresent(benefitsInfo -> {
                            descriptionBuilder.append(benefitsInfo.getMerchantCategory())
                                .append(" ")
                                .append(benefitsInfo.getDiscountRate())
                                .append("% 할인, ");
                            benefits.remove(benefitsInfo); // 일치하는 혜택은 리스트에서 제거
                        });

                    // 나머지 혜택을 할인율 순으로 정렬하여 추가
                    benefits.stream()
                        .sorted(Comparator.comparingDouble(CardBenefitResponseDto::getDiscountRate).reversed())
                        .forEach(benefitsInfo -> {
                            descriptionBuilder.append(benefitsInfo.getMerchantCategory())
                                .append(" ")
                                .append(benefitsInfo.getDiscountRate())
                                .append("% 할인, ");
                        });

                    // 마지막에 추가된 ", " 제거
                    if (!descriptionBuilder.isEmpty()) {
                        descriptionBuilder.setLength(descriptionBuilder.length() - 2);  // 끝에서 두 글자(", ")를 제거
                    }

                    // CardResponseDto 복사하여 description 추가
                    CardResponseDto copiedCard = CardResponseDto.builder()
                        .cardId(card.getCardId())
                        .companyId(card.getCompanyId())
                        .companyName(card.getCompanyName())
                        .cardNo(card.getCardNo())
                        .cardName(card.getCardName())
                        .cardUniqueNo(card.getCardUniqueNo())
                        .cvc(card.getCvc())
                        .cardExpiryDate(card.getCardExpiryDate())
                        .cardDescription(descriptionBuilder.toString()) // 복사본에 description 추가
                        .colorBackground(card.getColorBackground())
                        .colorTitle(card.getColorTitle())
                        .isSelected(card.getIsSelected())
                        .limitRemaining(card.getLimitRemaining())
                        .performanceRemaining(card.getPerformanceRemaining())
                        .cardBenefits(card.getCardBenefits())  // 기존 혜택 복사
                        .build();

                    updatedCards.add(copiedCard);  // 복사된 카드 추가
                }

                mapResponseDto.setCardInfos(updatedCards);
                placeWithCard.add(mapResponseDto);  // 최종 MapResponseDto를 placeWithCard에 추가
            }
        }
        return placeWithCard;

    }

    /**
     * 유저의 모든 카드목록중 선택한 카드를 카드 상품과 매핑하여 리턴해주는 메서드
     * @param userCardList : 금융 API에 저장되어있는 유저의 카드 목록
     * @return isSelected가 true인 카드들을 카드 상품과 매핑하여 혜택정보까지 담은 CardResponseDto 리턴
     */
    public List<CardResponseDto> getUserCardListInfo(List<CardResponseRestTemplateDto> userCardList, Long userId) {
        // userId로 조회한 카드 리스트
        List<Card> userOwnedCards = cardRepository.findCardsByUserId(userId);   //TODO: moduleService로 교체

        //모든 카드목록 조회
        List<CardProductResponseRestTemplateDto> creditCardList = restTemplateUtil.inquireCreditCardList();

        return creditCardList.stream()
            .filter(creditCard -> userCardList.stream()
                .anyMatch(userCard -> userCard.getCardUniqueNo().equals(creditCard.getCardUniqueNo())))
            .map(creditCard -> {
                // 유저가 소유한 카드와 매칭되는 카드 찾기
                Card matchedCard = userOwnedCards.stream()
                    .filter(userCard -> userCard.getCardUniqueNo().equals(creditCard.getCardUniqueNo()))
                    .findFirst()
                    .orElse(null);

                // 카드와 카드 상품 정보를 바탕으로 CardResponseDto 생성
                if (matchedCard != null) {
                    return new CardResponseDto(matchedCard, creditCard);
                } else {
                    return null; // 매칭되는 카드가 없으면 null 반환
                }
            })
            .filter(Objects::nonNull) // null 값은 제외
            .collect(Collectors.toList());
    }

    public void recommendNewCard(Long userId){
        User user = userRepository.findById(userId).orElse(null);   //Todo: moduleService로 바꾸기
        //모든 카드 리스트
        List<CardProductResponseRestTemplateDto> cardList = restTemplateUtil.inquireCreditCardList();
        //유저 카드 리스트
        List<CardResponseRestTemplateDto> userCardList = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());
        //혜택까지 담긴 유저 카드 리스트
        List<CardResponseDto> userCardListInfo = getUserCardListInfo(userCardList, userId);

        for (CardResponseDto card : userCardListInfo) {
            String startMonth = getLastMonth(); //청구 시작달 현재 달
            String endMonth = getCurrentMonth(); //청구 끝나는 달
            InquireCreditCardTransactionListRequestRestTemplateDto cardInfo //청구 카드 정보
                = new InquireCreditCardTransactionListRequestRestTemplateDto(card.getCardNo(),card.getCvc(),startMonth,endMonth);

            //소비 정보
            InquireCreditCardTransactionListResponseRestTemplateDto consumeInfo = restTemplateUtil.inquireCreditCardTransactionList(
                user.getUserKey(), cardInfo);

            //해당 카드의 소비 내역
            List<Transaction> transactionList = consumeInfo.getTransactionList();

            // 카드별 소비 돌면서 추천해줄 카드랑 비교하기
            // TODO: MAP으로 저장해두기
            for(CardProductResponseRestTemplateDto newCard: cardList){
                int discountMoney = 0;
                List<CardBenefitsInfo> cardBenefitsInfo = newCard.getCardBenefitsInfo();
                for(Transaction transaction: transactionList){
                    String categoryId = transaction.getCategoryId();
                    for(CardBenefitsInfo benefitsInfo : cardBenefitsInfo){
                        if(benefitsInfo.getCategoryId().equals(categoryId)){
                            discountMoney += (int) (transaction.getTransactionBalance() * benefitsInfo.getDiscountRate());
                        }

                    }
                }
            }
        }


    }

    public String getLastMonth() {
        // 과거 날짜 가져오기
        LocalDate lastDate = LocalDate.now().minusMonths(1);

        // 과거 달을 YYYYMM 형식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");
        return lastDate.format(formatter);
    }

    public String getCurrentMonth() {
        //현재 달 계산
        LocalDate currentMonth = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");

        return currentMonth.format(formatter);
    }

}
