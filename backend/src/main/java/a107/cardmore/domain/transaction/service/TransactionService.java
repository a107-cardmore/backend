package a107.cardmore.domain.transaction.service;

import a107.cardmore.domain.bank.dto.InquireCreditCardTransactionListRequestDto;
import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.card.service.CardModuleService;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.service.CompanyModuleService;
import a107.cardmore.domain.transaction.dto.*;
import a107.cardmore.domain.transaction.mapper.TransactionMapper;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import a107.cardmore.util.api.dto.card.InquireCreditCardTransactionListResponseRestTemplateDto;
import a107.cardmore.util.constant.MerchantCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final RestTemplateUtil restTemplateUtil;
    private final TransactionMapper transactionMapper;
    private final UserModuleService userModuleService;
    private final CompanyModuleService companyModuleService;
    private final CardModuleService cardModuleService;

    public InquireTransactionResponseDto getTransactionList(String email) {

        InquireTransactionResponseDto inquireTransactionResponse = new InquireTransactionResponseDto();

        User user = userModuleService.getUserByEmail(email);

        List<Company> companyList = companyModuleService.findUserCompanies(user);
        inquireTransactionResponse.getCompanyNameList().addAll(companyList.stream().map(Company::getName).toList());

        List<Card> myCardList = cardModuleService.findCardByUser(user);
        List<CardResponseRestTemplateDto> inquireCardList = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());

        List<CardResponseRestTemplateDto> cardList = new ArrayList<>();

        for(CardResponseRestTemplateDto cardDto : inquireCardList) {
            for(Card card : myCardList) {
                if(Objects.equals(cardDto.getCardNo(), card.getCardNo())) {
                    cardList.add(cardDto);
                    break;
                }
            }
        }

        InquireCreditCardTransactionListRequestDto requestDto = new InquireCreditCardTransactionListRequestDto();

        LocalDate today = LocalDate.now();
        LocalDate startDate = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endDate = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        requestDto.setStartDate(startDate);
        requestDto.setEndDate(endDate);

        for(CardResponseRestTemplateDto card : cardList) {
            requestDto.setCardNo(card.getCardNo());
            requestDto.setCvc(card.getCvc());
            inquireTransactionResponse.getTransactionList().get(0).add(
                    transactionMapper.toTransactionDto(
                        restTemplateUtil.inquireCreditCardTransactionList(
                                user.getUserKey(),
                                transactionMapper.toInquireCreditCardTransactionListRequestRestTemplateDto(requestDto)
                        )
                    )
            );
        }

        for(String companyName: inquireTransactionResponse.getCompanyNameList()){

            List<TransactionDto> transactionList;

            if(companyName.equals("전체")){
                transactionList = inquireTransactionResponse.getTransactionList().get(0).stream().toList();
            }
            else{
                transactionList = inquireTransactionResponse.getTransactionList().get(0).stream().filter(s->s.getCategoryName().equals(companyName)).toList();
            }

            List<CategoryDto> categoryList = new ArrayList<>();
            for(MerchantCategory category: MerchantCategory.values()) {
                CategoryDto categoryDto = new CategoryDto();

                long balance = transactionList.stream().filter(s->s.getCategoryName().equals(category.getValue())).mapToLong(TransactionDto::getTransactionBalance).sum();
                if(balance>0){
                    categoryDto.setName(category.getValue());
                    categoryDto.setBalance(balance);
                    categoryList.add(categoryDto);
                }
            }

            inquireTransactionResponse.getCategoryList().add(categoryList);
        }

        return inquireTransactionResponse;
    }

    public CreateCreditCardTransactionResponseDto createCreditCardTransaction(String userKey, CreateCreditCardTransactionRequestDto requestDto){
        return transactionMapper.toCreateCreditCardTransactionResponseDto(restTemplateUtil.createCreditCardTransaction(userKey,transactionMapper.toCreateCreditCardTransactionRequestRestTemplateDto(requestDto)));
    }

}
