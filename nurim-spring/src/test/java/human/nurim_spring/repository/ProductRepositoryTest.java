package human.nurim_spring.repository;

import human.nurim_spring.entity.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class ProductRepositoryTest {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    SubCategoryRepository subCategoryRepository;
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

    private Reviews buildReviews(Member member, Product product, Purchase purchase, Long scope) {
        return Reviews.builder()
                .member(member)
                .product(product)
                .purchase(purchase)
                .scope(scope)
                .build();
    }

    private void initTest() {
        Member member = buildMember();
        memberRepository.save(member);

        Product product = productRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException(",,"));

        Purchase purchase = buildPurchase(member, product);
        purchaseRepository.save(purchase);

        Reviews reviews = buildReviews(member, product, purchase, 3L);
        reviewsRepository.save(reviews);
        reviews = buildReviews(member, product, purchase, 4L);
        reviewsRepository.save(reviews);
    }

    @Test
    @DisplayName("상품 조회: 상품만 조회")
    public void findProductTest() {
        SubCategory sc = subCategoryRepository.findById(1L).get();
        List<Product> list = productRepository.findBySubCategory(sc);

        log.info("상품 조회 리스트");
        log.info(list.toString());

        Product product = productRepository.findById(3L).orElseThrow(() -> new RuntimeException("해당 상품이 존재하지 않습니다."));
        log.info("상품 단건 조회 By Id");
        log.info(product.toString());

        list = productRepository.findByNameContaining("비스포크");
        log.info("'비스포크' 검색 결과: {}", list.toString());

        list = productRepository.findTop4ByOrderByDiscountRateDesc();
        log.info("할인률 top 4: {}", list.toString());

    }

    @Test
    @DisplayName("상품 조회: 리뷰와 함께 조회")
    public void findProductWithReviewTest() {
        initTest();

        Pageable pageable = PageRequest.of(0,8);

        // 리뷰와 함께 조회: 카테고리
        Page<Object[]> productWithReviewsStats = productRepository.findProductWithReviewStats("세탁기", pageable);

        for(Object[] result: productWithReviewsStats.getContent()){
            log.info("상품 정보: {}", result[2]);
            log.info("리뷰 정보: {}, {}", result[11], result[12]);
        }

        // 리뷰와 함께 조회: 전체
        productWithReviewsStats = productRepository.findAllProductWithReviewStats(pageable);

        for(Object[] result: productWithReviewsStats.getContent()){

            log.info("상품 정보: {}", result[2]);
            log.info("리뷰 정보: {}, {}", result[11], result[12]);
        }

        Object[] findTest = productRepository.findTest(3L)
                .orElseThrow(() -> new RuntimeException("없음"));

        log.info("조회 결과: {}", findTest);

        Product product = (Product) findTest[0];
        Double scopeAvg = (Double) findTest[1];

        log.info("세부 정보 검색\n상품 이름: {}, 가격: {}", product.getName(), product.getPrice());
        log.info("평균 별점: {}", scopeAvg);
    }

}