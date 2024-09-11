package a107.cardmore.domain.company.service;

import a107.cardmore.domain.card.dto.SelectedInfo;
import a107.cardmore.domain.company.entity.Company;
import a107.cardmore.domain.company.repository.CompanyRepository;
import a107.cardmore.domain.user.entity.User;
import a107.cardmore.domain.user.service.UserModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class CompanyService {
    private final UserModuleService userModuleService;
    private final CompanyModuleService companyModuleService;

    public void updateUserSelectedCompany(String email, List<SelectedInfo> selectedCompanies) {
        User user = userModuleService.getUserByEmail(email);

        for(SelectedInfo selectedInfo : selectedCompanies) {
            Company company = companyModuleService.findCompany(selectedInfo.getId(), user);
            company.changeIsSelected(selectedInfo.getIsSelected());
        }
    }
}
