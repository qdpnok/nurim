package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
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
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

    private Member buildMember() {
        return Member.builder()
                .id("tkdal")
                .pwd("tkdal0000")
                .email("tkdal@gmail.com")
                .name("이상미")
                .phoneNum("010-1234-1234")
                .build();
    }

    public Member createMember() {
        return memberRepository.save(buildMember());
    }

    @Test
    @DisplayName("Member 테이블 데이터 생성 및 중복 확인 테스트")
    public void createMemberTest() {
        createMember();
        log.info(memberRepository.findAll().toString());
        log.info(memberRepository.existsByEmail("tkdal@gmail.com") ? "이메일 O" : "이메일 X");
        log.info(memberRepository.existsById("tkdal") ? "아이디 O" : "아이디 X");
        Member member = memberRepository.findById("tkdal").orElseThrow(() -> new RuntimeException("해당 머시깽이 존재하지 않습니다."));
        Member member2 = memberRepository.findByEmail("tkdal@gmail.com").orElseThrow(() -> new RuntimeException("해당 머시깽이 존재하지 않습니다."));
        log.info(member.toString());
        log.info(member2.toString());
    }


}