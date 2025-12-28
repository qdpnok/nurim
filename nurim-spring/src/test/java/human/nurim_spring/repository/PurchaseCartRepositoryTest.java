package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.PurchaseCart;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class PurchaseCartRepositoryTest {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PurchaseCartRepository purchaseCartRepository;

    private Member buildMember() {
        return Member.builder()
                .id("tkdal")
                .pwd("tkdal0000")
                .email("tkdal@gmail.com")
                .name("이상미")
                .phoneNum("010-1234-1234")
                .build();
    }

    private PurchaseCart buildCart(Member member) {
        return PurchaseCart.builder()
                .member(member)
                .build();
    }

    @Test
    @DisplayName("장바구니 조회 테스트")
    public void findPurchaseCart() {
        Long id = 1L;
        memberRepository.save(buildMember());

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("회원 못 찾음"));

        // 카트 조회 결과가 없으면 새 카트 생성
        PurchaseCart cart = purchaseCartRepository.findByMember(member);
        if(cart == null) cart = purchaseCartRepository.save(buildCart(member));

        log.info("카트: {}", cart.getNum());
    }

}