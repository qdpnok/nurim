package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Product {
    @Id
    @Column(name = "product_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 Product는 하나의 MainCategory에 속함
    @JoinColumn(name = "sub_category_num")
    private SubCategory subCategory;

    @Column
    private Long price;

    @Column
    private String spec;

    @Column
    private String brand;

    @Column
    private String serialNum;

    @Column
    private String name;

    @Column
    private String img;

    // 여기 추가했어요오
    @Column(name = "price_48")
    private Long price48;

    @Column(name = "price_36")
    private Long price36;

    // 1219 할인률 컬럼 추가
    private Long discountRate;

    @OneToMany(mappedBy = "product")
    private List<Reviews> reviews;
}
