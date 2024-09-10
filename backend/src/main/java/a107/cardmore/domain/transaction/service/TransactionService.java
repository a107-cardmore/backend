package a107.cardmore.domain.transaction.service;

import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.card.service.CardModuleService;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.service.CompanyModuleService;
import a107.cardmore.domain.transaction.dto.CreateCreditCardTransactionRequestDto;
import a107.cardmore.domain.transaction.dto.CreateCreditCardTransactionResponseDto;
import a107.cardmore.domain.transaction.dto.TransactionResponseDto;
import a107.cardmore.domain.transaction.mapper.TransactionMapper;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.util.api.RestTemplateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final RestTemplateUtil restTemplateUtil;
    private final TransactionMapper transactionMapper;
    private final UserModuleService userModuleService;
    private final CompanyModuleService companyModuleService;
    private final CardModuleService cardModuleService;

    public List<TransactionResponseDto> getTransactionList(String email) {

        User user = userModuleService.getUserByEmail(email);

        List<Company> companyList = companyModuleService.findCompnaies();

        List<Card> cardList = cardModuleService.

        List<Long> companyIdList = companyList.stream().map(Company::getId).toList();



        return null;
    }

    public CreateCreditCardTransactionResponseDto createCreditCardTransaction(String userKey, CreateCreditCardTransactionRequestDto requestDto){
        return transactionMapper.toCreateCreditCardTransactionResponseDto(restTemplateUtil.createCreditCardTransaction(userKey,transactionMapper.toCreateCreditCardTransactionRequestRestTemplateDto(requestDto)));
    }

}
