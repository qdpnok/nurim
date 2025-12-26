package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.PurchaseCart;
import human.nurim_spring.entity.SubscriptionCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionCartRepository extends JpaRepository<SubscriptionCart, Long> {
    SubscriptionCart findByMember(Member member);
}
