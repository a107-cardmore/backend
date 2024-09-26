package a107.cardmore.domain.discount.repository;

import a107.cardmore.domain.discount.entity.Discount;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.util.constant.MerchantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Month;
import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount,Long> {
    Optional<Discount> findByCardId(Long cardId);
    Optional<Discount> findAllByCategoryIdAndCardId(String categoryId, Long cardId);

    @Query(value = "select sum(d.price) " +
            "from Discount d " +
            "where d.user = :user " +
            "and  month(d.paymentDate) = :month "
    )
    Long totalUserDiscountPrice(@Param("user")User user, Integer month);

}
