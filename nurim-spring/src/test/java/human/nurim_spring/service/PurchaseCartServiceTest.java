package human.nurim_spring.service;

import human.nurim_spring.dto.PurchaseCartDto;
import human.nurim_spring.dto.PurchaseCartItemReqDto;
import human.nurim_spring.dto.PurchaseCartResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.PurchaseCartItem;
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
class PurchaseCartServiceTest {
    @Autowired
    PurchaseCartService purchaseCartService;
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

    private void initTest() {
        Member member = buildMember();
        memberRepository.save(member);
    }

    // 장바구니에 아이템 삽입: saveItem
    @Test
    @DisplayName("장바구니에 아이템 삽입, 조회, 수량 수정, 삭제")
    public void saveItemTest() {
        // 테스트 초기값 설정
        initTest();

        // 장바구니에 아이템 삽입
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        PurchaseCartItemReqDto purchaseCartItemReqDto = new PurchaseCartItemReqDto(1L, 2L, 3L);
        purchaseCartService.saveItem(purchaseCartItemReqDto);

        // 장바구니 조회
        PurchaseCartResDto purchaseCartResDto = purchaseCartService.getCart(1L);

        log.info("장바구니는 존재하는가: {}", purchaseCartResDto.isHasCart());

        PurchaseCartDto cartDto = purchaseCartResDto.getPurchaseCartDto().get(0);

        log.info("아이템 등록, 조회 성공\n 상품 이름: {}, 상품 수량: {}", cartDto.getName(), cartDto.getQuantity());

        // 장바구니 수량 수정
        purchaseCartService.updateQty(1L, 8L);
        purchaseCartResDto = purchaseCartService.getCart(1L);
        cartDto = purchaseCartResDto.getPurchaseCartDto().get(0);

        log.info("아이템 등록, 조회 성공\n 상품 이름: {}, 상품 수량: {}", cartDto.getName(), cartDto.getQuantity());

        // 장바구니 상품 삭제
        purchaseCartService.deleteItem(1L);
        purchaseCartResDto = purchaseCartService.getCart(1L);

        log.info("장바구니 존재 확인: {}", purchaseCartResDto.isHasCart());

    }
}