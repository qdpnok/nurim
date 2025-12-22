package human.nurim_spring.repository;

import human.nurim_spring.dto.ProductReviewSummaryDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySubCategory(SubCategory subCategory);
    List<Product> findByNameContaining(String keyword);  // 제품 이름으로 검색
    List<Product> findTop4ByOrderByDiscountRateDesc();

    // product join reviews (subcategory)
    @Query("SELECT p, COUNT(r), AVG(r.scope) FROM Product p LEFT JOIN p.reviews r WHERE p.subCategory = :subCategory GROUP BY p")
    Page<ProductReviewSummaryDto> findProductWithReviewStats(SubCategory subCategory, Pageable pageable);

    // product join reviews (all)
     @Query("SELECT p, COUNT(r), AVG(r.scope) FROM Product p LEFT JOIN p.reviews r GROUP BY p")
     List<Object[]> findAllProductWithReviewStats(Pageable pageable);

    @Query(
            value = """
        SELECT new human.nurim_spring.dto.ProductReviewSummaryDto(
            p,
            COUNT(r),
            AVG(r.scope)
        )
        FROM Product p
        JOIN p.subCategory sc
        JOIN sc.mainCategory mc
        LEFT JOIN p.reviews r
        WHERE mc.mainCategoryNum = 2
        GROUP BY p
    """,
            countQuery = """
        SELECT COUNT(p)
        FROM Product p
        JOIN p.subCategory sc
        JOIN sc.mainCategory mc
        WHERE mc.mainCategoryNum = 2
    """
    )
    Page<ProductReviewSummaryDto> findAllProduct(Pageable pageable);
}
