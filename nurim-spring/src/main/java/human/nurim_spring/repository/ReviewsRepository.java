package human.nurim_spring.repository;

import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Reviews;  // Reviews 엔티티 사용함
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {
    // 상품의 리뷰 가져오기 기능임
    List<Reviews> findByProduct(Product product);
}