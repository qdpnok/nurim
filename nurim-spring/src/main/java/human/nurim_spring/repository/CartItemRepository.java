package human.nurim_spring.repository;

import human.nurim_spring.entity.Cart;
import human.nurim_spring.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCart(Cart cart);
}
