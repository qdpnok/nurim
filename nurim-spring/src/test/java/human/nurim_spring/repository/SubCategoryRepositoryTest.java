package human.nurim_spring.repository;

import human.nurim_spring.entity.MainCategory;
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
class SubCategoryRepositoryTest {
    @Autowired
    MainCategoryRepository mainCategoryRepository;
    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Test
    @DisplayName("구독/구매로 sub 카테고리 검색")
    public void findByMainCategoryTest() {
        MainCategory mainCategory = mainCategoryRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 메인 카테고리입니다."));

        List<SubCategory> subCategory = subCategoryRepository.findByMainCategory(mainCategory);


    }

}