package a107.cardmore.domain.discount.repository;

import a107.cardmore.domain.discount.entity.Discount;
import a107.cardmore.util.constant.MerchantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount,Long> {
    Optional<Discount> findByCardId(Long cardId);
    Optional<Discount> findAllByCategoryIdAndCardId(String categoryId, Long cardId);
}
