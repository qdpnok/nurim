package human.nurim_spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApplicationReqDto {
    private Long memberNum;
    private Long productNum; // 또는 subscriptionId
}