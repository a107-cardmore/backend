package a107.cardmore.domain.auth.service;

import a107.cardmore.domain.auth.dto.RegisterRequestDto;
import a107.cardmore.domain.auth.dto.RegisterResponseDto;
import a107.cardmore.domain.auth.mapper.AuthMapper;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;

    public RegisterResponseDto registerUser(RegisterRequestDto request) {
        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
//                    throw new BadRequestException("이미 존재하는 이메일 입니다.");
                });

        String encodePassword = passwordEncoder.encode(request.getPassword());
        String userKey = restTemplateUtil.createMember(request.getEmail());

        User user = userRepository.save(request.createUser(encodePassword, userKey));

        return authMapper.toRegisterResponseDto(user);
    }

}
