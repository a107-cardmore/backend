package a107.cardmore.util.api.dto.card;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class InquireBillingStatementsRequestRestTemplateDto {
    private String cardNo;
    private String cvc;
    private LocalDate startMonth;
    private LocalDate endMonth;
}
