package human.nurim_spring.service;

import human.nurim_spring.dto.MainProductResDto;
import human.nurim_spring.dto.ProductDetailResDto;
import human.nurim_spring.dto.ProductListDto;
import human.nurim_spring.dto.ProductListResDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MainCategoryRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
    public ProductListResDto getList(String category, Integer pageNum) {
        Page<Object[]> results;
        List<ProductListDto> list = new ArrayList<>();

        Pageable pageable = PageRequest.of(pageNum == null? 0 : pageNum-1, 9);

        // 서브 카테고리 이름이 있으면 서브 카테고리로 검색, 아니면 구매 상품 모두 검색
        if(category != null) {
            String scName;
            scName = category.equals("세탁기") ? "세탁기/건조기" : category;

            results = productRepository.findProductWithReviewStats(scName, pageable);
        } else {
            results = productRepository.findAllProductWithReviewStats(pageable);
        }

        // product join reviews 해서 productListResDto로 convert
        for(Object[] result: results.getContent()) {
            list.add(convertResultToProductListRes(result, category));
        }

        return new ProductListResDto(list, results.getTotalPages(), results.getTotalElements(), pageNum == null? 1 : pageNum, 9);
    }

    // 상품 목록 조회, 메인화면: 카테고리 번호가 오면 해당 제품만, 없으면 전체 조회
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
    public ProductDetailResDto get(Long id) {
        List<Object[]> results = productRepository.findDetail(id);
        if (results.isEmpty()) {
            throw new BusinessException("NOT_EXIST_PRODUCT", "해당 상품이 존재하지 않습니다.");
        }

        Object[] result = results.get(0);

        Product product = (Product) result[0];
        Double avg = (Double) result[1];
        Long discount;

        // 구독이면 할인률, 구매면 할인 금액
        if(product.getSubCategory().getMainCategory().getNum() == 1) {
            discount = product.getDiscountRate();
        } else {
            Long price = product.getPrice();
            Long discountRate = product.getDiscountRate();
            discount = price - (price*discountRate/100);
        }

        return convertResultToProductDetailRes(product, discount, avg);
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

    private ProductListDto convertResultToProductListRes(Object[] result, String category) {
        return ProductListDto.builder()
                .pNum((Long) result[0])
                .sNum((Long) result[1])
                .category(category)
                .name((String) result[2])
                .pPrice((Long) result[3])
                .sPrice((Long) result[4])
                .img((String) result[5])
                .serialNum((String) result[6])
                .spec((String) result[7])
                .brand((String) result[8])
                .pDiscountRate((Long) result[9])
                .sDiscountRate((Long) result[10])
                .scopeCount((Long) result[11])
                .scopeAvg((Double) result[12])
                .build();
    }

    private ProductDetailResDto convertResultToProductDetailRes(Product product,Long discount, Double avg) {
        return ProductDetailResDto.builder()
                .num(product.getNum())
                .brand(product.getBrand())
                .serialNum(product.getSerialNum())
                .scopeAvg(avg)
                .spec(product.getSpec())
                .price(product.getPrice())
                .price48(product.getPrice48())
                .price36(product.getPrice36())
                .discount(discount)
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
