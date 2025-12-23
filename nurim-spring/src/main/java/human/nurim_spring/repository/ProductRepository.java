package human.nurim_spring.repository;

import human.nurim_spring.dto.ProductListDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
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
    @Query("SELECT p, COUNT(r), AVG(r.scope) FROM Product p JOIN p.subCategory sc JOIN sc.mainCategory mc LEFT JOIN p.reviews r WHERE p.subCategory = :subCategory AND mc.num=2 GROUP BY p")
    List<Object[]> findProductWithReviewStats(SubCategory subCategory, Pageable pageable);

    // product join reviews (all) 구매가만 조회
     @Query("SELECT p, COUNT(r), AVG(r.scope) FROM Product p JOIN p.subCategory sc JOIN sc.mainCategory mc LEFT JOIN p.reviews r WHERE mc.num=2 GROUP BY p")
     List<Object[]> findAllProductWithReviewStats(Pageable pageable);

     @Query("""
            SELECT purchase.num, subscription.num, purchase.name, purchase.price,
            purchase.img, purchase.serialNum, purchase.spec, purchase.discountRate,
            subscription.discountRate, COALESCE(COUNT(r.product.serialNum), 0) AS count,
            COALESCE(AVG(r.scope), 0) AS avg
            FROM Product purchase
            JOIN purchase.subCategory psc
            JOIN psc.mainCategory pmc

            JOIN Product subscription
                        ON purchase.serialNum = subscription.serialNum
            JOIN subscription.subCategory ssc
            JOIN ssc.mainCategory smc
            LEFT JOIN Reviews r
                        ON purchase.serialNum = r.product.serialNum

            WHERE pmc.name = '구매'
            AND smc.name = '구독'
            GROUP BY purchase.num, subscription.num, purchase.name, purchase.price,
                     purchase.img, purchase.serialNum, purchase.spec, purchase.discountRate,
                     subscription.discountRate
            """)
     List<Object[]> findTest();


//    @Query("""
//    SELECT new human.nurim_spring.dto.product.ProductListDto(
//        purchase.num,
//        subscription.num,
//        purchase.name,
//        purchase.price,
//        purchase.img
//    )
//    FROM Product purchase
//    JOIN purchase.subCategory psc
//    JOIN psc.mainCategory pmc
//
//    JOIN Product subscription
//        ON purchase.serialNum = subscription.serialNum
//    JOIN subscription.subCategory ssc
//    JOIN ssc.mainCategory smc
//
//    WHERE pmc.name = '구매'
//      AND smc.name = '구독'
//""")
//    List<ProductListDto> findPurchaseListWithSubscriptionId();
}
