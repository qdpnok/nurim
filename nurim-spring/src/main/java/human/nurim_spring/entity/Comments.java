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
public class Comments {
    @Id
    @Column(name = "comments_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_num")
    private Member member; // 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qna_num")
    private QNA qna; // QNA의 NUM을 기준으로 작성됨.

    @Column
    private String content; // 내용

    @Column
    private boolean isRelease; // 공개여부
}
