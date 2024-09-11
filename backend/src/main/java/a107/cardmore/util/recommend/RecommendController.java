package a107.cardmore.util.recommend;

import a107.cardmore.domain.user.service.UserModuleService;
import a107.cardmore.util.api.dto.card.CardProductResponseRestTemplateDto;
import a107.cardmore.util.base.BaseSuccessResponse;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/recommends")
public class RecommendController {

    private final RecommendService recommendService;
    private final UserModuleService userModuleService;

    @GetMapping("/discount")
    public BaseSuccessResponse<List<MapResponseDto>> discount(@RequestBody MapRequestWrapperDto mapRequestWrapperDto) {
        Long userId = userModuleService.getUserIdByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return new BaseSuccessResponse<>(recommendService.discountCardRecommend(mapRequestWrapperDto.getMapRequestDtos(), userId));
    }

}