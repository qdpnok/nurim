package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
// @ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Reviews {
    @Id
    @Column(name = "review_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_num")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_num")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="purchase_num")
    private Purchase purchase;

    @Column
    private Long scope;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private boolean isRelease;

    @Column
    private String img;

    @CreationTimestamp
    @Column(name = "reg_date", updatable = false)
    private LocalDateTime regDate;
}
