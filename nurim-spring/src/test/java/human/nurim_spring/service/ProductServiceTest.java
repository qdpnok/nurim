package human.nurim_spring.service;

import human.nurim_spring.dto.ProductResDto;
import human.nurim_spring.entity.MainCategory;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import human.nurim_spring.repository.MainCategoryRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubCategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
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
        List<ProductResDto> idList = productService.getList(2L);
        log.info("카테고리 번호 조회: {}", idList.toString());

        List<ProductResDto> list = productService.getList(null);
        log.info("상품 전체 조회: {}", list.toString());

        ProductResDto product = productService.get(3L);
        log.info("상품 상세 조회: {}", product.toString());

        List<ProductResDto> productList = productService.searchProducts("비스포크");
        log.info("'비스포크' 이름으로 검색: {}", productList);
    }
}