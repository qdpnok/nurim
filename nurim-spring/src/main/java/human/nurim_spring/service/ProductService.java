package human.nurim_spring.service;

import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final SubCategoryRepository subCategoryRepository;
    private final ProductRepository productRepository;

    // 상품 목록 조회: 카테고리 번호가 오면 해당 제품만, 없으면 전체 조회
    public List<Product> getList(Long id) {
        if (id != null) {
            SubCategory subCategory = subCategoryRepository.findById(id)
                    .orElseThrow(() -> new BusinessException("NOT_EXIST_SUBCATEGORY", "존재하지 않는 서브 카테고리입니다."));

            return productRepository.findBySubCategory(subCategory);
        } else {
            return productRepository.findAll();
        }
    }

    // 상품 상세 조회
    public Product get(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "존재하지 않는 상품입니다."));
    }

    // 상품 이름으로 검색
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }
}
