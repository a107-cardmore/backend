package a107.cardmore.domain.bank.mapper;

import a107.cardmore.domain.bank.dto.*;
import a107.cardmore.util.api.dto.card.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BankMapper {
    @Mapping(source = "merchantCategory.value", target = "categoryId")
    CreateMerchantRequestRestTemplateDto toCreateMerchantRequestRestTemplateDto(CreateMerchantRequestDto requestDto);

    @Mapping(source = "cardCompany.value", target = "cardIssuerCode")
    CreateCardProductRequestRestTemplateDto toCreateCardProductRequestDto(CreateCardProductRequestDto requestDto);

    CreateCardRequestRestTemplateDto toCreateCardRequestRestTemplateDto(CreateCardRequestDto requestDto);
    CreateCreditCardTransactionRequestRestTemplateDto toCreateCreditCardTransactionRequestRestTemplateDto(CreateCreditCardTransactionRequestDto requestDto);
    InquireCreditCardTransactionListRequestRestTemplateDto toInquireCreditCardTransactionListRequestRestTemplateDto(InquireCreditCardTransactionListRequestDto requestDto);
    InquireBillingStatementsRequestRestTemplateDto toInquireBillingStatementsRequestRestTemplateDto(InquireBillingStatementsRequestDto requestDto);
}
