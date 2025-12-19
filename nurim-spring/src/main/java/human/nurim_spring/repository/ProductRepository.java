package human.nurim_spring.repository;

import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySubCategory(SubCategory subCategory);
    List<Product> findTop4ByOrderByDiscountRateDesc();
}
