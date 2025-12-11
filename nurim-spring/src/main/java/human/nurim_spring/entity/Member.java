package human.nurim_spring.entity;

import human.nurim_spring.constant.PermissionStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity @Getter @Setter @ToString @NoArgsConstructor
@Builder @AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_num")
    private Long num;

    @Column(unique = true, length = 100)
    private String id;

    @Column
    private String pwd;

    @Column(unique = true)
    private String email;

    @Column
    private String name;

    @Column(unique = true)
    private String phoneNum;

    @Column
    @ColumnDefault("'true'") // default true
    private String useYn;

    @Column
    private LocalDateTime regDate;

    @Column
    private LocalDateTime quitDate;

    @Column
    @ColumnDefault("'false'")
    private String subState;

    @Column
    private LocalDateTime nextPay;

}
