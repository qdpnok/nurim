package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Cart {
    @Id
    @Column(name = "cart_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 Product는 하나의 MainCategory에 속함
    @JoinColumn(name = "product_num")
    private Product product;

    @Column
    private Long quantity;

    @Column
    private Long total_price;

    @Column
    private boolean isBye_state;

}
