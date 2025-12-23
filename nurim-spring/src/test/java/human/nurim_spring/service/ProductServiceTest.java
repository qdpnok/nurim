package human.nurim_spring.service;

import human.nurim_spring.dto.MainProductResDto;
import human.nurim_spring.dto.ProductListResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Purchase;
import human.nurim_spring.entity.Reviews;
import human.nurim_spring.repository.*;
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
class ProductServiceTest {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    SubCategoryRepository subCategoryRepository;
    @Autowired
    MainCategoryRepository mainCategoryRepository;
    @Autowired
    ProductService productService;
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
    @DisplayName("상품 조회 테스트")
    public void getProductTest() {
        initTest();
        List<MainProductResDto> idList = productService.getMainList(2L);
        log.info("카테고리 번호 조회: {}", idList.toString());

        List<MainProductResDto> list = productService.getMainList(null);
        log.info("상품 전체 조회: {}", list.toString());

        ProductListResDto product = productService.get(3L);
        log.info("상품 상세 조회: {}", product.toString());

        List<ProductListResDto> productList = productService.searchProducts("비스포크");
        log.info("'비스포크' 이름으로 검색: {}", productList);

        List<ProductListResDto> pList = productService.getList(7L, null);
        for (ProductListResDto e: pList) {
            log.info("상품 정보: {}, {}, {}", e.getName(), e.getScopeCount(), e.getScopeAvg());
        }
    }
}