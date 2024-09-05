package a107.cardmore.domain.bank.service;

import a107.cardmore.domain.bank.dto.*;
import a107.cardmore.domain.bank.mapper.BankMapper;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.*;
import a107.cardmore.util.api.dto.merchant.MerchantResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BankService {
    private final RestTemplateUtil restTemplateUtil;
    private final BankMapper bankMapper;
    private final BankModuleService bankModuleService;

    //가맹점 등록
    public List<MerchantResponseRestTemplateDto> createMerchant(CreateMerchantRequestDto requestDto){

        return restTemplateUtil.createMerchant(bankMapper.toCreateMerchantRequestRestTemplateDto(requestDto));
    }

    //가맹점 목록 조회
    public List<MerchantResponseRestTemplateDto> inquireMerchant(){
        return restTemplateUtil.inquireMerchantList();
    }

    //카드 상품 등록
    public CardProductResponseRestTemplateDto createCreditCardProduct(CreateCardProductRequestDto requestDto){
        log.info("Request -> {}",requestDto.toString());
        return restTemplateUtil.createCreditCardProduct(bankMapper.toCreateCardProductRequestRestTemplateDto(requestDto));
    }

    //카드 상품 목록 조회
    public List<CardProductResponseRestTemplateDto> inquireCreditCardProduct(){
        return restTemplateUtil.inquireCreditCardList();
    }
    
    //카드사 조회
    public List<CardIssuerCodesListResponseRestTemplateDto> inquireCardIssuerCodesList(){
        return restTemplateUtil.inquireCardIssuerCodesList();
    }

    //카드 생성
    public CardResponseRestTemplateDto createCreditCard(String email, CreateCardRequestDto requestDto){
        String userKey = bankModuleService.getUserKeyByEmail(email);
        return restTemplateUtil.createCreditCard(userKey,bankMapper.toCreateCardRequestRestTemplateDto(requestDto));
    }

    //내 카드 목록 조회
    public List<CardResponseRestTemplateDto> inquireSignUpCreditCardList(String email){
        String userKey = bankModuleService.getUserKeyByEmail(email);
        return restTemplateUtil.inquireSignUpCreditCardList(userKey);
    }

    //카드 결제
    public CreateCreditCardTransactionResponseRestTemplateDto createCreditCardTransaction(String email, CreateCreditCardTransactionRequestDto requestDto){
        String userKey = bankModuleService.getUserKeyByEmail(email);
        return restTemplateUtil.createCreditCardTransaction(userKey, bankMapper.toCreateCreditCardTransactionRequestRestTemplateDto(requestDto));
    }

    //카드 결제 내역 조회
    public InquireCreditCardTransactionListResponseRestTemplateDto inquireCreditCardTransactionList(String email, InquireCreditCardTransactionListRequestDto requestDto){
        String userKey = bankModuleService.getUserKeyByEmail(email);
        return restTemplateUtil.inquireCreditCardTransactionList(userKey,bankMapper.toInquireCreditCardTransactionListRequestRestTemplateDto(requestDto));
    }

    //청구서 조회
    public List<InquireBillingStatementsResponseRestTemplateDto> inquireBillingStatements(String email, InquireBillingStatementsRequestDto requestDto){
        String userKey = bankModuleService.getUserKeyByEmail(email);
        return restTemplateUtil.inquireBillingStatements(userKey,  bankMapper.toInquireBillingStatementsRequestRestTemplateDto(requestDto));
    }

}
