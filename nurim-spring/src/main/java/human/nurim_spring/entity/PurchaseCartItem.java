package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class PurchaseCartItem {
    @Id
    @Column(name = "purchase_cart_item_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_cart_num")
    private PurchaseCart purchaseCart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    private Long quantity;

    private Long price;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
