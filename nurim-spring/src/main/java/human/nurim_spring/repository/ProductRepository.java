package human.nurim_spring.repository;

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
    List<Product> findByNameContaining(String keyword);
    List<Product> findTop4ByOrderByDiscountRateDesc();

    // [수정 1] findProductWithReviewStats
    // SELECT 절 끝에 subscription.price36 추가
    // GROUP BY 절 끝에 subscription.price36 추가
    @Query("""
            SELECT purchase.num, subscription.num, purchase.name, purchase.price, subscription.price,
            purchase.img, purchase.serialNum, purchase.spec, purchase.brand, purchase.discountRate,
            subscription.discountRate, COALESCE(COUNT(r.product.serialNum), 0) AS count,
            COALESCE(AVG(r.scope), 0) AS avg,
            subscription.price36  
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
            AND purchase.subCategory.name = :scName
            GROUP BY purchase.num, subscription.num, purchase.name, purchase.price, subscription.price,
                     purchase.img, purchase.serialNum, purchase.spec, purchase.brand, purchase.discountRate,
                     subscription.discountRate, subscription.price36
            """)
    Page<Object[]> findProductWithReviewStats(String scName, Pageable pageable);


    // [수정 2] findAllProductWithReviewStats (똑같이 추가)
    @Query("""
            SELECT purchase.num, subscription.num, purchase.name, purchase.price, subscription.price,
            purchase.img, purchase.serialNum, purchase.spec, purchase.brand, purchase.discountRate,
            subscription.discountRate, COALESCE(COUNT(r.product.serialNum), 0) AS count,
            COALESCE(AVG(r.scope), 0) AS avg,
            subscription.price36
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
            GROUP BY purchase.num, subscription.num, purchase.name, purchase.price, subscription.price,
                     purchase.img, purchase.serialNum, purchase.spec, purchase.brand, purchase.discountRate,
                     subscription.discountRate, subscription.price36
            """)
    Page<Object[]> findAllProductWithReviewStats(Pageable pageable);

    @Query("SELECT p, COALESCE(AVG(r.scope), 0) AS avg FROM Product p LEFT JOIN p.reviews r WHERE p.num = :num GROUP BY p")
    List<Object[]> findDetail(Long num);
}