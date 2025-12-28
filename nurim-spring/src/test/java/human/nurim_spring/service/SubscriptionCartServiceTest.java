package human.nurim_spring.service;

import human.nurim_spring.dto.SubscriptionCartDto;
import human.nurim_spring.dto.SubscriptionCartItemReqDto;
import human.nurim_spring.dto.SubscriptionCartResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.SubscriptionCartItem;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.SubscriptionCartItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class SubscriptionCartServiceTest {
    @Autowired
    SubscriptionCartService subscriptionCartService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    SubscriptionCartItemRepository subscriptionCartItemRepository;

    private Member buildMember() {
        return Member.builder()
                .id("tkdal")
                .pwd("tkdal0000")
                .email("tkdal@gmail.com")
                .name("이상미")
                .phoneNum("010-1234-1234")
                .build();
    }

    private void initTest() {
        Member member = buildMember();
        memberRepository.save(member);
        member.setId("alsdk");
        member.setPhoneNum("010-5321-1891");
        member.setEmail("alsdk@gmail.com");
        memberRepository.save(member);
    }

    @Test
    @DisplayName("장바구니 아이텝 삽입, 조회, 삭제")
    public void subCartServiceTest() {
        // 테스트 초기값 설정
        initTest();

        // 장바구니에 아이템 삽입
        subscriptionCartService.saveItem(new SubscriptionCartItemReqDto(1L, 2L, 60L));

        List<SubscriptionCartItem> items = subscriptionCartItemRepository.findAll();
        for (SubscriptionCartItem item : items) {
            log.info("삽입 후 구매 장바구니 아이템: {}, 장바구니 번호: {}", item.getNum(), item.getSubscriptionCart().getNum());
        }

        // 장바구니 조회
        SubscriptionCartResDto subscriptionCartResDto = subscriptionCartService.getCart(2L);
        log.info("장바구니 존재 확인: {}", subscriptionCartResDto.isHasCart());

        subscriptionCartResDto = subscriptionCartService.getCart(1L);
        log.info("장바구니 존재 확인: {}", subscriptionCartResDto.isHasCart());

        SubscriptionCartDto cartDto = subscriptionCartResDto.getSubscriptionCartDto().get(0);

        log.info("아이템 등록, 조회 성공\n 상품 이름: {}, 구독 개월 수: {}", cartDto.getName(), cartDto.getMonth());

        // 장바구니 상품 삭제
        subscriptionCartService.deleteItem(1L);
        subscriptionCartResDto = subscriptionCartService.getCart(1L);

        log.info("장바구니 존재 확인: {}", subscriptionCartResDto.isHasCart());
    }

}