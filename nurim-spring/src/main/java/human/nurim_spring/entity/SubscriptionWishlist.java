package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
public class SubscriptionWishlist {
    @Id
    @Column(name = "subscription_wishlist_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    // 하나의 회원은 하나의 장바구니를 가짐
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @OneToMany(mappedBy = "subscriptionWishlist", cascade = CascadeType.ALL)
    private List<SubscriptionWishlistItem> subscriptionWishlistItems = new ArrayList<>();
}
