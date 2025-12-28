package human.nurim_spring.entity;

import human.nurim_spring.constant.OrderStatus;
import human.nurim_spring.constant.OrderType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class Orders {
    @Id
    @Column(name = "order_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    private String orderName;
    private String orderEmail;
    private String orderPhone;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime canceledAt;

    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }
}
