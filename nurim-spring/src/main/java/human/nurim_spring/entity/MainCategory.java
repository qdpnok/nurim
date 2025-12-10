package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class MainCategory {
    @Id
    @Column(name = "main_category_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @Column
    private String name;
}
