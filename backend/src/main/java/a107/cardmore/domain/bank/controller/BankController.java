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

    @PostMapping("/create/creditCard")
    public BaseSuccessResponse<CardResponseRestTemplateDto> createCreditCard(@RequestBody CreateCardRequestDto requestBankDto){
        log.info("카드 등록 API");
        return new BaseSuccessResponse<>(bankService.createCreditCard(requestBankDto));
    }

    @GetMapping("/creditCard")
    public BaseSuccessResponse<List<CardResponseRestTemplateDto>> inquireCreditCard(){
        log.info("내 카드 목록 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireSignUpCreditCardList());
    }

    @PostMapping("/create/transaction")
    public BaseSuccessResponse<CreateCreditCardTransactionResponseRestTemplateDto> createCreditCardTransaction(@RequestBody CreateCreditCardTransactionRequestDto requestBankDto){
        log.info("카드 결제 API");
        return new BaseSuccessResponse<>(bankService.createCreditCardTransaction(requestBankDto));
    }

    @GetMapping("/transaction")
    public BaseSuccessResponse<InquireCreditCardTransactionListResponseRestTemplateDto> viewSaving(@RequestBody InquireCreditCardTransactionListRequestDto requestDto){
        log.info("카드 결제 내역 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireCreditCardTransactionList(requestDto));
    }

    @PostMapping("/bill")
    public BaseSuccessResponse<List<InquireBillingStatementsResponseRestTemplateDto>> createLoan(@RequestBody InquireBillingStatementsRequestDto requestBankDto){
        log.info("청구서 조회 API");
        return new BaseSuccessResponse<>(bankService.inquireBillingStatements(requestBankDto));
    }
}

