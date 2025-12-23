package human.nurim_spring.service;

import human.nurim_spring.dto.MainProductResDto;
import human.nurim_spring.dto.ProductListResDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MainCategoryRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final SubCategoryRepository subCategoryRepository;
    private final ProductRepository productRepository;

    // 상품 목록 조회: 상품 정보 + 리뷰
    public List<ProductListResDto> getList(String scName, Integer pageNum) {
        List<Object[]> results;
        List<ProductListResDto> list = new ArrayList<>();

        Pageable pageable = PageRequest.of(pageNum == null? 0 : pageNum-1, 9);

        // 서브 카테고리 이름이 있으면 서브 카테고리로 검색, 아니면 구매 상품 모두 검색
        if(scName != null) {
            results = productRepository.findProductWithReviewStats(scName, pageable);
        } else {
            results = productRepository.findAllProductWithReviewStats(pageable);
        }

        // product join reviews 해서 productListResDto로 convert
        for(Object[] result: results) {
            list.add(convertResultToProductListRes(result));
        }

        return list;
    }

    // 상품 목록 조회: 카테고리 번호가 오면 해당 제품만, 없으면 전체 조회
    public List<MainProductResDto> getMainList(Long id) {
        List<Product> result;
        List<MainProductResDto> list = new ArrayList<>();

        if (id != null) {
            SubCategory subCategory = subCategoryRepository.findById(id)
                    .orElseThrow(() -> new BusinessException("NOT_EXIST_SUBCATEGORY", "존재하지 않는 서브 카테고리입니다."));
            result = productRepository.findBySubCategory(subCategory);

        } else {
            result = productRepository.findAll();
        }

        for(Product product : result) {
            list.add(convertProductToMainPrdRes(product));
        }

        return list;
    }

    // 상품 상세 조회
    public MainProductResDto get(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "존재하지 않는 상품입니다."));

        return convertProductToProductRes(product);
    }

    // 할인율이 높은 상품 4개 검색
    public List<MainProductResDto> getListTop4DiscountRate() {
        List<MainProductResDto> list = new ArrayList<>();
        List<Product> result = productRepository.findTop4ByOrderByDiscountRateDesc();

        for(Product product : result) {
            list.add(convertProductToProductRes(product));
        }

        return list;
    }

    private MainProductResDto convertProductToProductRes(Product product) {
        return MainProductResDto.builder()
                .num(product.getNum())
                .price(product.getPrice())
                .name(product.getName())
                .build();
    }

    private MainProductResDto convertProductToMainPrdRes(Product product) {
        return MainProductResDto.builder()
                .num(product.getNum())
                .name(product.getName())
                .price(product.getPrice())
                .discountRate(product.getDiscountRate())
                .build();
    }

    private ProductListResDto convertResultToProductListRes(Object[] result) {
        return ProductListResDto.builder()
                .pNum((Long) result[0])
                .sNum((Long) result[1])
                .name((String) result[2])
                .price((Long) result[3])
                .img((String) result[4])
                .serialNum((String) result[5])
                .spec((String) result[6])
                .brand((String) result[7])
                .pDiscountRate((Long) result[8])
                .sDiscountRate((Long) result[9])
                .scopeCount((Long) result[10])
                .scopeAvg((Double) result[11])
                .build();
    }

    // 상품 이름으로 검색
    public List<MainProductResDto> searchProducts(String keyword) {
        List<Product> result = productRepository.findByNameContaining(keyword);
        List<MainProductResDto> list = new ArrayList<>();

        for(Product product : result) {
            list.add(convertProductToProductRes(product));
        }

        return list;
    }
}
