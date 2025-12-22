package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
public class PurchaseWishlistItem {
    @Id
    @Column(name = "purchase_wishlist_item_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_wishlist_num")
    private PurchaseWishlist purchaseWishlist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    private Long quantity;

    private Long price;

    private Long totalPrice;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
