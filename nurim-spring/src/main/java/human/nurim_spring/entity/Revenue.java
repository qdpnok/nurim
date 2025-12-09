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
public class Revenue {
    @Id
    @Column(name = "revenue_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    private boolean isBye_state;

    private Long price;

    private Long quantity;

}
