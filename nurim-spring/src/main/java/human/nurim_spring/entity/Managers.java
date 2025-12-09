package human.nurim_spring.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Managers {
    @Id
    @Column(name = "managers_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @Column
    private String id;

    @Column String pwd;

}
