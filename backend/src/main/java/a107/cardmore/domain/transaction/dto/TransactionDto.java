package a107.cardmore.domain.transaction.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDto {
    private String categoryName;
    private String merchantName;
    private String transactionDate;
    private String transactionTime;
    private Long transactionBalance;
}
