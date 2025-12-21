package human.nurim_spring.service;

import human.nurim_spring.dto.MainProductResDto;
import human.nurim_spring.dto.ProductListResDto;
import human.nurim_spring.repository.MainCategoryRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubCategoryRepository;
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

    @Test
    @DisplayName("상품 조회 테스트")
    public void getProductTest() {
        List<MainProductResDto> idList = productService.getMainList(2L);
        log.info("카테고리 번호 조회: {}", idList.toString());

        List<MainProductResDto> list = productService.getMainList(null);
        log.info("상품 전체 조회: {}", list.toString());

        ProductListResDto product = productService.get(3L);
        log.info("상품 상세 조회: {}", product.toString());

        List<ProductListResDto> productList = productService.searchProducts("비스포크");
        log.info("'비스포크' 이름으로 검색: {}", productList);
    }
}