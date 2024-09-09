package a107.cardmore.domain.card.controller;

import a107.cardmore.domain.card.dto.CardResponseDto;
import a107.cardmore.domain.card.service.CardService;
import a107.cardmore.util.base.BaseSuccessResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
@Slf4j
public class CardController {
    private final CardService cardService;

    @GetMapping()
    public BaseSuccessResponse<List<CardResponseDto>> getUserAllCardInfo(){
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        return new BaseSuccessResponse<>(cardService.getUserAllCardInfo(userEmail));
    }
}
