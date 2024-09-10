package a107.cardmore.domain.transaction.controller;

import a107.cardmore.domain.transaction.dto.CreateCreditCardTransactionRequestDto;
import a107.cardmore.domain.transaction.dto.CreateCreditCardTransactionResponseDto;
import a107.cardmore.domain.transaction.dto.TransactionResponseDto;
import a107.cardmore.domain.transaction.service.TransactionService;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
@Slf4j
public class TransactionController {
    private final TransactionService transactionService;
    private final UserModuleService userModuleService;

    @GetMapping
    public List<TransactionResponseDto> getTransactionList(){

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return transactionService.getTransactionList(email);
    }

    @PostMapping
    @RequestMapping("/{id}")
    public CreateCreditCardTransactionResponseDto createCreditCardTransaction(
            @PathVariable("id") String cardNo,
            @RequestBody CreateCreditCardTransactionRequestDto requestDto)
    {
        log.info("결제 요청 API");

        requestDto.setCardNo(cardNo);

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        String userKey = userModuleService.getUserByEmail(email).getUserKey();

        return transactionService.createCreditCardTransaction(userKey,requestDto);
    }

}
