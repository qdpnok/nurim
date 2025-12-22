package human.nurim_spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewReqDto {
    private Long memberNum;  // 회원 번호
    private Long productNum; // 상품 번호
    private int scope;       // 별점
    private String content;  // 내용
}