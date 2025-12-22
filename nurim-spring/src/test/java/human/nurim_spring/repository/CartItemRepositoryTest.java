package human.nurim_spring.repository;

import human.nurim_spring.entity.Cart;
import human.nurim_spring.entity.CartItem;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class CartItemRepositoryTest {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    CartItemRepository cartItemRepository;
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

    private Cart buildCart(Member member) {
        return Cart.builder()
                .member(member)
                .build();
    }

    private CartItem buildCartItem(Cart cart, Product product, Long quantity, Long price, Long totalPrice) {
        return CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(quantity)
                .price(price)
                .totalPrice(totalPrice)
                .build();
    }

    @Test
    @DisplayName("장바구니 아이템 삽입 조회 수정 삭제 테스트")
    public void cartItemCURDTest() {
        // 삽입 테스트
        Member member = buildMember();
        memberRepository.save(member);

        Cart cart = buildCart(member);
        cartRepository.save(cart);

        Product product = productRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("넹"));
        Long price = product.getPrice();
        Long qty = 3L;

        CartItem cartItem = buildCartItem(cart, product, qty, price,qty*price);
        CartItem insertedItem = cartItemRepository.save(cartItem);

        log.info("장바구니 item 삽입 테스트: {}", cartItem.equals(insertedItem) ? "삽입 성공" : "삽입 실패");

        // 조회 테스트
        Member searchMem = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("회원 조회 실패"));
        log.info("회원 조회 결과: {}", searchMem.getName());

        Cart searchCart = cartRepository.findByMember(searchMem)
                .orElseThrow(() -> new RuntimeException("장바구니 조회 실패"));
        log.info("장바구니 조회 결과: {}", searchCart.getNum());

        CartItem searchItem = cartItemRepository.findByCart(searchCart)
                .orElseThrow(() -> new RuntimeException("장바구니 아이템 조회 실패"));
        log.info("장바구니 아이템 조회 결과: 수량 - {}, 가격 - {}, 총 가격 - {}", searchItem.getQuantity(), searchItem.getPrice(), searchItem.getTotalPrice());

        // 수정 테스트
        qty = 8L;
        searchItem.setQuantity(qty);
        searchItem.setTotalPrice(qty*searchItem.getPrice());
        CartItem fixItem = cartItemRepository.save(searchItem);
        log.info("장바구니 아이템 조회 결과: 수량 - {}, 가격 - {}, 총 가격 - {}", fixItem.getQuantity(), fixItem.getPrice(), fixItem.getTotalPrice());

        // 삭제 테스트
        cartItemRepository.delete(fixItem);
        List<CartItem> items = cartItemRepository.findAll();
        for(CartItem item: items) {
            log.info("장바구니 아이템 : {}", item.getProduct().getName());
        }

    }
}