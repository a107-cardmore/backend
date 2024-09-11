package a107.cardmore.domain.transaction.mapper;

import a107.cardmore.domain.bank.dto.InquireCreditCardTransactionListRequestDto;
import a107.cardmore.domain.transaction.dto.CreateCreditCardTransactionRequestDto;
import a107.cardmore.domain.transaction.dto.CreateCreditCardTransactionResponseDto;
import a107.cardmore.domain.transaction.dto.TransactionDto;
import a107.cardmore.util.api.dto.card.CreateCreditCardTransactionRequestRestTemplateDto;
import a107.cardmore.util.api.dto.card.CreateCreditCardTransactionResponseRestTemplateDto;
import a107.cardmore.util.api.dto.card.InquireCreditCardTransactionListRequestRestTemplateDto;
import a107.cardmore.util.api.dto.card.InquireCreditCardTransactionListResponseRestTemplateDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TransactionMapper {
    CreateCreditCardTransactionRequestRestTemplateDto toCreateCreditCardTransactionRequestRestTemplateDto(CreateCreditCardTransactionRequestDto requestDto);
    CreateCreditCardTransactionResponseDto toCreateCreditCardTransactionResponseDto(CreateCreditCardTransactionResponseRestTemplateDto responseDto);
    InquireCreditCardTransactionListRequestRestTemplateDto toInquireCreditCardTransactionListRequestRestTemplateDto(InquireCreditCardTransactionListRequestDto requestDto);
    TransactionDto toTransactionDto(InquireCreditCardTransactionListResponseRestTemplateDto responseDto);
}
