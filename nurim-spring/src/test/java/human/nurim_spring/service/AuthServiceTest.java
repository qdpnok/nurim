package human.nurim_spring.service;

import human.nurim_spring.dto.LoginReqDto;
import human.nurim_spring.dto.LoginResDto;
import human.nurim_spring.dto.SignUpReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class AuthServiceTest {
    @Autowired
    AuthService authService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    // 아까 왜 만들어놨지..? 뭐하려고..???
    private Member convertSignUpReqToMember(SignUpReqDto dto) {
        return Member.builder()
                .id(dto.getId())
                .pwd(passwordEncoder.encode(dto.getPwd()))
                .email(dto.getEmail())
                .name(dto.getName())
                .phoneNum(dto.getPhoneNum())
                .build();
    }

    // 회원 가입
    @Test
    @DisplayName("회원 가입, 로그인 테스트")
    public void signupTest() {
        SignUpReqDto dto = new SignUpReqDto();
        dto.setId("tkdal");
        dto.setPwd("pwd0000");
        dto.setEmail("tkdal@gmail.com");
        dto.setName("이상미");
        dto.setPhoneNum("010-1234-1234");

        log.info("existById : {}", authService.existsById(dto.getId()));
        log.info("existByEmail: {}", authService.existsByEmail(dto.getEmail()));


        LoginReqDto loginReqDto = new LoginReqDto();
        loginReqDto.setId("tkdal");
        loginReqDto.setPwd("pwd0000");
        LoginResDto loginResDto = authService.login(loginReqDto);
        log.info("로그인 : {}", loginResDto);
    }

}