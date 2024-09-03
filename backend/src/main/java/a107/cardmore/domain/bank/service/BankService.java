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

    //가맹점 등록
    public List<MerchantResponseRestTemplateDto> createMerchant(CreateMerchantRequestDto requestDto){

        return restTemplateUtil.createMerchant(bankMapper.toCreateMerchantRequestRestTemplateDto(requestDto));
    }

    //가맹점 목록 조회
    public List<MerchantResponseRestTemplateDto> inquireMerchant(){
        return restTemplateUtil.inquireMerChantList();
    }

    //카드 상품 등록
    public CardProductResponseRestTemplateDto createCreditCardProduct(CreateCardProductRequestDto requestDto){
        return restTemplateUtil.createCreditCardProduct(bankMapper.toCreateCardProductRequestDto(requestDto));
    }

    //카드 상품 목록 조회
    public List<CardProductResponseRestTemplateDto> inquireCreditCardProduct(){
        return restTemplateUtil.inquireCreditCardList();
    }

    //카드 생성
    public CardResponseRestTemplateDto createCreditCard(CreateCardRequestDto requestDto){
        //TODO userKey dto에 setter로 넣어야하나?

        String userKey = "";
        return restTemplateUtil.createCreditCard(userKey,bankMapper.toCreateCardRequestRestTemplateDto(requestDto));
    }

    //내 카드 목록 조회
    public List<CardResponseRestTemplateDto> inquireSignUpCreditCardList(){
        //TODO userKey dto에 setter로 넣어야하나?

        String userKey = "";
        return restTemplateUtil.inquireSignUpCreditCardList(userKey);
    }

    //카드 결제
    public CreateCreditCardTransactionResponseRestTemplateDto createCreditCardTransaction(CreateCreditCardTransactionRequestDto requestDto){
        //TODO userKey dto에 setter로 넣어야하나?

        String userKey = "";
        return restTemplateUtil.createCreditCardTransaction(userKey, bankMapper.toCreateCreditCardTransactionRequestRestTemplateDto(requestDto));
    }

    //카드 결제 내역 조회
    public InquireCreditCardTransactionListResponseRestTemplateDto inquireCreditCardTransactionList(InquireCreditCardTransactionListRequestDto requestDto){
        //TODO userKey dto에 setter로 넣어야하나?

        String userKey = "";
        return restTemplateUtil.inquireCreditCardTransactionList(userKey,bankMapper.toInquireCreditCardTransactionListRequestRestTemplateDto(requestDto));
    }

    //청구서 조회
    public List<InquireBillingStatementsResponseRestTemplateDto> inquireBillingStatements(InquireBillingStatementsRequestDto requestDto){
        //TODO userKey dto에 setter로 넣어야하나?

        String userKey = "";
        return restTemplateUtil.inquireBillingStatements(userKey,  bankMapper.toInquireBillingStatementsRequestRestTemplateDto(requestDto));
    }

}
