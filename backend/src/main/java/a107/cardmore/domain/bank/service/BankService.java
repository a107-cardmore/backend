package a107.cardmore.domain.bank.service;

import a107.cardmore.domain.bank.dto.CreateMerchantRequestDto;
import a107.cardmore.domain.bank.mapper.BankMapper;
import a107.cardmore.util.api.RestTemplateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BankService {
    private final RestTemplateUtil restTemplateUtil;
//    private final BankMapper bankMapper;

    //가맹점 등록
    public void createMerchant(CreateMerchantRequestDto requestDto){

        BankMapper

        restTemplateUtil.createMerchant(requestDto);
    }
    //가맹점 목록 조회
    //카드 상품 등록
    //카드 상품 목록 조회
    //카드 생성
    //내 카드 목록 조회
    //카드 결제
    //카드 결제 내역 조회
    //청구서 조회
}
