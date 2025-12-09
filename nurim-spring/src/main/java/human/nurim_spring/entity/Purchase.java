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
public class Purchase {
    @Id
    @Column(name = "purchase_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    @Column
    private LocalDateTime purchase_data;

    @Column
    private Long quantity;

    @Column
    private Long price;

    @Column
    private Long installment_state;

    public void setInstallment_state(Long installment_state) {
        java.util.List<Long> allowed = java.util.Arrays.asList(1L, 3L, 6L, 9L, 12L, 24L, 36L);

        if (!allowed.contains(installment_state)) {
            throw new IllegalArgumentException("할부 개월 수는 1, 3, 6, 9, 12, 24, 36만 입력 가능합니다.");
        }
        this.installment_state = installment_state;
    }
}
