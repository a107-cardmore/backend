package a107.cardmore.domain.bank.repository;

import a107.cardmore.domain.bank.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface
BankRepository extends JpaRepository<Bank,Long> {
    Optional<Bank> findByEmail(String email);
}
