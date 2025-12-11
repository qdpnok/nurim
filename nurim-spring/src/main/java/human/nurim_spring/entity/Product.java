package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

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
}
