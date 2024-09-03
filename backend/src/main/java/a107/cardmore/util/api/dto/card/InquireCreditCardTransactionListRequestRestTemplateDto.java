package a107.cardmore.util.api.dto.card;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class InquireCreditCardTransactionListRequestRestTemplateDto {
    private String cardNo;
    private String cvc;
    private LocalDate startDate;
    private LocalDate endDate;
}
