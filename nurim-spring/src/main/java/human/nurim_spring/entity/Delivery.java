package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Delivery {
    @Id
    @Column(name = "delivery_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    private String address;

    private Long quantity;

    private String delivery_message;

    private boolean isAdvance_visit;

    private Long invoice_num;

    private String state;

    public void setState(String state) {
        java.util.List<String> allowed = java.util.Arrays.asList("결제됨", "배송예정", "배송중", "배송완료");

        if (!allowed.contains(state)) {
            throw new IllegalArgumentException("결제됨, 배송예정, 배송중, 배송완료만 입력 가능합니다.");
        }
        this.state = state;
    }
}
