package a107.cardmore.domain.bank.controller;

import a107.cardmore.domain.bank.dto.*;
import a107.cardmore.domain.bank.service.BankService;
import a107.cardmore.util.api.dto.card.*;
import a107.cardmore.util.api.dto.merchant.MerchantResponseRestTemplateDto;
import a107.cardmore.util.base.BaseSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/banks")
@RequiredArgsConstructor
@Slf4j
public class BankController {

    private final BankService bankService;

    @PostMapping("/create/merchant")
    public BaseSuccessResponse<List<MerchantResponseRestTemplateDto>> createMerchant(@RequestBody CreateMerchantRequestDto requestDto){
        log.info("가맹점 등록 API");
        return new BaseSuccessResponse<>(bankService.createMerchant(requestDto));
    }

    @GetMapping("/merchant")
    public BaseSuccessResponse<List<MerchantResponseRestTemplateDto>> inquireMerchantList(){
        log.info("가맹점 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireMerchant());
    }

    @PostMapping("/create/creditCardProduct")
    public BaseSuccessResponse<CardProductResponseRestTemplateDto> createCreditCardProduct(@RequestBody CreateCardProductRequestDto requestDto){
        log.info("카드 상품 등록 API");
        return new BaseSuccessResponse<>(bankService.createCreditCardProduct(requestDto));
    }

    @GetMapping("/creditCardProduct")
    public BaseSuccessResponse<List<CardProductResponseRestTemplateDto>> inquireCreditCardProduct(){
        log.info("카드 상품 목록 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireCreditCardProduct());
    }

    @PostMapping("/create/creditCard/{id}")
    public BaseSuccessResponse<CardResponseRestTemplateDto> createCreditCard(@PathVariable("id") Long userId, @RequestBody CreateCardRequestDto requestBankDto){
        log.info("카드 등록 API");
        return new BaseSuccessResponse<>(bankService.createCreditCard(userId,requestBankDto));
    }

    @GetMapping("/creditCard/{id}")
    public BaseSuccessResponse<List<CardResponseRestTemplateDto>> inquireCreditCard(@PathVariable("id") Long userId){
        log.info("내 카드 목록 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireSignUpCreditCardList(userId));
    }

    @PostMapping("/create/transaction/{id}")
    public BaseSuccessResponse<CreateCreditCardTransactionResponseRestTemplateDto> createCreditCardTransaction(@PathVariable("id") Long userId,@RequestBody CreateCreditCardTransactionRequestDto requestBankDto){
        log.info("카드 결제 API");
        return new BaseSuccessResponse<>(bankService.createCreditCardTransaction(userId,requestBankDto));
    }

    @GetMapping("/transaction/{id}")
    public BaseSuccessResponse<InquireCreditCardTransactionListResponseRestTemplateDto> viewSaving(@PathVariable("id") Long userId,@RequestBody InquireCreditCardTransactionListRequestDto requestDto){
        log.info("카드 결제 내역 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireCreditCardTransactionList(userId,requestDto));
    }

    @PostMapping("/bill/{id}")
    public BaseSuccessResponse<List<InquireBillingStatementsResponseRestTemplateDto>> createLoan(@PathVariable("id") Long userId,@RequestBody InquireBillingStatementsRequestDto requestBankDto){
        log.info("청구서 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireBillingStatements(userId,requestBankDto));
    }
}

