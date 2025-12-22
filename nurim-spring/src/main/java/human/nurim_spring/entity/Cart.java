package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Cart {
    @Id
    @Column(name = "cart_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    // 하나의 회원은 하나의 장바구니를 가짐
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> cartItems = new ArrayList<>();
}
