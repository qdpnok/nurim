package human.nurim_spring.service;

import human.nurim_spring.dto.ReviewResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Purchase;
import human.nurim_spring.entity.Reviews;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.PurchaseRepository;
import human.nurim_spring.repository.ReviewsRepository;
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
class ReviewServiceTest {

    @Autowired ProductRepository productRepository;
    @Autowired ReviewsRepository reviewsRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired PurchaseRepository purchaseRepository;
    @Autowired ReviewService reviewService;
    
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
    
    @Test
    @DisplayName("상품별 리뷰가 잘 조회되는지 테스트")
    void getReviewsByProductTest() {
        Member savedMember = memberRepository.save(buildMember());

        // 상품은 기존에 DB에 있는 3번을 가져온다고 가정
        Product product = productRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("3번 상품이 없어요! SQL을 먼저 실행해주세요."));

        // 구매 내역 저장
        Purchase savedPurchase = purchaseRepository.save(buildPurchase(savedMember, product));

        // 리뷰 저장
        reviewsRepository.save(buildReviews(savedMember, product, savedPurchase));

        // When (실행: 서비스를 호출한다)
        List<ReviewResDto> result = reviewService.getReviewsByProduct(product.getNum());

        // Then (검증: 결과가 맞는지 확인한다)
        log.info("조회된 리뷰 개수: " + result.size());

        assertNotNull(result);
        assertFalse(result.isEmpty());
        
        assertEquals("너뭊ㅎ네요", result.get(0).getContent());
        assertEquals(4, result.get(0).getScope());
        assertEquals("이상미", result.get(0).getWriter());

        log.info("테스트 성공");
    }
}