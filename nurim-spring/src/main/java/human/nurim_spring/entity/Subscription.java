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
public class Subscription {
    @Id
    @Column(name = "subscription_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 Product는 하나의 MainCategory에 속함
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 Product는 하나의 MainCategory에 속함
    @JoinColumn(name = "product_num")
    private Product product;

    @Column
    private LocalDateTime start_data;

    @Column
    private LocalDateTime end_data;

    @Column
    private LocalDateTime next_pay;

    @Column
    private Long price;

    @Column
    private LocalDateTime d_day;

    @Column
    private LocalDateTime remaining_cost;

}
