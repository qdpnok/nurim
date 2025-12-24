package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.PurchaseCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurchaseCartRepository extends JpaRepository<PurchaseCart, Long> {
    PurchaseCart findByMember(Member member);
}
