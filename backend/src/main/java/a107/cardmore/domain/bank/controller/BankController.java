package a107.cardmore.domain.bank.controller;

import a107.cardmore.domain.bank.service.BankService;
import a107.cardmore.util.api.dto.merchant.MerchantResponseRestTemplateDto;
import a107.cardmore.util.base.BaseSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/banks")
@RequiredArgsConstructor
@Slf4j
public class BankController {

    private final BankService bankService;

    @PostMapping("/create/demanddeposit")
    public BaseSuccessResponse<MerchantResponseRestTemplateDto> createDemandDeposit(@RequestBody CreateDemandDepositRequestBankDto requestBankDto){
        log.info("가맹점 등록 API");
        return new BaseSuccessResponse<>(bankService.createMerchant(requestBankDto));
    }

    @GetMapping("/demanddeposit")
    public BaseSuccessResponse<List<CreateDemandDepositResponseBankDto>> viewDemandDeposit(){
        log.info("가맹점 조회 API");
        return new BaseSuccessResponse<>(bankService.findAllDemandDeposit());
    }

    @PostMapping("/create/deposit")
    public BaseSuccessResponse<CreateDepositResponseBankDto> createDeposit(@RequestBody CreateDepositRequestBankDto requestBankDto){
        log.info("카드 상품 등록 API");
        return new BaseSuccessResponse<>(bankService.createDeposit(requestBankDto));
    }

    @GetMapping("/deposit")
    public BaseSuccessResponse<List<CreateDepositResponseBankDto>> viewDeposit(){
        log.info("카드 상품 목록 조회 API");
        return new BaseSuccessResponse<>(bankService.findAllDeposit());
    }

    @PostMapping("/create/saving")
    public BaseSuccessResponse<CreateSavingResponseBankDto> createSaving(@RequestBody CreateSavingRequestBankDto requestBankDto){
        log.info("카드 결제 API");
        return new BaseSuccessResponse<>(bankService.createSaving(requestBankDto));
    }

    @GetMapping("/saving")
    public BaseSuccessResponse<List<CreateSavingResponseBankDto>> viewSaving(){
        log.info("카드 결제 내역 조회 API");
        return new BaseSuccessResponse<>(bankService.findAllSaving());
    }

    @PostMapping("/create/loan")
    public BaseSuccessResponse<CreateLoanResponseBankDto> createLoan(@RequestBody CreateLoanRequestBankDto requestBankDto){
        log.info("청구서 조회 API");
        return new BaseSuccessResponse<>(bankService.createLoan(requestBankDto));
    }
}

