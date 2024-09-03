package a107.cardmore.util.api.dto.card;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InquireCreditCardTransactionListResponseRestTemplateDto {
    private String cardIssuerCode;
    private String cardIssuerName;
    private String cardName;
    private String cardNo;
    private String cvc;
    private Long estimateBalance;
    private List<Transaction>transactionList;
}


@Getter
@Setter
class Transaction{
    private Long transactionUniqueNo;
    private String categoryId;
    private String categoryName;
    private Long merchantId;
    private String merchantName;
    private String transactionDate;
    private String transactionTime;
    private Long transactionBalance;
    private String cardStatus;
    private String billStatementsYn;
    private String billStatementsStatus;
}