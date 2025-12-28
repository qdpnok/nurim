package human.nurim_spring.service;

import human.nurim_spring.dto.ChangeInfoReqDto;
import human.nurim_spring.dto.MyInfoResDto;
import human.nurim_spring.dto.MyPageResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
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
    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("마이페이지 렌더링 정보 조회")
    public void mainTest() {
        MyPageResDto dto = memberService.mainPage(1L);
        log.info("마이페이지 회원 조회: {}", dto);
    }

    @Test
    @DisplayName("회원 정보 렌더링 정보 조회")
    public void myInfoTest() {
        MyInfoResDto dto = memberService.myInfo(1L);
        log.info("마이페이지 회원 정보 조회: {}", dto);
    }

    @Test
    @DisplayName("회원 정보 수정: 비밀번호 변경")
    public void changePwdTest() {
        memberService.changePwd(1L, "tkdaltkd1234");
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("ㅎㅎ"));
        // $2a$10$xBWL5bnFJ/5BCHQ0z60Uc.dDeNhr4Lx3OZULHJo0QPpM0O6oBh/T.
        log.info("비빌번호: {}", member.getPwd());
    }

    @Test
    @DisplayName("회원 정보 수정: 회원 정보 변경")
    public void changeInfoTest() {
        ChangeInfoReqDto dto = new ChangeInfoReqDto("이상미", "010-1324-1245");

        memberService.changeInfo(1L, dto);
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("ㅎㅎ"));
        log.info("회원 정보 수정: {}, {}", member.getName(), member.getPhoneNum());
    }
}