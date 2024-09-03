package a107.cardmore.util.api.dto.merchant;

import a107.cardmore.util.constant.MerchantCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MerchantResponseRestTemplateDto {
    // TODO Enum 어떻게 처리해야 함?
    private MerchantCategory categoryId;
    private String categoryName;
    private Integer merchantId;
    private String merchantName;
}
