package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.PurchaseCart;
import human.nurim_spring.entity.PurchaseCartItem;
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
class PurchaseCartItemRepositoryTest {
    @Autowired
    PurchaseCartItemRepository purchaseCartItemRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PurchaseCartRepository purchaseCartRepository;
    @Autowired
    ProductRepository productRepository;

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

    private PurchaseCartItem buildCartItem(PurchaseCart purchaseCart, Product product, Long quantity) {
        return PurchaseCartItem.builder()
                .purchaseCart(purchaseCart)
                .product(product)
                .quantity(quantity)
                .price(product.getPrice())
                .build();
    }


    @Test
    @DisplayName("아이템 삽입, 조회 테스트")
    public void insertItem() {
        memberRepository.save(buildMember());

        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("회원 못 찾음"));

        // 카트 조회 결과가 없으면 새 카트 생성
        PurchaseCart cart = purchaseCartRepository.findByMember(member);
        if(cart == null) cart = purchaseCartRepository.save(buildCart(member));

        log.info("카트: {}", cart.getNum());

        Product product = productRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("상품 없음"));

        PurchaseCartItem cartItem = purchaseCartItemRepository.save(buildCartItem(cart, product, 4L));

        log.info("물건 등록: {}, {}, {}, {}", cartItem.getProduct().getName(), cartItem.getPrice(), cartItem.getQuantity());

        // 리스트 조회
        List<PurchaseCartItem> list = purchaseCartItemRepository.findByPurchaseCart(cart);
        for (PurchaseCartItem purchaseCartItem : list) {
            log.info("물건 등록: {}, {}, {}, {}", purchaseCartItem.getProduct().getName(), purchaseCartItem.getPrice(), purchaseCartItem.getQuantity());
        }
    }

}