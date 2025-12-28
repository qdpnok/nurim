package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
public class Acquisition {
    @Id
    @Column(name = "acquisition_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_num")
    private Product product;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="subscription_num")
    private Subscription subscription;

    @Column
    private LocalDateTime acquisition_data;
}
