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

import static org.junit.jupiter.api.Assertions.*;

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
    MainCategoryRepository mainCategoryRepository;

    public void initializeTest() {
        MainCategory m1 = new MainCategory();
        MainCategory m2 = new MainCategory();
        m1.setName("구독");
        m2.setName("구매");
        mainCategoryRepository.save(m1);
        mainCategoryRepository.save(m2);

        SubCategory s1 = new SubCategory();
        SubCategory s2 = new SubCategory();
        SubCategory s3 = new SubCategory();
        SubCategory s4 = new SubCategory();
        s1.setMainCategory(m1);
        s1.setName("냉장고");
        s2.setMainCategory(m1);
        s2.setName("세탁기");
        s3.setMainCategory(m2);
        s3.setName("냉장고");
        s4.setMainCategory(m2);
        s4.setName("세탁기");
        subCategoryRepository.save(s1);
        subCategoryRepository.save(s2);
        subCategoryRepository.save(s3);
        subCategoryRepository.save(s4);

        Product p1 = new Product();
        Product p2 = new Product();
        Product p3 = new Product();
        Product p4 = new Product();
        Product p5 = new Product();
        p1.setSubCategory(s1);
        p1.setPrice(300L);
        p1.setSpec("짱좋음");
        p1.setBrand("삼성전자");
        p1.setSerialNum("0");
        p1.setName("비스포크 글램");
        p1.setImg("이미지");

        p2.setSubCategory(s1);
        p2.setPrice(400L);
        p2.setSpec("좋음");
        p2.setBrand("LG전자");
        p2.setSerialNum("1");
        p2.setName("오브제컬렉션 노크온");
        p2.setImg("이미지");

        p3.setSubCategory(s2);
        p3.setPrice(500L);
        p3.setSpec("짱좋음");
        p3.setBrand("LG전자");
        p3.setSerialNum("3");
        p3.setName("트롬 오브제 컬렉션 워시타워");
        p3.setImg("이미지");

        p4.setSubCategory(s2);
        p4.setPrice(800L);
        p4.setSpec("진짜개좋음");
        p4.setBrand("LG전자");
        p4.setSerialNum("5");
        p4.setName("트롬 AI 오브제컬렉션 워시타워");
        p4.setImg("이미지");

        p5.setSubCategory(s3);
        p5.setPrice(500L);
        p5.setSpec("짱좋음");
        p5.setBrand("삼성전자");
        p5.setSerialNum("12");
        p5.setName("비스포크 인피니트 라인 키친핏 럭스");
        p5.setImg("이미지");

        productRepository.save(p1);
        productRepository.save(p2);
        productRepository.save(p3);
        productRepository.save(p4);
        productRepository.save(p5);

    }

    @Test
    @DisplayName("상품 조회 테스트")
    public void getListTest() {
        initializeTest();
        SubCategory sc = subCategoryRepository.findById(2L).get();
        List<Product> list = productRepository.findBySubCategory(sc);

        log.info(list.toString());
    }

}