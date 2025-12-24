package human.nurim_spring.repository;

import human.nurim_spring.entity.PurchaseCart;
import human.nurim_spring.entity.PurchaseCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseCartItemRepository extends JpaRepository<PurchaseCartItem, Long> {
    List<PurchaseCartItem> findByPurchaseCart(PurchaseCart purchaseCart);
}
