package a107.cardmore.domain.card.repository;

import a107.cardmore.domain.card.entity.Card;
import a107.cardmore.domain.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findAllByCompany(Company company);
}
