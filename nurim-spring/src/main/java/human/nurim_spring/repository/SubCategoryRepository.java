package human.nurim_spring.repository;

import human.nurim_spring.entity.MainCategory;
import human.nurim_spring.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    List<SubCategory> findByMainCategory(MainCategory mainCategory);
}
