package a107.cardmore.domain.auth.service;

import a107.cardmore.domain.auth.dto.RegisterRequestDto;
import a107.cardmore.domain.auth.dto.RegisterResponseDto;
import a107.cardmore.domain.auth.mapper.AuthMapper;
import a107.cardmore.domain.bank.entity.Bank;
import a107.cardmore.domain.bank.service.BankModuleService;
import a107.cardmore.domain.card.service.CardModuleService;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.service.CompanyModuleService;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.repository.UserRepository;
import a107.cardmore.global.exception.BadRequestException;
import a107.cardmore.util.api.RestTemplateUtil;
import a107.cardmore.util.api.dto.card.CardResponseRestTemplateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final RestTemplateUtil restTemplateUtil;
    private final CompanyModuleService companyModuleService;
    private final CardModuleService cardModuleService;
    private final BankModuleService bankModuleService;

    public RegisterResponseDto registerUser(RegisterRequestDto request) {
        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    throw new BadRequestException("이미 존재하는 이메일 입니다.");
                });

        // userKey 등록 가져와야 함
        Bank bank = bankModuleService.getUser(request.getEmail());
        String password = passwordEncoder.encode(request.getPassword());
        User user = userRepository.save(request.createUser(password, bank.getUserKey(), bank.getAccountNo()));

        // 카드사 5곳 저장
        companyModuleService.saveCompanies(user);

        // 개인 카드 저장
        List<CardResponseRestTemplateDto> cardResponseInfos = restTemplateUtil.inquireSignUpCreditCardList(user.getUserKey());
        cardResponseInfos.forEach(cardResponseInfo -> {
            Company company = companyModuleService.findUserCompany(cardResponseInfo.getCardIssuerCode(), user);
            cardModuleService.saveCard(company, cardResponseInfo.getCardNo(), cardResponseInfo.getMaxBenefitLimit(),
                    cardResponseInfo.getBaselinePerformance());
        });

        return authMapper.toRegisterResponseDto(user);
    }

}
