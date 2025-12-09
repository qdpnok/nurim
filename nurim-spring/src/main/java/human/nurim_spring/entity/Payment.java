package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Payment {
    @Id
    @Column(name = "payment_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    @Column
    private Long quantity;

    @Column
    private Long total_price;

    @Column
    private boolean isBye_state;

    @Column
    private boolean isPayment_method;

    @Column
    private LocalDateTime payment_data;

}
