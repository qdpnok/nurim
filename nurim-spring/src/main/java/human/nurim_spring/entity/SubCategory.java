package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SubCategory {
    @Id
    @Column(name = "sub_category_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_category_num")
    private MainCategory mainCategory;


    @Column
    private String name;
}

