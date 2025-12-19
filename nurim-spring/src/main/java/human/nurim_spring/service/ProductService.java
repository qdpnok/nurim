package human.nurim_spring.service;

import human.nurim_spring.dto.ProductResDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final SubCategoryRepository subCategoryRepository;
    private final ProductRepository productRepository;

    // 상품 목록 조회: 카테고리 번호가 오면 해당 제품만, 없으면 전체 조회
    public List<ProductResDto> getList(Long id) {
        List<Product> result;
        List<ProductResDto> list = new ArrayList<>();

        if (id != null) {
            SubCategory subCategory = subCategoryRepository.findById(id)
                    .orElseThrow(() -> new BusinessException("NOT_EXIST_SUBCATEGORY", "존재하지 않는 서브 카테고리입니다."));
            result = productRepository.findBySubCategory(subCategory);

        } else {
            result = productRepository.findAll();
        }

        for(Product product : result) {
            list.add(convertProductToProductRes(product));
        }

        return list;
    }

    // 상품 상세 조회
    public ProductResDto get(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "존재하지 않는 상품입니다."));

        return convertProductToProductRes(product);
    }

    private ProductResDto convertProductToProductRes(Product product) {
        return ProductResDto.builder()
                .num(product.getNum())
                .price(product.getPrice())
                .name(product.getName())
                .build();
    }

    // 상품 이름으로 검색
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }
}
