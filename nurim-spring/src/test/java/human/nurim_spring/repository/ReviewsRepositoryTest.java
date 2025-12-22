package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Purchase;
import human.nurim_spring.entity.Reviews;
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
class ReviewsRepositoryTest {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ReviewsRepository reviewsRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PurchaseRepository purchaseRepository;

    private Member buildMember() {
        return Member.builder()
                .id("tkdal")
                .pwd("tkdal0000")
                .email("tkdal@gmail.com")
                .name("이상미")
                .phoneNum("010-1234-1234")
                .build();
    }

    private Purchase buildPurchase(Member member, Product product) {
        return Purchase.builder()
                .member(member)
                .product(product)
                .build();
    }

    private Reviews buildReviews(Member member, Product product, Purchase purchase) {
        return Reviews.builder()
                .member(member)
                .product(product)
                .purchase(purchase)
                .scope(4L)
                .title("좋네요")
                .content("너뭊ㅎ네요")
                .isRelease(true)
                .build();
    }

    private void initTest() {
        memberRepository.save(buildMember());
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("조회 결과 없음"));
        Product product = productRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("조회 결과가 없음"));

        purchaseRepository.save(buildPurchase(member, product));
        Purchase purchase = purchaseRepository.findById(1L)
                        .orElseThrow(() -> new RuntimeException("조회 결과 없음"));

        reviewsRepository.save(buildReviews(member, product, purchase));
    }

    @Test
    @DisplayName("Reviews 조회 테스트")
    public void findTest() {
        initTest();

        Product product = productRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("조회 결과가 없음"));

        List<Reviews> list = reviewsRepository.findByProduct(product);

        log.info("리뷰 조회 결과: {}", list);
    }



}