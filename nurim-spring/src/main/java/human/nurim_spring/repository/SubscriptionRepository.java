package human.nurim_spring.repository;

import human.nurim_spring.entity.Orders;
import human.nurim_spring.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByOrders(Orders orders);
}
