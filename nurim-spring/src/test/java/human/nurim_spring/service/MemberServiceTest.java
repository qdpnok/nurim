package human.nurim_spring.service;

import human.nurim_spring.dto.MyInfoResDto;
import human.nurim_spring.dto.MyPageResDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class MemberServiceTest {
    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("마이페이지 렌더링 정보 조회")
    public void mainTest() {
        MyPageResDto dto = memberService.main(1L);
        log.info("마이페이지 회원 조회: {}", dto);
    }

    @Test
    @DisplayName("회원 정보 렌더링 정보 조회")
    public void myInfoTest() {
        MyInfoResDto dto = memberService.myInfo(1L);
        log.info("마이페이지 회원 정보 조회: {}", dto);
    }
}