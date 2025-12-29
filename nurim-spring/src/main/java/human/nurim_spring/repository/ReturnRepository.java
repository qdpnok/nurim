package human.nurim_spring.repository;

import human.nurim_spring.entity.Returns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnRepository extends JpaRepository<Returns, Long> {
}
