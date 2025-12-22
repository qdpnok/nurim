package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class CartItem {
    @Id
    @Column(name = "cart_item_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_num")
    private Cart cart;

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
