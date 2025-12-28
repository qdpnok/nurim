package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class SubscriptionCartItem {
    @Id
    @Column(name = "subscription_cart_item_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_cart_num")
    private SubscriptionCart subscriptionCart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;
    private Long price;
    private Long month;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
