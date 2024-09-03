package a107.cardmore.util.api;

import a107.cardmore.global.exception.BadRequestException;
import a107.cardmore.util.api.dto.account.CreateAccountResponseRestTemplateDto;
import a107.cardmore.util.api.dto.account.InquireAccountBalanceResponseRestTemplateDto;
import a107.cardmore.util.api.dto.auth.CheckAuthCodeResponseRestTemplateDto;
import a107.cardmore.util.api.dto.auth.OpenAccountAuthResponseRestTemplateDto;
import a107.cardmore.util.api.dto.member.CreateMemberResponseRestTemplateDto;
import a107.cardmore.util.api.template.header.RequestHeader;
import a107.cardmore.util.api.template.response.RECResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@Slf4j
public class RestTemplateUtil {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${fintech.api.url}")
    private String url;
    @Value("${institution.code}")
    private String institutionCode;
    @Value("${fintech.app.no}")
    private String fintechAppNo;
    @Value("${api.key}")
    private String apiKey;

    //정수형 UUID 생성
    private static String generateNumericUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("[^0-9]", "");
    }

    //API 호출용 Header 생성
    private RequestHeader requestHeader(String name, String userKey){
        LocalDateTime today = LocalDateTime.now();

        String date = today.toString().split("T")[0].replace("-","");
        String time = today.toString().split("T")[1].substring(0,8).replace(":","");

        //시퀀스 or UUID or 사용자 아아디 추가
        String numericUUID = generateNumericUUID();

        String institutionTransactionUniqueNo = date + time + numericUUID.substring(0,(Math.min(numericUUID.length(), 6)));

        return RequestHeader.builder()
                .apiName(name)
                .apiKey(apiKey)
                .apiServiceCode(name)
                .transmissionDate(date)
                .transmissionTime(time)
                .fintechAppNo(fintechAppNo)
                .institutionCode(institutionCode)
                .institutionTransactionUniqueNo(institutionTransactionUniqueNo)
                .userKey(userKey)
                .build();
    }

    // 사용자 로그인 API
    // 사용자 생성
    public CreateMemberResponseRestTemplateDto createMember(String userId) {
        log.info("금융 API 사용자 생성 ");
        String uri = "member";

        Map<String,Object>requestBody = new HashMap<>();

        requestBody.put("apiKey","fda96747b542462caf0826cedcebd984");
        requestBody.put("userId",userId);

        HttpEntity<Object> entity = new HttpEntity<>(requestBody);

        ResponseEntity<CreateMemberResponseRestTemplateDto> response = restTemplate.postForEntity(url + uri, entity, CreateMemberResponseRestTemplateDto.class);
        if(response.getBody() == null){
            throw new BadRequestException("API 요청 중 오류가 발생했습니다.");
        }

        return response.getBody();
    }

    // 수시입출금 계좌 생성
    public CreateAccountResponseRestTemplateDto createAccount(String userKey, String accountTypeUniqueNo) {
        final String name = "createDemandDepositAccount";
        log.info("금융 API 계좌 생성");

        String uri = "edu/demandDeposit/createDemandDepositAccount";

        Map<String,Object>requestBody = new HashMap<>();

        RequestHeader headers = requestHeader(name, userKey);

        requestBody.put("Header",headers);
        requestBody.put("accountTypeUniqueNo",accountTypeUniqueNo);

        HttpEntity<Object> entity = new HttpEntity<>(requestBody);

        ResponseEntity<RECResponse<CreateAccountResponseRestTemplateDto>> response =
                restTemplate.exchange(
                        url + uri,HttpMethod.POST ,entity,
                        new ParameterizedTypeReference<>(){}
                );

        if(response.getBody() == null){
            throw new BadRequestException("API 요청 중 오류가 발생했습니다.");
        }

        return response.getBody().getREC();
    }

    // 수시입출금 계좌 잔액 조회
    public InquireAccountBalanceResponseRestTemplateDto inquireAccountBalance(String userKey, String accountNo){
        final String name = "inquireDemandDepositAccountBalance";
        log.info("금융 API 수시입출금 계좌 잔액 조회");

        String uri = "edu/demandDeposit/inquireDemandDepositAccountBalance";

        Map<String,Object>requestBody = new HashMap<>();

        RequestHeader headers = requestHeader(name, userKey);

        requestBody.put("Header",headers);
        requestBody.put("accountNo",accountNo);

        HttpEntity<Object> entity = new HttpEntity<>(requestBody);

        ResponseEntity<RECResponse<InquireAccountBalanceResponseRestTemplateDto>> response =
                restTemplate.exchange(
                        url + uri,HttpMethod.POST ,entity,
                        new ParameterizedTypeReference<>(){}
                );

        if(response.getBody() == null){
            throw new BadRequestException("API 요청 중 오류가 발생했습니다.");
        }

        return response.getBody().getREC();
    }

    //1원 인증 API
    //1원 송금
    public OpenAccountAuthResponseRestTemplateDto openAccountAuth(String userKey, String accountNo) {
        log.info("1원 송금 API");

        String uri = "edu/accountAuth/openAccountAuth";

        String name = "openAccountAuth";

        Map<String,Object> requestBody = new HashMap<>();

        RequestHeader headers = requestHeader(name,userKey);

        requestBody.put("Header",headers);
        requestBody.put("accountNo",accountNo);
        requestBody.put("authText","SSAFY");

        HttpEntity<Object> entity = new HttpEntity<>(requestBody);

        ResponseEntity<RECResponse<OpenAccountAuthResponseRestTemplateDto>> response
                = restTemplate.exchange(
                url + uri, HttpMethod.POST, entity,
                new ParameterizedTypeReference<>(){}
        );

        if(response.getBody() == null){
            throw new BadRequestException("API 요청 중 오류가 발생했습니다.");
        }

        return response.getBody().getREC();
    }

    // 1원 송금 인증
    public CheckAuthCodeResponseRestTemplateDto checkAuthCode(String userKey, String accountNo, String authText, String authCode) {
        log.info("1원 송금 인증 API");

        String uri = "edu/accountAuth/checkAuthCode";

        String name = "checkAuthCode";

        Map<String,Object> requestBody = new HashMap<>();

        RequestHeader headers = requestHeader(name,userKey);

        requestBody.put("Header",headers);
        requestBody.put("accountNo",accountNo);
        requestBody.put("authText",authText);
        requestBody.put("authCode",authCode);

        HttpEntity<Object> entity = new HttpEntity<>(requestBody);

        ResponseEntity<RECResponse<CheckAuthCodeResponseRestTemplateDto>> response
                = restTemplate.exchange(
                url + uri, HttpMethod.POST, entity,
                new ParameterizedTypeReference<>(){}
        );

        if(response.getBody() == null){
            throw new BadRequestException("API 요청 중 오류가 발생했습니다.");
        }

        return response.getBody().getREC();
    }
}