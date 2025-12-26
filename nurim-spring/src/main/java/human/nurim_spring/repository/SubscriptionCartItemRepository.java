package human.nurim_spring.repository;

import human.nurim_spring.entity.SubscriptionCart;
import human.nurim_spring.entity.SubscriptionCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionCartItemRepository extends JpaRepository<SubscriptionCartItem, Long> {
    List<SubscriptionCartItem> findBySubscriptionCart(SubscriptionCart subscriptionCart);
}
