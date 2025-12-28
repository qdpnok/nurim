package human.nurim_spring.service;

import human.nurim_spring.dto.SubOrderPageRes;
import human.nurim_spring.dto.SubscriptionCartDto;
import human.nurim_spring.dto.SubscriptionCartItemReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.SubscriptionCartItem;
import human.nurim_spring.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class SubscriptionOrdersServiceTest {
    @Autowired
    SubscriptionOrderService subscriptionOrderService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    SubscriptionCartService subscriptionCartService;

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
    @DisplayName("구독 주문 조회 및 데이터 추가")
    public void orderTest() {
        initTest();

        // 상품 페이지에서 주문으로 직접 접근
        SubOrderPageRes res = subscriptionOrderService.directOrderPage(1L, 2L, 60L);
        log.info("주문 페이지 정보: {}", res);
        log.info("주문 상품 리스트: {}", res.getSubscriptionCartDtoList().get(0));

        // 장바구니에 아이템 삽입
        subscriptionCartService.saveItem(new SubscriptionCartItemReqDto(1L, 2L, 60L));
        subscriptionCartService.saveItem(new SubscriptionCartItemReqDto(1L, 3L, 60L));
        subscriptionCartService.saveItem(new SubscriptionCartItemReqDto(1L, 4L, 60L));

        List<Long> itemIds = new ArrayList<>();
        for (long i = 1L; i<4L; i++) {
            itemIds.add(i);
        }

        res = subscriptionOrderService.cartOrderPage(1L, itemIds);
        log.info("주문 페이지 정보: {}", res);
        for (SubscriptionCartDto cartDto : res.getSubscriptionCartDtoList()) {
            log.info("주문 상품 리스트: {}", cartDto);
        }

    }
}