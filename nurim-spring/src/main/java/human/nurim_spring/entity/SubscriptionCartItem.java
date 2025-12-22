package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
public class SubscriptionCartItem {
    @Id
    @Column(name = "subscription_cart_item_num")
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_cart_num")
    private SubscriptionCart subscriptionCart;

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
