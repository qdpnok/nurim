package human.nurim_spring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QNAResDto {
    private String title;   // 제목
    private String content; // 내용
    private String answer;  // 답변 (답변이 없으면 "답변 대기중"으로 표시함)
    private String date;    // 작성날짜 (yyyy-MM-dd)
}