package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class SubscriptionCart {
    @Id
    @Column(name = "subsciption_cart_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @OneToMany(mappedBy = "subscriptionCart", cascade = CascadeType.ALL)
    private List<SubscriptionCartItem> subscriptionCartItems = new ArrayList<>();
}
