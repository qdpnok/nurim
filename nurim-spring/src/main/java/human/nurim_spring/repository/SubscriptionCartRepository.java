package human.nurim_spring.repository;

import human.nurim_spring.entity.SubscriptionCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionCartRepository extends JpaRepository<SubscriptionCart, Long> {
}
