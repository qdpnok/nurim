package human.nurim_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResDto {
    private String writer;  // 작성자 (회원 이름)
    private int scope;      // 별점 (1~5)
    private String content; // 리뷰 내용
    private String date;    // 작성일 (yyyy-MM-dd)
}