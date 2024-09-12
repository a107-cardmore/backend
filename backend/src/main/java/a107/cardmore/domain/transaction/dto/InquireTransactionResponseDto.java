package a107.cardmore.domain.transaction.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class InquireTransactionResponseDto {
    List<List<CategoryDto>> categoryList;
    List<String> companyNameList;
    List<List<TransactionDto>> transactionList;

    public InquireTransactionResponseDto() {
        categoryList = new ArrayList<>();
        companyNameList = new ArrayList<>();
        transactionList = new ArrayList<>();

        companyNameList.add("전체");
        transactionList.add(new ArrayList<>());
    }
}
