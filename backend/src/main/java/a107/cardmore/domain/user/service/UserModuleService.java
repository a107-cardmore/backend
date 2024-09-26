package a107.cardmore.domain.user.service;

import a107.cardmore.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserModuleService {
    private final UserRepository userRepository;

    public String getUserKeyByEmail(){
        return null;
    }
}
