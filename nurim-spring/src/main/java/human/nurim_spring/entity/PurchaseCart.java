package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class PurchaseCart {
    @Id
    @Column(name = "purchase_cart_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "purchaseCart", cascade = CascadeType.ALL)
    private List<PurchaseCartItem> purchaseCartItems = new ArrayList<>();
}
