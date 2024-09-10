package a107.cardmore.domain.card.controller;

import a107.cardmore.domain.card.dto.CompanyCardListResponseDto;
import a107.cardmore.domain.card.service.CardService;
import a107.cardmore.util.base.BaseSuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
@Slf4j
public class CardController {
    private final CardService cardService;

    @GetMapping("")
    public BaseSuccessResponse<List<CompanyCardListResponseDto>> getUserSelectedCardInfo(){
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new BaseSuccessResponse<>(cardService.getUserAllCardInfo(userEmail));
    }

    @PostMapping("")
    public BaseSuccessResponse<List<CompanyCardListResponseDto>> postUserSelectedCardInfo(){
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new BaseSuccessResponse<>(cardService.getUserAllCardInfo(userEmail));
    }

    @GetMapping("/all")
    public BaseSuccessResponse<List<CompanyCardListResponseDto>> getUserAllCardInfo(){
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new BaseSuccessResponse<>(cardService.getUserAllCardInfo(userEmail));
    }




}
