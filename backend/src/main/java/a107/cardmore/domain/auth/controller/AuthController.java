package a107.cardmore.domain.auth.controller;

import a107.cardmore.domain.auth.dto.RegisterRequestDto;
import a107.cardmore.domain.auth.dto.RegisterResponseDto;
import a107.cardmore.domain.auth.service.AuthService;
import a107.cardmore.domain.user.controller.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public BaseSuccessResponse<RegisterResponseDto> register(@RequestBody RegisterRequestDto registerRequestDto) {
        log.info("사용자 등록 API");
        return new BaseSuccessResponse<>(authService.registerUser(registerRequestDto));
    }
}
