package a107.cardmore.domain.discount.service;

import a107.cardmore.domain.discount.repository.DiscountRepository;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiscountService {
    private final DiscountRepository discountRepository;
    private final UserModuleService userModuleService;;

    public Long getTotalDiscountPrice(String email) {
        User user = userModuleService.getUserByEmail(email);
        return discountRepository.totalUserDiscountPrice(user, LocalDate.now().getMonthValue());
    }
}
