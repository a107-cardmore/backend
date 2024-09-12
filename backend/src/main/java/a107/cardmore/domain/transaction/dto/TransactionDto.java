package a107.cardmore.domain.transaction.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
//TEST
@ToString
public class TransactionDto {
    private String categoryName;
    private String categoryId;
    private String companyName;
    private String merchantName;
    private String transactionDate;
    private String transactionTime;
    private Long transactionBalance;
}
