package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.query.Order;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_num")
    private Orders orders;

    @Column
    private Long quantity;

    @Column
    private Long total_price;

    @Column
    private String bye_state;

    @Column
    private String payment_method;

    @Column
    private LocalDateTime payment_data;

}
