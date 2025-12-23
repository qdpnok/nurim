package human.nurim_spring.repository;

import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Reviews;  // Reviews 엔티티 사용함
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {

    @Query("SELECT r FROM Reviews r WHERE r.product.serialNum = :serialNum ORDER BY r.regDate DESC")
    List<Reviews> findAllBySerialNum(@Param("serialNum") String serialNum);
}