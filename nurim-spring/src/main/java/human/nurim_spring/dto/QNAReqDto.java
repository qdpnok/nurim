package human.nurim_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QNAReqDto {
    private Long memberNum;    // 작성자 번호
    private String title;      // 제목
    private String content;    // 내용
    private Boolean isRelease; // 공개 여부 (true: 공개, false: 비공개)
}