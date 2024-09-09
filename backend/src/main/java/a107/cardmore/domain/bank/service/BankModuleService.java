package a107.cardmore.domain.bank.service;

import a107.cardmore.domain.bank.entity.Bank;
import a107.cardmore.domain.bank.repository.BankRepository;
import a107.cardmore.global.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BankModuleService {
    private final BankRepository bankRepository;

    public String getUserKeyByEmail(String email){
        return bankRepository.findByEmail(email).orElseThrow(()->new BadRequestException("존재하지 않는 이메일입니다.")).getUserKey();
    }

    @Transactional
    public void saveBank(String email, String userKey){
        Bank bank = Bank.builder()
                .email(email)
                .userKey(userKey)
                .build();
        bankRepository.save(bank);
    }
}
