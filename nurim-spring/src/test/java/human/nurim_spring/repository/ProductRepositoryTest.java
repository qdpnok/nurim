package human.nurim_spring.repository;

import human.nurim_spring.entity.MainCategory;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
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
class ProductRepositoryTest {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Test
    @DisplayName("상품 조회 테스트")
    public void getListTest() {
        SubCategory sc = subCategoryRepository.findById(2L).get();
        List<Product> list = productRepository.findBySubCategory(sc);

        log.info("상품 조회 리스트");
        log.info(list.toString());

        Product product = productRepository.findById(3L).orElseThrow(() -> new RuntimeException("해당 상품이 존재하지 않습니다."));
        log.info("상품 단건 조회 By Id");
        log.info(product.toString());

        list = productRepository.findTop4ByOrderByDiscountRateDesc();
        log.info("할인률 top 4: {}", list.toString());
    }

}