package human.nurim_spring.entity;

import human.nurim_spring.constant.PermissionStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity @Getter @Setter @ToString(exclude = "pwd") @NoArgsConstructor
@Builder @AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_num")
    private Long num;

    @Column(unique = true, length = 100)
    private String id;

    private String pwd;

    @Column(unique = true)
    private String email;

    private String name;

    @Column(unique = true)
    private String phoneNum;

    // builder 패턴으로 생성 시 빈 값이면 true
    @Builder.Default
    private String useYn = "true";

    private LocalDateTime regDate;
    private LocalDateTime quitDate;

    @Builder.Default
    private String subState = "false";

    private LocalDateTime nextPay;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PermissionStatus status = PermissionStatus.MEMBER;

    @PrePersist
    public void prePersist() {
        this.regDate = LocalDateTime.now();
    }
}
