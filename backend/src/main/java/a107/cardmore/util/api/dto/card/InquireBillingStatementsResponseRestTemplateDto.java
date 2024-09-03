package a107.cardmore.util.api.dto.card;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InquireBillingStatementsResponseRestTemplateDto {
    private String billingMonth;
    private List<Billing> billingList;
}

@Getter
@Setter
class Billing{
    private String billingWeek;
    private String billingDate;
    private Long totalBalance;
    private String status;
    private String paymentDate;
    private String paymentTime;
}
